import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text, Image, Line } from 'react-konva';
import Konva from "konva";
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";

// helpers
import {
  generateKonvaImages,
  generateHtmlImageInfosDiffLengthHeight,
  canvasWidth, canvasHeight,
  removeHtmlImageInfoItemFromArr,
  SEND_COORD,
  canvasHeight as height
} from '../helpers';
import rawImageInfos from './RawImageInfos';
import ResetArr from '../components/ResetArr';

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
    console.log(`x: ${x} y: ${y}`);

    if (!this.props.shouldHandleClick) return;

    let filenames = this.props.filenames;
    let filename = e.target.attrs.image.class;
    let found = filenames.indexOf(filename) >= 0 ? true : false;

    // console.log(filename);
    // detect which is being clicked on - todo
    if (found) {
      this.props.iconClicked(filename)

      // remove the image info from the html image info array
      // and set to the state so that it renders again with new info
      let updatedArr = removeHtmlImageInfoItemFromArr(this.state.htmlImageInfos, x, y);
      this.setState({ htmlImageInfos: updatedArr });
    } else if (filename == "dirty-bandage.png" || filename == "dirty-scissor.png") {
      // console.log('here1');
      this.props.showOuchModal();
    } else {
      // console.log('here2');
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
              <li>The fourth “S” is <b>Scrub</b></li>
              <li>In Scrub, you will:</li>
              <ul>
                <li>Shine or sweep the workplace</li>
                <li>Cleanliness is important because it solves many problems such as, misplacing items and confusion</li>
              </ul>
              <li>In this stage, you will be required to <b>single-click</b></li>
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
                      console.log(`x: ${x} y: ${y}`);
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
              (node) => { this.myImage = node },
              true
            )}


          </Layer>

          <Layer>
            {/*labels*/}
            <Text text="Medication" fontSize={20} y={20} x={40} />
            <Text text="Bandages" fontSize={20} y={20} x={250} />
            <Text text="Instruments" fontSize={20} y={20} x={450} />
            {/*first vertical line*/}
            <Line points={[200, 0, 200, height]} stroke={"#75a7ff"} strokeWidth={5} />
            {/*second vertical line*/}
            <Line points={[400, 0, 400, height]} stroke={"#75a7ff"} strokeWidth={5} />
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