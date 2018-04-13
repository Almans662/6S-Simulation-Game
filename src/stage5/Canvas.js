import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Image, Line } from 'react-konva';
import rx from '../images/rx-square-1.png';
import rx2 from '../images/rx-square-2.png';
import rx3 from '../images/rx-square-3.png';
import bandage1 from '../images/bandage2vertical.png';
import bandage2 from '../images/rolled-bandages.png';
import bandage3 from '../images/bandage.png';
import instrument1 from '../images/scissor-closed-vertical.png';
import instrument1reverse from '../images/scissor-closed-vertial-reverse.png';
import instrument2 from '../images/tweezer-vertical.png';
import instrument3 from '../images/syringe.png';


// helpers
import {
  generateKonvaImages,
  generateHtmlImageInfosDiffLengthHeight,
  canvasWidth as width,
  canvasHeight,
  removeHtmlImageInfoItemFromArr,
  SEND_COORD
} from '../helpers';
import ResetArr from '../components/ResetArr';

let height = 700;


let rx1s = [
  {
    src: rx,
    name: "rx1",
    length: 50,
    x: 10,
    y: 70
  },
  {
    src: rx,
    name: "rx1",
    length: 50,
    x: 70,
    y: 70
  },
  {
    src: rx,
    name: "rx1",
    length: 50,
    x: 130,
    y: 70
  },
  {
    src: rx,
    name: "rx1",
    length: 50,
    x: 10,
    y: 130
  },
  {
    src: rx,
    name: "rx1",
    length: 50,
    x: 70,
    y: 130
  },
  {
    src: rx,
    name: "rx1",
    length: 50,
    x: 130,
    y: 130
  }
]

let rx2s = [
  {
    src: rx2,
    name: "rx2",
    length: 50,
    x: 10,
    y: 200
  },
  {
    src: rx2,
    name: "rx2",
    length: 50,
    x: 70,
    y: 200
  },
  {
    src: rx2,
    name: "rx2",
    length: 50,
    x: 130,
    y: 200
  },
  {
    src: rx2,
    name: "rx2",
    length: 50,
    x: 10,
    y: 260
  },
  {
    src: rx2,
    name: "rx2",
    length: 50,
    x: 70,
    y: 260
  },
  {
    src: rx2,
    name: "rx2",
    length: 50,
    x: 130,
    y: 260
  }
]

let rx3s = [
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 10,
    y: 330
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 70,
    y: 330
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 130,
    y: 330
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 10,
    y: 390
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 70,
    y: 390
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 130,
    y: 390
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 10,
    y: 450
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 70,
    y: 450
  },
  {
    src: rx3,
    name: "rx3",
    length: 50,
    x: 130,
    y: 450
  }
]

let bandages1s = [
  {
    src: bandage1,
    name: "bandage1",
    width: 30,
    height: 115,
    x: 210,
    y: 70
  },
  {
    src: bandage1,
    name: "bandage1",
    width: 30,
    height: 115,
    x: 240,
    y: 70
  },
  {
    src: bandage1,
    name: "bandage1",
    width: 30,
    height: 115,
    x: 270,
    y: 70
  },
  {
    src: bandage1,
    name: "bandage1",
    width: 30,
    height: 115,
    x: 300,
    y: 70
  },
  {
    src: bandage1,
    name: "bandage1",
    width: 30,
    height: 115,
    x: 330,
    y: 70
  },
  {
    src: bandage1,
    name: "bandage1",
    width: 30,
    height: 115,
    x: 360,
    y: 70
  },

]

let bandages2s = [
  {
    src: bandage2,
    name: "bandage2",
    length: 50,
    x: 210,
    y: 200
  },
  {
    src: bandage2,
    name: "bandage2",
    length: 50,
    x: 270,
    y: 200
  },
  {
    src: bandage2,
    name: "bandage2",
    length: 50,
    x: 330,
    y: 200
  },
  {
    src: bandage2,
    name: "bandage2",
    length: 50,
    x: 210,
    y: 260
  },
  {
    src: bandage2,
    name: "bandage2",
    length: 50,
    x: 270,
    y: 260
  },
  {
    src: bandage2,
    name: "bandage2",
    length: 50,
    x: 330,
    y: 260
  },
]

let bandages3s = [
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 210,
    y: 330
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 270,
    y: 330
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 330,
    y: 330
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 210,
    y: 390
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 270,
    y: 390
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 330,
    y: 390
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 210,
    y: 450
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 270,
    y: 450
  },
  {
    src: bandage3,
    name: "bandage3",
    length: 50,
    x: 330,
    y: 450
  },
]


let instrument1s = [
  {
    src: instrument1,
    name: "instrument1",
    width: 30,
    height: 64,
    x: 410,
    y: 70
  },
  {
    src: instrument1,
    name: "instrument1",
    width: 30,
    height: 64,
    x: 440,
    y: 70
  },
  {
    src: instrument1,
    name: "instrument1",
    width: 30,
    height: 64,
    x: 470,
    y: 70
  },
  {
    src: instrument1,
    name: "instrument1",
    width: 30,
    height: 64,
    x: 500,
    y: 70
  },
  {
    src: instrument1,
    name: "instrument1",
    width: 30,
    height: 64,
    x: 530,
    y: 70
  },
  {
    src: instrument1,
    name: "instrument1",
    width: 30,
    height: 64,
    x: 560,
    y: 70
  },

]



let instrument2s = [
  {
    src: instrument2,
    name: "instrument2",
    width: 30,
    height: 116,
    x: 410,
    y: 200
  },
  {
    src: instrument2,
    name: "instrument2",
    width: 30,
    height: 116,
    x: 440,
    y: 200
  },
  {
    src: instrument2,
    name: "instrument2",
    width: 30,
    height: 116,
    x: 470,
    y: 200
  },
  {
    src: instrument2,
    name: "instrument2",
    width: 30,
    height: 116,
    x: 500,
    y: 200
  },
  {
    src: instrument2,
    name: "instrument2",
    width: 30,
    height: 116,
    x: 530,
    y: 200
  },
  {
    src: instrument2,
    name: "instrument2",
    width: 30,
    height: 116,
    x: 560,
    y: 200
  },
];

let instrument3s = [
  {
    src: instrument3,
    name: "instrument3",
    width: 30,
    height: 114,
    x: 410,
    y: 340
  },
  {
    src: instrument3,
    name: "instrument3",
    width: 30,
    height: 114,
    x: 445,
    y: 340
  },
  {
    src: instrument3,
    name: "instrument3",
    width: 30,
    height: 114,
    x: 480,
    y: 340
  },
  {
    src: instrument3,
    name: "instrument3",
    width: 30,
    height: 114,
    x: 515,
    y: 340
  },
  {
    src: instrument3,
    name: "instrument3",
    width: 30,
    height: 114,
    x: 550,
    y: 340
  },


];


// my names to file names
let imageNameMap = {
  "instrument2": "tweezer-vertical.png",
  "instrument3": "syringe.png",
  "bandage1": "bandage2vertical.png",
  "bandage3": "bandage.png",
  "rx3": "rx-square-3.png",
  "rx2": "rx-square-2.png"
}



class App extends Component {

  constructor() {
    super();

    this.state = {
      color: 'green',
      image: null,

      // medication
      rxs: this.generateBandageImageInfo(rx1s),
      rx2s: this.generateBandageImageInfo(rx2s),
      rx3s: this.generateBandageImageInfo(rx3s),

      // // bandages
      bandage1s: this.generateImageInfoDiffLengthHeight(bandages1s),
      bandage2s: this.generateBandageImageInfo(bandages2s),
      bandage3s: this.generateBandageImageInfo(bandages3s),


      // //instruments
      instrument1s: this.generateImageInfoDiffLengthHeight(instrument1s),
      instrument2s: this.generateImageInfoDiffLengthHeight(instrument2s),
      instrument3s: this.generateImageInfoDiffLengthHeight(instrument3s),
    };

  }

  handleClick(e) {
    if (!this.props.shouldHandleClick) return;

    // console.log(e.target);
    // console.log(e.target.attrs.image.class);
    // console.log(e.target.index);
    let { x, y } = e.target.attrs;

    let imageClassName = e.target.attrs.image.class; // instrument1, bandage1 etc
    let filename = imageNameMap[imageClassName];
    let found = this.props.filenames.indexOf(filename) >= 0 ? true : false;

    if (found) {

      // get existing number clicked
      let num = this.props.parentState[filename];
      if (num >= this.props.maxPickNum) return;

      this.props.rightIconClicked(filename);

      // remove icons from arrays
      if (filename == "tweezer-vertical.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.instrument2s, x, y);
        this.setState({ instrument2s: updatedArr });
      } else if (filename == "syringe.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.instrument3s, x, y);
        this.setState({ instrument3s: updatedArr });
      } else if (filename == "bandage2vertical.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.bandage1s, x, y);
        this.setState({ bandage1s: updatedArr });
      } else if (filename == "bandage.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.bandage3s, x, y);
        this.setState({ bandage3s: updatedArr });
      } else if (filename == "syringe.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.instrument3s, x, y);
        this.setState({ instrument3s: updatedArr });
      } else if (filename == "rx-square-3.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.rx3s, x, y);
        this.setState({ rx3s: updatedArr });
      } else if (filename == "rx-square-2.png") {
        let updatedArr = removeHtmlImageInfoItemFromArr(this.state.rx2s, x, y);
        this.setState({ rx2s: updatedArr });
      }

    } else {

      this.props.wrongItemSelected();

    }


  }

  generateBandageImageInfo(arr) {
    let imageInfo = [];
    for (let i = 0; i < arr.length; i++) {
      let info = arr[i];
      let { src, name, length, x, y } = info;

      const image = new window.Image();
      image.src = src;
      image.onload = () => {
        this.rxs.getLayer().batchDraw();
        this.rx2.getLayer().batchDraw();
        this.rx3.getLayer().batchDraw();
        this.bandage2.getLayer().batchDraw();
        this.bandage3.getLayer().batchDraw();

      };

      image.width = length;
      image.height = length;
      image.class = name;

      imageInfo.push({
        x, y, image
      });
    }
    return imageInfo;
  }

  // generate images info for objects that has a different length and height
  generateImageInfoDiffLengthHeight(arr) {
    let imageInfo = [];
    for (let i = 0; i < arr.length; i++) {
      let info = arr[i];
      let { src, name, width, height, x, y } = info;

      const image = new window.Image();
      image.src = src;
      image.onload = () => {
        this.bandage1.getLayer().batchDraw();
        this.instrument1.getLayer().batchDraw();
        this.instrument2.getLayer().batchDraw();
        this.instrument3.getLayer().batchDraw();
      };

      image.width = width;
      image.height = height;
      image.class = name;

      imageInfo.push({
        x, y, image
      });
    }
    return imageInfo;
  }

  getKonvaImages(imageInfoArr, callback) {
    return imageInfoArr.map((info, i) => {
      let { x, y, image } = info;
      return <Image key={i} image={image} y={y} x={x} onclick={this.handleClick.bind(this)} ref={node => {
        callback(node);
      }} />
    })
  }

  render() {
    return (
      <div style={{ width: width, height: height + 10, position: "relative" }}>
        {this.props.showInstructionCover &&
          <div className="instruction-cover">
            <h1>Instruction to play the game</h1>
            <ul>
              <li>The fourth “S” is <b>Standardize</b></li>
              <li>Here we will:</li>
              <ul>
                <li>Develop a simple system for storing things that makes them easy to find, use, put away, and replace</li>
              </ul>
              <li>In this stage, you will be required to <b>single-click</b></li>
            </ul>
          </div>
        }
        <Stage width={width} height={height}>
          <Layer>
            {this.getKonvaImages(this.state.rxs, (node) => { this.rxs = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.rx2s, (node) => { this.rx2 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.rx3s, (node) => { this.rx3 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.bandage1s, (node) => { this.bandage1 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.bandage2s, (node) => { this.bandage2 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.bandage3s, (node) => { this.bandage3 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.instrument1s, (node) => { this.instrument1 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.instrument2s, (node) => { this.instrument2 = node })}
          </Layer>
          <Layer>
            {this.getKonvaImages(this.state.instrument3s, (node) => { this.instrument3 = node })}
          </Layer>
          <Layer>
            {/*labels*/}
            <Text text="Medication" fontSize={20} y={20} x={40} />
            <Text text="Pharmacy Kanban Card" fontSize={15} y={45} x={20} />
            <Text text="Bandages" fontSize={20} y={20} x={250} />
            <Text text="Bandages Kanban Card" fontSize={15} y={45} x={220} />
            <Text text="Instruments" fontSize={20} y={20} x={450} />
            <Text text="Supplies Kanban Card" fontSize={15} y={45} x={425} />
            {/*first vertical line*/}
            <Line points={[200, 0, 200, height]} stroke={"#75a7ff"} strokeWidth={5} />
            {/*second vertical line*/}
            <Line points={[400, 0, 400, height]} stroke={"#75a7ff"} strokeWidth={5} />
            {/*first horizontal line*/}
            <Line points={[0, 190, width, 200]} stroke={"#75a7ff"} strokeWidth={5} />
            {/*first horizontal line*/}
            <Line points={[0, 320, width, 320]} stroke={"#75a7ff"} strokeWidth={5} />

          </Layer>
        </Stage>
      </div>
    );

  }
}


export default App;
