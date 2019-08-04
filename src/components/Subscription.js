import React from 'react';
import { useDispatch } from "react-redux";
import {Subscription } from 'urql';
import * as actions from "../store/actions";

const newMessages = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () =>{
  const dispatch = useDispatch();
  return <Subscription query={newMessages}>
  {({ data }) => {
    if(data) dispatch({type: actions.NEW_MEASUREMENT_RECEIVED, measureMent: data.newMeasurement})
    return  <span/>;
  }}
 
</Subscription>;
};