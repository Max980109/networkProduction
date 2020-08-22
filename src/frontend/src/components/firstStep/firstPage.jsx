import React from "react";
import Button from "@material-ui/core/Button";
import { DropzoneArea } from "material-ui-dropzone";
import history from "../history";
//import SelectPolarity from "./selectPolarity.jsx";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import axios from "axios";
// import {useDispatch} from 'react-redux'
// import {newTolerance, newFilterValue} from './firstPageReducer'

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(10)
    
  },
  largeComponent: {
    height: "100%",
  },
  paperS1: {
    padding: theme.spacing(1),
    textAlign: "center",
    border: "3px solid #b0bec5",
    borderRadius: "10px",
  },
  paperS2: {
    padding: theme.spacing(1),
    textAlign: "center",
    border: "3px solid #4db6ac",
    borderRadius: "10px",
  },
  dropzoneText: {
    fontSize: "22px",
    color: "#bdbdbd",
    fontFamily: "Roboto",
  },
  typography1: {
    color: "#616161",
    backgroundColor: "#cfd8dc",
    border: "3px solid #cfd8dc",
    borderRadius: "5px",
  },
  typography2: {
    color: "#616161",
    backgroundColor: "#b2dfdb",
    border: "3px solid #b2dfdb",
    borderRadius: "5px",
  },
  buttonContainer: {
    margin: theme.spacing(5),
    padding: "0",
    display: "flex",
    justifyContent: "space-around"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

export class dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sigFiles: null,
      metaFiles: null,

    };
    this.wrapper = React.createRef()
    this.handleTolerance = this.handleTolerance.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.submitFiles = this.submitFiles.bind(this)
    this.runSample = this.runSample.bind(this)
  }

  handleTolerance(event) {
    this.props.onToleranceChange(event.target.value);
  }

  handleFilter(event) {
    this.props.onFilterChange(event.target.value);
  }

  async submitFiles() {
    if (this.state.sigFiles == null || this.state.metaFiles == null) {
      alert('Please uploading files before proceed !')
      return 
    }
    const sigData = new FormData();
    const metaData = new FormData();
    sigData.append('file', this.state.sigFiles)
    metaData.append('file',this.state.metaFiles)
    await axios.post('http://127.0.0.1:5000/uploads/sig', sigData,)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    await axios.post('http://127.0.0.1:5000/uploads/meta', metaData)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    history.push("./secondPage")
  }

  async runSample() {
    const sigData = new FormData();
    const metaData = new FormData();
    sigData.append('sample', this.state.sigFiles)
    metaData.append('sample',this.state.metaFiles)
    await axios.post('http://127.0.0.1:5000/uploads/sig', sigData,)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    await axios.post('http://127.0.0.1:5000/uploads/meta', metaData)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    history.push("./secondPage")
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} ref={this.wrapper}>
        <Grid container spacing={10}>
          <Grid
            container
            item
            lg={6}
            md={6}
            spacing={5}
            className={classes.largeComponent}
          >
            <Grid item lg={12} md={12}>
              <Typography
                className={classes.typography1}
                variant="h6"
                align="center"
              >
                Step1: Uploading a significance list
              </Typography>
            </Grid>

            <Grid item lg={12} md={12} className={classes.smallComponent}>
              <Paper className={classes.paperS1}>
                {" "}
                <DropzoneArea
                  acceptedFiles={[".csv"]}
                  filesLimit={1}
                  showFileNames={true}
                  onChange={(files) => {
                    this.setState({
                      sigFiles: files[0],
                    });
                    //console.log(this.state.sigFiles)
                  }}
                  dropzoneText="Significance list file"
                  dropzoneParagraphClass={classes.dropzoneText}
                  useChipsForPreview={true}
                />
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} className={classes.smallComponent}>
              <Paper className={classes.paperS1}>
                <div>
                  <TextField
                    className={classes.textField}
                    required
                    // id="outlined-required"
                    label="Tolerance"
                    defaultValue="0.01"
                    variant="outlined"
                    helperText="Enter tolerance here"
                    onChange = {this.handleTolerance}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item lg={6} md={6} className={classes.smallComponent}>
              <Paper className={classes.paperS1}>
                <div>
                  <TextField
                    className={classes.textField}
                    required
                    // id="outlined-required"
                    label="Filter Level"
                    defaultValue="0.01"
                    variant="outlined"
                    helperText="Enter filter level here"
                    onChange = {this.handleFilter}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={5}
            lg={6}
            md={6}
            className={classes.largeComponent}
          >
            <Grid className={classes.title} item lg={12} md={12}>
              <Typography
                variant="h6"
                className={classes.typography2}
                align="center"
              >
                Step2: Uploading a metabolomics file
              </Typography>
            </Grid>

            <Grid className={classes.smallComponent} item lg={12} md={12}>
              <Paper className={classes.paperS2}>
                <DropzoneArea
                  acceptedFiles={[".csv"]}
                  filesLimit={1}
                  showFileNames={true}
                  onChange={(files) => {
                    this.setState({
                      metaFiles: files[0],
                    });
                    //console.log(this.state.metaFiles)
                  }}
                  dropzoneText="Metabolomics file"
                  dropzoneParagraphClass={classes.dropzoneText}
                  useChipsForPreview={true}
                />
              </Paper>
            </Grid>
            <Container className={classes.buttonContainer}>
              <Button
                className={classes.button}
                size="large"
                variant="contained"
                style={{ 
                  backgroundColor: "#2F5D7C", 
                  color: "#FFFFFF", 
                }}
                onClick={this.submitFiles}
              >
                Next
              </Button>
              <Button
                className={classes.button}
                size="large"
                variant="contained"
                style={{ 
                  backgroundColor: "#2F5D7C", 
                  color: "#FFFFFF", 
                }}
                onClick={this.runSample}
              >
                Run Sample
              </Button>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(dropzone);
