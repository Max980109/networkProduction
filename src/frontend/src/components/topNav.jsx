import React from "react";
import "../index.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import history from "./history.js";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Ubclogo from '../assets/ubcChem.jpg';
const useStyles = (theme) => ({
  root: {},
  logoContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '120px'
  },
  appBar: {
    backgroundColor: '#2F5D7C'
  }
  ,
  logo: {
    position:'absolute',
    left: '0',
    top: '0',
    height: '100%'
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  // title: {
  //   flexGrow: 1,
  // },
});

export class topNav extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.logoContainer}>
            <img  src={Ubclogo} alt="ubclogo" className={classes.logo} />
            {/* <Logo className={classes.logo}/> */}
          </div>      
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <IconButton
              onClick={() => history.push("./")}
              edge="start"
              color="inherit"
              aria-label="flask"
            >
              <SvgIcon fontSize="default">
                <path d="M13,11.33L18,18H6l5-6.67V6h2 M15.96,4H8.04C7.62,4,7.39,4.48,7.65,4.81L9,6.5v4.17L3.2,18.4C2.71,19.06,3.18,20,4,20h16 c0.82,0,1.29-0.94,0.8-1.6L15,10.67V6.5l1.35-1.69C16.61,4.48,16.38,4,15.96,4L15.96,4z" />
              </SvgIcon>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Network Comparison
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              className={classes.menuButton}
              onClick={() => history.push("./reactions")}
            >
              Biotransformation Reactions
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              className={classes.menuButton}
              href = "https://www.chem.ubc.ca/tao-huan"
            >
              About US
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles)(topNav);
