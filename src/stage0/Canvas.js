import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from "konva";
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";

// helpers
import {
  generateKonvaImages,
  generateHtmlImageInfosDiffLengthHeight,
  canvasWidth, canvasHeight,
  removeHtmlImageInfoItemFromArr
} from '../helpers';
import rawImageInfos from './RawImageInfos';
import ResetArr from '../components/ResetArr';

const SEND_COORD = gql`
  mutation ($coordInput: CoordInput!) {
    sendCoord(input: $coordInput) {
      filename
      width
      height
      x
      y
  }
}
`

export default class extends Component {

  constructor() {
    super();

    this.state = {
      htmlImageInfos: generateHtmlImageInfosDiffLengthHeight(rawImageInfos, this.imageCb),
      filename: "",
      width: "",
      height: ""
    }

  }

  // needed sometimes for onload event on the image
  imageCb = () => {
    this.myImage.getLayer().batchDraw();
  }

  handleClick(e) {
    let { x, y } = e.target.attrs;
    // console.log(`x: ${x} y: {y}`);

    if (!this.props.shouldHandleClick) return;

    let filename = e.target.attrs.image.class;

    // detect which is being clicked on - todo
    if (filename === "needle.png" ||
      filename === "bandage.png" ||
      filename === "rx-all-circle/rx-square-2.png" ||
      filename === "scissor-open.png"
    ) {
      this.props.iconClicked(filename)

      // remove the image info from the html image info array
      // and set to the state so that it renders again with new info
      let updatedArr = removeHtmlImageInfoItemFromArr(this.state.htmlImageInfos, x, y);
      this.setState({ htmlImageInfos: updatedArr });
    } else {
      this.props.wrongItemSelected();
    }

  }

  render() {
    return (
      <div style={{ width: canvasWidth, height: canvasHeight + 10, position: "relative" }}>
        {this.props.showInstructionCover &&
          <div className="instruction-cover">
            <h1>Instruction to play the game</h1>
            <ul>
              <li>We will apply 6S to a workplace and measure the improvement in executing our job</li>
              <li>During each <b>20 second round</b>, your job is to gather the needed supplies (located at the top right corner)
              (
            <img src={require("../images/needle.png")} />
                <img src={require("../images/bandage.png")} />
                <img src={require("../images/rx-all-circle/rx-square-2.png")} />
                <img src={require("../images/scissor-open.png")} />
                )
          </li>
              <li>Choosing the incorrect item will lead to a message popup that leads to a delay</li>
              <li>After you press start, the page will take you to the current workplace that will be improved within each stage</li>
              <li>In order to gather the needed items, you will be required to either single click or double click (indicated before each stage)</li>
              <li>For the initial stage, you will need to <b>double-click</b> in order to gather items</li>
            </ul>
          </div>
        }

        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer>
            <Mutation mutation={SEND_COORD}>
              {(sendCoord) => {
                return (
                  <Rect
                    x={0}
                    y={0}
                    width={canvasWidth}
                    height={canvasHeight}
                    fill={"white"}
                    shadowBlur={0}
                    onClick={(e) => {
                      let { layerX: x, layerY: y } = e.evt;
                      let { filename, width, height } = this.state;

                      // sendCoord({
                      //   variables: {
                      //     coordInput: {
                      //       x: Number(x), y: Number(y), filename, width: Number(width), height: Number(height)
                      //     }
                      //   }
                      // });

                    }}
                  />
                )
              }}
            </Mutation>

            {generateKonvaImages(
              this.state.htmlImageInfos,
              this.handleClick.bind(this),
              (node) => { this.myImage = node }
            )}

          </Layer>
        </Stage>


        {/*
        <div className="add-margin-top">
          <input type="text" placeholder="filename" value={this.state.filename} onChange={(e) => this.setState({ filename: e.target.value })} />
          <input placeholder="width" value={this.state.width} onChange={(e) => this.setState({ width: e.target.value })} />
          <input placeholder="height" value={this.state.height} onChange={(e) => this.setState({ height: e.target.value })} />
        </div>

        <ResetArr />

        */}

      </div>


    );
  }
}