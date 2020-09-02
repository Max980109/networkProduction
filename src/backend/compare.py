#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jun  3 18:40:56 2020
@author: jiaoyibo
"""

import pandas as pd
import numpy as np
import sys
from rdkit import Chem
import networkx as nx
import matplotlib.pyplot as plt

def find_expanded_feature(sig, dataset, tol, groupID):
    
    bio_tsf = pd.read_csv('biotransformation_reactions.csv')
    transformation = bio_tsf.iloc[:,5].values
    reaction = bio_tsf.iloc[:,4].values
    bio_smile = bio_tsf.iloc[:,3].values
    
    trans_process = []
    sig_ele = sig.iloc[groupID]
    sig_mass = sig_ele['mass']
    sig_SMILES = sig_ele['SMILE']
    
    if sig_SMILES == sig_SMILES:
        mol = Chem.MolFromSmiles(sig_SMILES)
        trans = np.array([])
        for i in range(len(bio_smile)):
            if bio_smile[i] != bio_smile[i]:
                trans = np.append(trans, transformation[i])
            elif mol.HasSubstructMatch(Chem.MolFromSmiles(bio_smile[i])):
                trans = np.append(trans, transformation[i])
        query_mass = sig_mass + trans
    else:
        query_mass = sig_mass + transformation
        
    all_mass = dataset.iloc[1:, 1]
    for j in range(query_mass.shape[0]):
        found = np.where(abs(all_mass.astype('float') - query_mass[j]) < tol, True, False)
        f = all_mass[found].index
        if len(f) > 0:
            for k in range(len(f.values)):
                trans_process.append([sig.index[groupID], sig_mass, j, reaction[j], transformation[j], f.values[k]])
                    
    df = pd.DataFrame(trans_process, columns = ['origin node ID', 'origin mass', 'trans ID', 'reaction','trans diff', 'into nodes ID'])
    return df

def get_conditions(dataset):
    
    first_row = dataset.loc['ID'][2:]
    conds = np.unique(first_row)
    
    return conds


def data_selection(dataset, df, groupID):
    
    conds = get_conditions(dataset)
    select_df = df[df['origin node ID'] == groupID]
    sig_group = np.append(np.vstack(select_df['into nodes ID']).astype('int'), groupID)  
    
    new_sig = pd.DataFrame(dataset.iloc[sig_group])
    C0_data = (pd.DataFrame(data = new_sig.loc[:, dataset.loc['ID'] == conds[0]])).astype('float')
    C1_data = (pd.DataFrame(data = new_sig.loc[:, dataset.loc['ID'] == conds[1]])).astype('float')
    C0_edge_matrix = pd.DataFrame(data = np.corrcoef(C0_data), index = C0_data.index, columns = C0_data.index)
    C1_edge_matrix = pd.DataFrame(data = np.corrcoef(C1_data), index = C1_data.index, columns = C1_data.index)
    SUBS_edge_matrix = pd.DataFrame.subtract(C0_edge_matrix, C1_edge_matrix)
    
    edges = SUBS_edge_matrix.where(np.triu(np.ones(SUBS_edge_matrix.shape), 1).astype(np.bool))
    edges = edges.stack()
    edges_t = C0_edge_matrix.where(np.triu(np.ones(C0_edge_matrix.shape), 1).astype(np.bool))
    edges_t = edges_t.stack()
    edges_n = C1_edge_matrix.where(np.triu(np.ones(C1_edge_matrix.shape), 1).astype(np.bool))
    edges_n = edges_n.stack()
    
    return edges, edges_t, edges_n, select_df, C0_data, C1_data, C0_edge_matrix, C1_edge_matrix, SUBS_edge_matrix

def get_group_info(m, dataset, df, sig):
    
    conds = get_conditions(dataset)
    edges, edges_t, edges_n, select_df, C0_data, C1_data, C0_edge_matrix, C1_edge_matrix, SUBS_edge_matrix = data_selection(dataset, df, sig.index[m])
    table = []
    
    for e in range(len(edges)):
        parent_ID = select_df.iloc[0, 0]
        parent_feature = sig.loc[parent_ID, 'name']
        parent_fc = np.average(C0_data[C0_data.index.astype('int') == parent_ID]) / np.average(C1_data[C1_data.index.astype('int') == parent_ID])
        parent_fc = parent_fc.round(2)
        product_ID = int(edges.index[e][0])
        product_trans_name = select_df.loc[select_df['into nodes ID'].astype('int') == product_ID, 'reaction']
        product_trans_diff = select_df.loc[select_df['into nodes ID'].astype('int') == product_ID, 'trans diff']
        product_fc = np.average(C0_data[C0_data.index.astype('int') == product_ID]) / np.average(C1_data[C1_data.index.astype('int') == product_ID])
        product_fc = product_fc.round(2)
        paired_ID = int(edges.index[e][1])
        
        if paired_ID != parent_ID:
            paired_trans_name = select_df.loc[select_df['into nodes ID'].astype('int') == paired_ID, 'reaction']
            paired_trans_diff = select_df.loc[select_df['into nodes ID'].astype('int') == paired_ID, 'trans diff']
        else:
            paired_trans_name = pd.Series('parent node')
            paired_trans_diff = pd.Series('none')
            
        paired_fc = np.average(C0_data[C0_data.index.astype('int') == paired_ID]) / np.average(C1_data[C1_data.index.astype('int') == paired_ID])
        paired_fc = paired_fc.round(2)
        edge_C1 = C1_edge_matrix.loc[C1_edge_matrix.index.astype('int') == product_ID, C1_edge_matrix.columns.astype('int') == paired_ID]
        edge_C1 = edge_C1.round(2)
        edge_C0 = C0_edge_matrix.loc[C0_edge_matrix.index.astype('int') == product_ID, C0_edge_matrix.columns.astype('int') == paired_ID]
        edge_C0 = edge_C0.round(2)
        edge_SUBS = SUBS_edge_matrix.loc[SUBS_edge_matrix.index.astype('int') == product_ID, SUBS_edge_matrix.columns.astype('int') == paired_ID]
        edge_SUBS = edge_SUBS.round(2)
        
        r = np.array([parent_ID, parent_feature, parent_fc, 
                  product_ID, product_trans_name.values[0], 
                  product_trans_diff.values[0], product_fc, 
                  paired_ID, paired_trans_name.values[0], 
                  paired_trans_diff.values[0], paired_fc, 
                  edge_C0.iloc[0,0], edge_C1.iloc[0,0], edge_SUBS.iloc[0,0]])
        
        table.append(r)
        
    table = pd.DataFrame(table, columns = ['parent id', 'parent feature', 'parent fc',
                                            'product id', 'product trans name',
                                            'product trans diff', 'product fc',
                                            'paired id', 'paired trans name',
                                            'paired trans diff', 'paired fc',
                                            conds[0]+' edge', conds[1]+' edge', 'edge diff'])
    
    return table, edges, select_df

def construct_graph(edges, select_df, groupID, filter_level):
    plt.figure()
    edges = edges[abs(edges) > filter_level]
    G = nx.Graph()
    G.add_nodes_from(select_df['into nodes ID'])
    G.add_node(str(groupID))
    for i in range(len(edges)):
        weight = abs(edges.iloc[i])
        node1, node2 = edges.index[i]
        G.add_edge(node1, node2, weight = weight)
     
    edges_color,weights = zip(*nx.get_edge_attributes(G,'weight').items())
    pos = nx.circular_layout(G)
    nx.draw(G, pos, with_labels=True, edgelist=edges_color, edge_color=weights, width=3.0, edge_cmap=plt.cm.Blues)
    plt.title(f'edge diff with filter {filter_level} in node group {groupID}')
    plt.savefig(f'pics/group_{groupID}_diff.png')
    plt.close()

def analyze(sig, dataset, groupID, tol, filter_level):    
    tp = find_expanded_feature(sig, dataset, tol, groupID)
    t, edges, select_df = get_group_info(groupID, dataset, tp, sig)
    t.to_csv(f'nodes/node_{groupID}_info.csv', index = False)
    construct_graph(edges, select_df, groupID, filter_level)
    return t

def execute_main(m_path, s_path, groupID, tol, filter_level):
    metabl = pd.read_csv(m_path, index_col = 0, header = None)
    sig = pd.read_csv(s_path, index_col = 0)
    t = analyze(sig, metabl, groupID, tol, filter_level)
    return t

def execute_sample():

    for groupID in range(1):
        tol = 0.01
        m_path = './meta/raw_metabolomics.csv'
        s_path = './sig/significant_list_with_SMILES.csv'
        filter_level = 0.01
        t = execute_main(m_path, s_path, groupID, tol, filter_level)
        

#execute_sample()
    
# if __name__ == '__main__':
#     m_path = sys.argv[1]
#     s_path = sys.argv[2]
#     groupID = int(sys.argv[3])
#     tol = float(sys.argv[4])
#     print('Metabolomic List File is: {}'.format(m_path))
#     print('Significant Node File is: {}'.format(s_path))
#     print('Analyzing GroupID:{}'.format(groupID))
#     print('Tolerence when doing biotransformation is: {}'.format(tol))
#     t = execute_main(m_path, s_path, groupID, tol)
#     print('Executing groupID: {}, file save as "groupID {} outcome.csv"'.format(groupID, groupID))
#     t.to_csv('groupID {} outcome.csv'.format(groupID))
    