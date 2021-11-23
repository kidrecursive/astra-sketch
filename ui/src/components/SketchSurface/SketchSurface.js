import React from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Grid, Button } from "@mui/material";
import "./SketchSurface.css";

const styles = {
  border: "4px solid #9c9c9c",
  borderRadius: "0",
};

const SketchSurface = class extends React.Component {
  state = { strokeColor: "rgb(104, 166, 116)", debug: false };

  constructor(props) {
    super(props);
    this.sendSvg = props.sendSvg;
    this.canvasRef = React.createRef();
  }

  colorSelected = (e) => {
    const color = window
      .getComputedStyle(e.target, null)
      .getPropertyValue("background-color");
    this.setState({ strokeColor: color });
  };

  getSvg = async () => {
    const svg = await this.canvasRef.current.exportSvg();
    this.sendSvg(svg);
  };

  clear = () => {
    this.canvasRef.current.clearCanvas();
  };

  render() {
    let debugButtons;
    if (this.state.debug) {
      debugButtons = (
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <button
                onClick={() => {
                  this.getSvg().then((s) => {
                    console.log(s);
                  });
                }}
              >
                SVG
              </button>
            </Grid>
            <Grid item>
              <button
                onClick={() => {
                  this.clear();
                }}
              >
                Clear
              </button>
            </Grid>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ width: 320 }}
          spacing={2}
        >
          <Grid item>
            <ReactSketchCanvas
              name="sketch"
              ref={this.canvasRef}
              style={styles}
              width="400px"
              height="400px"
              strokeWidth={4}
              strokeColor={this.state.strokeColor}
            />
          </Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item>
                <input
                  className="btn-green"
                  type="button"
                  onClick={this.colorSelected}
                />
              </Grid>
              <Grid item>
                <input
                  className="btn-blue"
                  type="button"
                  onClick={this.colorSelected}
                />
              </Grid>
              <Grid item>
                <input
                  className="btn-lightblue"
                  type="button"
                  onClick={this.colorSelected}
                />
              </Grid>
              <Grid item>
                <input
                  className="btn-yellow"
                  type="button"
                  onClick={this.colorSelected}
                />
              </Grid>
              <Grid item>
                <input
                  className="btn-orange"
                  type="button"
                  onClick={this.colorSelected}
                />
              </Grid>
            </Grid>
          </Grid>
          {debugButtons}
          <Button
            style={{ marginTop: 32 }}
            fullWidth
            disableElevation
            size="large"
            variant="contained"
            color="primary"
            onClick={this.getSvg}
          >
            submit
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default SketchSurface;
