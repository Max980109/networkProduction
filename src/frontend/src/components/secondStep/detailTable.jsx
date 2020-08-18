import React from 'react'
import MaterialTable from "material-table";

export class detailTable extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.detailedTable !== this.props.detailedTable
    }

    render() {
        const detailedTable = this.props.detailedTable
        const exportedname = this.props.exportedname
        return (
            <MaterialTable
            title={`Node Information`}
            columns={[
              { title: "normalEdge", field: "Normal edge" },
              { title: "TNBCEdge", field: "TNBC edge" },
              { title: "edgeDiff", field: "edge diff" },
              { title: "pairedFc", field: "paired fc" },
              { title: "pairedId", field: "paired id" },
              { title: "pairedTransDiff", field: "paired trans diff" },
              { title: "pairedTransName", field: "paired trans name" },
              { title: "parentFc", field: "parent fc" },
              { title: "parentFeature", field: "parent feature" },
              { title: "parentId", field: "parent id" },
              { title: "productFc", field: "product fc" },
              { title: "productId", field: "product id" },
              { title: "productTransDiff", field: "product trans diff" },
              { title: "productTransName", field: "product trans name" },
            ]}
            style={{
              width: "100%",
            }}
            data={detailedTable}
            options={{
              headerStyle: {
                backgroundColor: "#98B2C3",
                color: "#FFF",
                textAlign: "left",
                position: "sticky",
                top: 0,
              },
              maxBodyHeight: "50vh",
              cellStyle: {
                fontSize: "13px",
                textAlign: "left",
              },
              search: false,
              paging: false,
              padding: "dense",
              doubleHorizontalScroll: true,
              exportButton: true,
              exportFileName: exportedname,
            }}
          /> 
        )
    }
}

export default detailTable