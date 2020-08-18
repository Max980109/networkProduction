import React from 'react'
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
    containerTop: {
      padding: "0",
      height: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });


export class nodeImage extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.image !== this.props.image
    }
    
    render() {
        const { classes } = this.props;
        const image = this.props.image 

        return(
            <Container className={classes.containerTop}>
                <img
                ref={this.imgRef}
                alt="nodePic"
                src={`data:image/png;base64,${image}`}
              />
            </Container>
              
        )
    }


}

export default withStyles(useStyles)(nodeImage);