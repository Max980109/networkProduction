"""
@author: Max Song
"""
import os
import glob
import pandas as pd
import numpy as np
import networkx as nx
import matplotlib
import io
import base64
from PIL import Image
from compare import *
from flask import Flask, flash, request, redirect, url_for, jsonify,Blueprint
from werkzeug.utils import secure_filename
import json
from flask_cors import CORS, cross_origin

META_FOLDER = './meta'
SIG_FOLDER = './sig'
ALLOWED_EXTENSIONS = {'csv'}


app = Flask(__name__)
app.config['META_FOLDER'] = META_FOLDER
app.config['SIG_FOLDER'] = SIG_FOLDER
matplotlib.use('agg')
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

api = Blueprint('api', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_empty_folder(path):
    if len(os.listdir(path)) == 0:
        return True
    else:
        return False

def clear_folder(path):
    files = glob.glob(path)
    for f in files:
        os.remove(f)

def read_csv_meta():
    dataset_file = [data_file for data_file in os.listdir('./meta') if data_file.endswith('.csv')]
    data_name = dataset_file[0]
    print(data_name)
    path = "./meta/{}".format(data_name)
    print(path)
    dataset_sig = pd.read_csv(path, index_col = 0, header = None)
    return dataset_sig
     

def read_csv_sig():
    positive_file = [pos_file for pos_file in os.listdir('./sig') if pos_file.endswith('.csv')]
    pos_name = positive_file[0]
    path = "./sig/{}".format(pos_name)
    pos_sig = pd.read_csv(path, index_col = 0)
    return pos_sig

def read_csv_sig_json():
    positive_file = [pos_file for pos_file in os.listdir('./sig') if pos_file.endswith('.csv')]
    pos_name = positive_file[0]
    path = "./sig/{}".format(pos_name)
    pos_sig = pd.read_csv(path)
    return pos_sig


def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = base64.encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img


# upload the dataset file
@api.route('/uploads/meta', methods=['POST'])
@cross_origin()
def upload_dataset():
        print(request.method)
        print('63 has been executed')
        # check if the POST request has the file part
        if 'file' not in request.files:             #TODO: make sure set frontend's corresponding name as 'file'       
            return jsonify({'error':'no file uploaded'}), 400
        file = request.files['file']
        # check if the file name is empty string
        print('69 has been executed')
        if file.filename == '':
            return jsonify({'error':'file name cant be empty'}), 400
        print('72 has been executed')
        print(file.filename)
        if file and allowed_file(file.filename):
            print('74 has been executed')
            dataset_name = secure_filename(file.filename)
            print(file.filename)
            if is_empty_folder('./meta'):
                file.save(os.path.join(app.config['META_FOLDER'], dataset_name))
                return jsonify({'success':'successfully uploaded'}), 200
            else:
                print('82 has been executed')
                clear_folder('./meta/*')
                file.save(os.path.join(app.config['META_FOLDER'], dataset_name))
                return jsonify({'success':'successfully uploaded'}), 200
        else:
            return jsonify(error = 'your file name is insecure, please rename your file')
        
# upload the positive test file
@api.route('/uploads/sig', methods=['POST'])
@cross_origin()
def upload_pos_file():
    # check if the POST request has the file part
        if 'file' not in request.files:             #TODO: make sure set frontend's corresponding name as 'file'       
            return jsonify({'error':'no file uploaded'}), 400
        file = request.files['file']
        # check if the file name is empty string
        if file.filename == '':
            return jsonify({'error':'file name cant be empty'}), 400
        if file and allowed_file(file.filename):
            pos_file_name = secure_filename(file.filename)
            if is_empty_folder('./sig'):
                file.save(os.path.join(app.config['SIG_FOLDER'], pos_file_name))
                return jsonify({'success':'successfully uploaded'}), 200
            else:
                clear_folder('./sig/*')
                file.save(os.path.join(app.config['SIG_FOLDER'], pos_file_name))
                return jsonify({'success':'successfully uploaded'}), 200
        else:
            return jsonify(error = 'your file name is insecure, please rename your file')


@api.route('/loadTable', methods=['GET'])
@cross_origin()
def load_Table():
    sig = read_csv_sig_json()
    json_sig = json.loads(sig.to_json(orient='records'))
    return {'table': json_sig}, 200


# analyze the data
@api.route('/analyze', methods=['POST'])
@cross_origin()
def analyze_data():
    if not is_empty_folder('./meta') and not is_empty_folder('./sig'):
        meta_sig = read_csv_meta()
        sig = read_csv_sig()
        groupID = request.get_json()['groupID']
        tolerance = request.get_json()['tolerance']
        filter_level = request.get_json()['filter_level']
        print(groupID, tolerance, filter_level)
        table = analyze(sig, meta_sig, groupID, tolerance,filter_level)
        image_path = "./pics/group_{}_diff.png".format(groupID)
        # print(image_path)
        encoded_image = get_response_image(image_path)
        jsoned_table = json.loads(table.to_json(orient='records'))
        # print(jsoned_table)
        clear_folder('./nodes/*')
        clear_folder('./pics/*')
        # return jsoned_table, 200
        return {'table': jsoned_table, 'image':encoded_image}, 200
    else:
        return jsonify({'error': 'please check you uploaded files'}), 400

app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5050)
    



        



        

    
    
    
    
    
    
    
    


            


                 

