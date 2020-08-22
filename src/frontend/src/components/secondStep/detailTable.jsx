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
              { title: "parent id", field: "parent id" },
              { title: "parent feature", field: "parent feature" },
              { title: "parent fc", field: "parent fc" },
              { title: "product id", field: "product id" },
              { title: "product trans name", field: "product trans name" },
              { title: "product trans diff", field: "product trans diff" },
              { title: "product fc", field: "product fc" },
              { title: "paired id", field: "paired id" },
              { title: "paired trans name", field: "paired trans name" },
              { title: "paired trans diff", field: "paired trans diff" },
              { title: "paired fc", field: "paired fc" },
              { title: "normal edge", field: "Normal edge" },
              { title: "TNBC edge", field: "TNBC edge" },
              { title: "edge diff", field: "edge diff" },
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