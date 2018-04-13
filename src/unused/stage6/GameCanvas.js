import React, {Component} from 'react';
import {Stage, Layer, Rect, Text, Image, Line} from 'react-konva';
import rx1 from '../images/rx-square-1.png';
import rx2 from '../images/rx-square-2.png';
import rx3 from '../images/rx-square-3.png';
import bandage1 from '../images/bandage2vertical.png';
import bandage2 from '../images/rolled-bandages.png';
import bandage3 from '../images/bandage.png';
import instrument1 from '../images/scissor-closed-vertical.png';
import instrument2 from '../images/tweezer-vertical.png';
import instrument3 from '../images/syringe.png';


let width = 1000;
let height = 540;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// check if a num between min and max, inclusive
function between(min, max, num) {
  return (num >= min && num <= max);
}


class App extends Component {

  // generate random image infor upfront
  rx1s = this.generateImageInfoDiffLengthHeight(rx1, "rx1", 3, 50, 50, {from: 600, to: 950}, {from: 40, to: 130});
  rx2s = this.generateImageInfoDiffLengthHeight(rx2, "rx2", 3, 50, 50, {from: 600, to: 950}, {from: 40, to: 130});
  rx3s = this.generateImageInfoDiffLengthHeight(rx3, "rx3", 3, 50, 50, {from: 600, to: 950}, {from: 40, to: 130});
  bandage1s = this.generateImageInfoDiffLengthHeight(bandage1, "bandage1", 3, 30, 110, {from: 600, to: 950}, {
    from: 220,
    to: 250
  });
  bandage2s = this.generateImageInfoDiffLengthHeight(bandage2, "bandage2", 3, 50, 50, {from: 600, to: 950}, {
    from: 220,
    to: 250
  });
  bandage3s = this.generateImageInfoDiffLengthHeight(bandage3, "bandage3", 3, 50, 50, {from: 600, to: 950}, {
    from: 220,
    to: 250
  });
  instrument1s = this.generateImageInfoDiffLengthHeight(instrument1, "instrument1", 3, 30, 64, {
    from: 600,
    to: 950
  }, {from: 400, to: 450});
  instrument2s = this.generateImageInfoDiffLengthHeight(instrument2, "instrument2", 3, 30, 116, {
    from: 600,
    to: 950
  }, {from: 400, to: 450});
  instrument3s = this.generateImageInfoDiffLengthHeight(instrument3, "instrument3", 3, 30, 114, {
    from: 600,
    to: 950
  }, {from: 400, to: 450});


  // generate images info for objects that has a different length and height
  // returns an array of images info
  // paramaters:
  //  src- the image
  //  name - name of the icon
  //  num - how many to generate
  //  width and height of the image
  //  rangeX - between from and to, on x axis, the image should appear
  //  rangeY - between from and to, on x axis, the image should appear
  generateImageInfoDiffLengthHeight(src, name, num, width, height, rangeX, rangeY) {
    let imageInfo = [];

    // generate
    for (let i = 0; i < num; i++) {
      const image = new window.Image();
      image.src = src;
      image.width = width;
      image.height = height;
      image.class = name;

      let x = getRandomIntRange(rangeX.from, rangeX.to);
      let y = getRandomIntRange(rangeY.from, rangeY.to); // to make item show up at the bottom half of the canvas

      imageInfo.push({
        x, y, image
      });
    }
    return imageInfo;
  }

  handleDragEnd(e) {
    // console.log('drag end');
    const {x, y} = e.target.attrs;
    const {width, height} = e.target.attrs.image;
    const imgType = e.target.attrs.image.class;
    console.log(`width: ${width}`);

    // only when the icon is dragged to correct location, then update the image x and y in the store

    // if the icon is one of the medication
    if (["rx1", "rx2", "rx3"].find((item) => {
        return imgType === item
      })) {
      // a medication ie being dragged
      // is the icon ended up in the right location?
      if (between(0, 200 - width, x) && between(0, 540, y)) {
        // if it is, update the x and y for this image in the store
        let imageInfo = this.findImageInfoInArrays(e.target);
        imageInfo.x = x;
        imageInfo.y = y;
      }
    }

    // if the icon is one of the bandages
    if (["bandage1", "bandage2", "bandage3"].find((item) => {
        return imgType === item
      })) {
      // a medication ie being dragged
      // is the icon ended up in the right location?
      if (between(200, 400 - width, x) && between(0, 540, y)) {
        // if it is, update the x and y for this image in the store
        let imageInfo = this.findImageInfoInArrays(e.target);
        imageInfo.x = x;
        imageInfo.y = y;
      }
    }

    // if the icon is one of the bandages
    if (["instrument1", "instrument2", "instrument3"].find((item) => {
        return imgType === item
      })) {
      // a medication ie being dragged
      // is the icon ended up in the right location?
      if (between(400, 600 - width, x) && between(0, 540, y)) {
        // if it is, update the x and y for this image in the store
        let imageInfo = this.findImageInfoInArrays(e.target);
        imageInfo.x = x;
        imageInfo.y = y;
      }
    }


    this.forceUpdate();

  }

  // find an image in the arrays
  findImageInfoInArrays(imageMoved) {
    let imageInfo = null;

    //update the image in the array too

    // find the image info the the arrays
    let found = this.rx1s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.rx2s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.rx3s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.bandage1s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.bandage2s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.bandage3s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.instrument1s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.instrument2s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    found = this.instrument3s.find((item) => {
      return item.image === imageMoved.attrs.image;
    });
    if (found) imageInfo = found;

    return imageInfo;

  }

  // convert an array of image info to an array of konva image objects
  getKonvaImages(imageInfoArr, callback) {
    return imageInfoArr.map((info, i) => {
      let {x, y, image} = info;
      return <Image
        key={i}
        image={image}
        y={y}
        x={x}
        draggable={this.props.shouldHandleDrag}
        onDragEnd={this.handleDragEnd.bind(this)}
      />
    })
  }

  render() {
    return (
      <div>
        <Stage width={width} height={height}>
          <Layer>
            {this.getKonvaImages(this.rx1s)}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.rx2s)}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.rx3s)}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.bandage1s)}
            {this.getKonvaImages(this.bandage2s)}
            {this.getKonvaImages(this.bandage3s)}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.instrument1s)}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.instrument2s)}
            {this.getKonvaImages(this.instrument3s)}
          </Layer>

          <Layer>
            {/*labels on the first 3 column*/}
            <Text text="Medication" fontSize={20} y={20} x={40}/>
            <Text text="Pharmacy Kanban Card" fontSize={15} y={45} x={20}/>
            <Text text="Bandages" fontSize={20} y={20} x={250}/>
            <Text text="Bandages Kanban Card" fontSize={15} y={45} x={220}/>
            <Text text="Instruments" fontSize={20} y={20} x={450}/>
            <Text text="Supplies Kanban Card" fontSize={15} y={45} x={425}/>

            {/*labels on the 4th column*/}
            <Text text="Medication" fontSize={20} y={20} x={770}/>
            <Text text="Bandages" fontSize={20} y={200} x={770}/>
            <Text text="Instruments" fontSize={20} y={380} x={770}/>

            {/*first vertical line*/}
            <Line points={[200, 0, 200, height]} stroke={"#75a7ff"} strokeWidth={5}/>
            {/*second vertical line*/}
            <Line points={[400, 0, 400, height]} stroke={"#75a7ff"} strokeWidth={5}/>
            {/*third vertical line*/}
            <Line points={[600, 0, 600, height]} stroke={"#75a7ff"} strokeWidth={5}/>

            {/*first horizontal line*/}
            <Line points={[600, 180, 1000, 180]} stroke={"#75a7ff"} strokeWidth={5}/>
            {/*second horizontal line*/}
            <Line points={[600, 360, 1000, 360]} stroke={"#75a7ff"} strokeWidth={5}/>
          </Layer>
        </Stage>
      </div>
    );

  }
}


export default App;
