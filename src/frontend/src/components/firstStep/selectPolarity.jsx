import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});


export class selectPolarity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      polarity: "",
      setpolarity: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange = (event) => {
    this.polarity = event.target.value
  };

  render() {
    const { classes } = this.props;
    return (
      <div id= "selectPolarity">
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Polarity</InputLabel>
        <Select
          native
          value={this.polarity}
          onChange={this.handleChange}
          label="Polarity"
          inputProps={{
            name: 'polarity',
            id: 'outlined-polarity-native-simple',
          }}
        >
          <option value='neutral'>Neutral 0</option>
          <option value='positive'>Positive + 1</option>
          <option value='negative'>Negative + 1</option>
        </Select>
        <FormHelperText> polarity for significance list</FormHelperText>
      </FormControl>

        
      </div>)
  }
  
}

export default withStyles(useStyles)(selectPolarity);