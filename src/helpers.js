import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import gql from "graphql-tag";

export const canvasWidth = 600;
export const canvasHeight = 540;

// generate an array of konva Image element with an html image info array
export const generateKonvaImages = function (htmlImageInfoArr, clickHandler, callback, isSingleClick) {

  // console.log(`here is for var is single lick value is ${isSingleClick}`);
  let singleClickHandler = isSingleClick ? clickHandler : null;

  let arr = htmlImageInfoArr.map((info, i) => {
    let { x, y, image, width, height } = info;
    return <Image
      draggable={false}
      onDragEnd={(e) => {
        console.log(e);
        let x = e.target.attrs.x;
        let y = e.target.attrs.y;
        console.log(`x: ${x} y: ${y}`);

      }}
      key={i}
      image={image}
      y={y}
      x={x}
      onDblclick={clickHandler}
      onclick={singleClickHandler}
      // rotation={Math.floor(Math.random() * 180)}
      // offset={{
      //   x: width / 2,
      //   y: height / 2
      // }}
      ref={node => {
        callback(node);
      }} />
  })

  return arr;
}

// with raw image info array, generate an an array that contains html image and its x and y
// generate images info for objects that has a different length and height
// will be used by konva
export const generateHtmlImageInfosDiffLengthHeight = (arr, callback) => {
  let htmlImageInfos = [];
  // console.log(`here is an log for arr`);
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    let info = arr[i];
    let { filename, width, height, x, y } = info;

    const image = new window.Image();
    image.src = require(`./images/${filename}`);
    image.onload = () => {
      // this.myImage.getLayer().batchDraw();
      callback();
    };

    image.width = width;
    image.height = height;
    image.class = filename;

    htmlImageInfos.push({
      x, y, image, width, height
    });
  }
  // console.log(htmlImageInfos);
  return htmlImageInfos;
}

// remove an html image info from the array with x and y
// non-mutated; returns a new arr
export const removeHtmlImageInfoItemFromArr = (arr, x, y) => {
  arr = [...arr];
  // find the index of the item
  let index = arr.findIndex((item) => {
    return item.x == x && item.y == y;
  });

  // remove it from the array
  arr.splice(index, 1);
  return arr;
}

export const SEND_COORD = gql`
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