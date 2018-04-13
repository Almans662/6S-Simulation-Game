import React, {Component} from 'react';
import styled from 'styled-components';
import {Stage, Layer, Rect, Text, Image, Line} from 'react-konva';
import bandage from '../images/bandage.png';
import scissor from '../images/scissor.png';
import rx from '../images/rx.png';
import needle from '../images/needle.png';


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const width = 600;
const height = 540;

class App extends Component {

  // not updating until game is done or timer is up
  // because updating would cause the imagesOnCanas to be generated again
  shouldComponentUpdate(nextProps) {
    if (nextProps.gameDone == true) {
      return true;
    }
    return false;
    // return true;
  }

  imagesOnCanvas = [];
  bandages = this.generateRandomBandageImageInfo(bandage, "bandage", 10, 50);
  scissors = this.generateRandomBandageImageInfo(scissor, "scissor", 10, 50);
  rxs = this.generateRandomBandageImageInfo(rx, "rx", 5, 50);
  needles = this.generateRandomBandageImageInfo(needle, "needle", 5, 50);

  state = {
    image: null
  };

  handleDrag(e) {

    if (this.props.gameDone) return;

    // console.log(e.target);
    // console.log('drag here');
    const {x, y} = e.target.attrs;
    const imgType = e.target.attrs.image.class;
    // console.log(x);
    // console.log(y);
    // console.log(imgType);
    this.updateCorrectionStatus(e.target);
    this.updateImageInfo(e.target);
  }

  updateImageInfo(imageMoved) {
    // console.log(imageMoved.attrs);
    let imageInfo;

    //update the image in the array too

    // find the image info the the arrays
    let found = this.bandages.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.scissors.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.rxs.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.needles.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    // update with new information
    imageInfo.x = imageMoved.attrs.x;
    imageInfo.y = imageMoved.attrs.y;

  }

  updateCorrectionStatus(imageMoved) {

    // console.log('image moved');
    // console.log(imageMoved);

    let medicationCount = 0;
    let bandageCount = 0;
    let instrumentCount = 0;

    for (let i = 0; i < this.imagesOnCanvas.length; i++) {
      let imageOnCanvas = this.imagesOnCanvas[i];
      const {x, y} = imageOnCanvas.attrs;
      const imgType = imageOnCanvas.attrs.image.class;
      // console.log(x);
      // console.log(y);
      // console.log(imgType);

      switch (imgType) {
        case "rx": {
          if (x <= 185 && y <= 258) {
            medicationCount++;
          }
          break;
        }
        case "bandage": {
          if (x >= 202 && y >= 0 && x <= 387 && y <= 250) {
            bandageCount++;
          }
          break;
        }
        case "scissor":
        case "needle": {
          if (x >= 403 && y >= 0 && x <= 563 && y <= 243) {
            instrumentCount++;
          }
          break;
        }

      }
    }

    this.props.onDrag(medicationCount, bandageCount, instrumentCount);

  }

  generateRandomBandageImageInfo(src, name, num, len) {
    let imageInfo = [];
    for (let i = 0; i < num; i++) {
      const image = new window.Image();
      image.src = src;
      image.onload = () => {
        this.a.getLayer().batchDraw();
        this.b.getLayer().batchDraw();
        this.c.getLayer().batchDraw();
        this.d.getLayer().batchDraw();
      };

      let length = len - 10 + getRandomInt(10);
      image.width = length;
      image.height = length;
      image.class = name;

      let x = getRandomInt(width - 50);
      let y = getRandomInt(height / 2 - 50) + height / 2; // to make item show up at the bottom half of the canvas

      imageInfo.push({
        x, y, image
      });
    }
    return imageInfo;
  }


  getKonvaImages(imageInfoArr, callback) {
    return imageInfoArr.map((info, i) => {
      let {x, y, image} = info;
      return <Image
        key={i}
        image={image}
        y={y}
        x={x}
        draggable={!this.props.gameDone}
        onDragEnd={this.handleDrag.bind(this)}
        ref={node => {
          callback(node);
        }}/>
    })
  }

  render() {
    const halfHeight = height / 2;

    return (
      <div>
        <Stage width={width} height={height}>
          <Layer>
            {this.getKonvaImages(this.bandages, (node) => {
              this.imagesOnCanvas.push(node);
              this.a = node
            })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.scissors, (node) => {
              this.imagesOnCanvas.push(node);
              this.b = node
            })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.rxs, (node) => {
              this.imagesOnCanvas.push(node);
              this.c = node
            })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.needles, (node) => {
              this.imagesOnCanvas.push(node);
              this.d = node
            })}
          </Layer>
          <Layer>
            {/*labels*/}
            <Text text="Medication" fontSize={20} y={20} x={40}/>
            <Text text="Bandages" fontSize={20} y={20} x={250}/>
            <Text text="Instruments" fontSize={20} y={20} x={450}/>
            {/*the line in the middle*/}
            <Line points={[0, halfHeight, width, halfHeight]} stroke={"#75a7ff"} strokeWidth={5}/>
            {/*first vertical line*/}
            <Line points={[200, 0, 200, halfHeight]} stroke={"#75a7ff"} strokeWidth={5}/>
            {/*second vertical line*/}
            <Line points={[400, 0, 400, halfHeight]} stroke={"#75a7ff"} strokeWidth={5}/>
          </Layer>
        </Stage>
      </div>
    );
  }
}


export default App;
