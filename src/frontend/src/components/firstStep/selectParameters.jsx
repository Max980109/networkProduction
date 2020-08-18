import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    textField: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  });

export class selectParameters extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          className = {classes.textField}
          required
          id="outlined-required"
          label="Parameters"
          defaultValue="0.1"
          variant="outlined"
          helperText="Enter parameters here"
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(selectParameters);