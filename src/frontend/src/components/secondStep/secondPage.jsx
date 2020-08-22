import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { exportComponentAsPNG } from "react-component-export-image";
import NodeImage from "./nodeImage.jsx"
import DetailedTable from "./detailTable.jsx"


const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(10),
  },
  containerTop: {
    padding: "0",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export class secondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      sigData: [],
      detailedTable: [],
      selectedRow: 1,
      prevRow: null
    };
    this.imgRef = React.createRef();
    this.loadTable = this.loadTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this)
  }

  componentDidMount() {
    this.loadTable();
  }

  loadTable() {
    let postData = {
      groupID: this.state.selectedRow,
      tolerance: this.props.tolerance,
      filter_level: this.props.filterLevel,
    };
    axios
      .all([
        axios.get("http://127.0.0.1:5000/loadTable"),
        axios.post("http://127.0.0.1:5000/analyze", postData),
      ])
      .then(
        axios.spread((getRes, postRes) => {
          this.setState({
            sigData: getRes.data.table,
            image: postRes.data.image,
            detailedTable: postRes.data.table,
          });
        })
      );

      
  }


  async handleChange() {
      if (this.state.prevRow !== this.state.selectedRow){
        const tempRow = this.state.selectedRow
        let postData = {
          groupID: this.state.selectedRow,
          tolerance: this.props.tolerance,
          filter_level: this.props.filterLevel,
        };
        let detail = await axios
          .post("http://127.0.0.1:5000/analyze", postData)
          .then(function (response) {
            return response;
          })
          .catch(function (err) {
            console.log(err);
          });
        console.log(detail);
        this.setState({
          image: detail.data.image,
          detailedTable: detail.data.table,
          prevRow: tempRow
        });
      }
  }

  handleRowClick(event, selectedRow) {
    const nowRow = selectedRow.tableData.id
    if (nowRow !== this.state.selectedRow){
      this.setState(prevState => {
        return{
          selectedRow: nowRow,
          prevRow: prevState.selectedRow
        }  
      });
    }
  }

  render() {
    const { classes } = this.props;
    const sigData = this.state.sigData;
    const rowIndex = this.state.selectedRow;
    const detailedTable = this.state.detailedTable;
    const image = this.state.image;
    const exportedname = `node_${rowIndex}_info`;
    return (
      <div className={classes.root}>
        <Grid container className={classes.GridContainer} spacing={8}>
          <Grid item lg={6} md={6}>
            <MaterialTable
              title="Significance List"
              columns={[
                { title: "ID", field: "ID", type: "numeric" },
                { title: "Mass", field: "mass" },
                { title: "Name", field: "name" },
                { title: "RT", field: "rt", type: "numeric" },
                // { title: "SMILE", field: "SMILE" },
              ]}
              style={{
                width: "100%",
              }}
              data={sigData}
              onRowClick={
                this.handleRowClick
              }
              options={{
                headerStyle: {
                  backgroundColor: "#98B2C3",
                  color: "#FFF",
                  textAlign: "left",
                  position: "sticky",
                  top: 0,
                },
                cellStyle: {
                  fontSize: "13px",
                  maxwidth: "1px",
                  textAlign: "left",
                },
                maxBodyHeight: "50vh",
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowIndex === rowData.tableData.id ? "#EEE" : "#FFF",
                }),
                search: false,
                paging: false,
                padding: "dense",
                doubleHorizontalScroll: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} align="center">
            <NodeImage ref={this.imgRef} image={image}/>
          </Grid>
          <Grid item lg={6} md={6} align="right">
            <Button
              variant="contained"
              style={{ backgroundColor: "#2F5D7C", color: "#FFFFFF" }}
              onClick={this.handleChange}
            >
              See new Node
            </Button>
          </Grid>
          <Grid item lg={6} md={6} align="right">
            <Button
              variant="contained"
              style={{ backgroundColor: "#2F5D7C", color: "#FFFFFF" }}
              onClick={() => exportComponentAsPNG(this.imgRef)}
            >
              Download Image
            </Button>
          </Grid>
          <Grid item lg={12} md={12} align="center">
            <DetailedTable 
            detailedTable={detailedTable}
            exportedname={exportedname}/>   
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(secondPage);
