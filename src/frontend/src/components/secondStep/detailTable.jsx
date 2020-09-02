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
              { title: "Parent ID", field: "parent id" },
              { title: "Parent metbolite", field: "parent feature" },
              { title: "Parent FC", field: "parent fc" },
              { title: "Node_1 ID", field: "product id" },
              { title: "Node_1 biotransformation name", field: "product trans name" },
              { title: "Node_1 biotransfromation mass diff.", field: "product trans diff" },
              { title: "Node_1 FC", field: "product fc" },
              { title: "Node_2 ID", field: "paired id" },
              { title: "Node_2 biotransformation name", field: "paired trans name" },
              { title: "Node_2 biotransformation mass diff.", field: "paired trans diff" },
              { title: "Node_2 FC", field: "paired fc" },
              { title: "Condition_1 correlation coefficient", field: "Normal edge" },
              { title: "Condition_2 correlation coefficient", field: "TNBC edge" },
              { title: "Correlation coefficient diff.", field: "edge diff" },
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