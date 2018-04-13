import React, { Component } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';
import Konva from "konva";
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";

export default class ResetArr extends Component {
  render() {
    return (
      <Mutation mutation={gql`
        mutation {
          resetImageInfoArr
        }
      `}>
        {(reset) => {
          return <button onClick={() => {
            reset();
          }}>reset array</button>
        }}
      </Mutation>
    )
  }
}
