import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
import * as actions from "../store/actions";
import {LineChart, Label, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;
const formatDate = (milliseconds) => {
  const date = new Date(milliseconds);
  const monthDate = date.getDate();//1-31
  const month = date.getMonth();//0-11
  const year = date.getFullYear();//YYYY
  const hr = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${MONTHS[month]} ${monthDate} ${year} ${hr}:${min}:${sec}`;
}


const getChartData = (state) => {
  //console.log("getChartData", state);
  return state.chart;
}

const timeBeforeHalfAnHour = new Date() - 30 * 60 * 1000;

export default ({metrics}) => {
    console.log("metrics in chart", metrics);
    const dispatch = useDispatch();
    const chartsData = useSelector(getChartData);
    const receiveChartData = useCallback(
        getMultipleMeasurements =>
          dispatch({
            type: actions.CHART_DATA_RECEIVED,
            data: getMultipleMeasurements
          }),
        [dispatch]
      );
    
      const [queryResult] = useQuery(
        {
          query,
          variables: {
            input: metrics.map(metricName => ({
              metricName,
              after: timeBeforeHalfAnHour
            }))
          }
        },
        [metrics]
      );
      useEffect(
        () => {
          const { data } = queryResult;
          console.log("queryResult", queryResult);
          if (!data) return;
          receiveChartData(data.getMultipleMeasurements);
        },
        [queryResult, receiveChartData]
      );
  return (
    <div>
    {chartsData && Object.keys(chartsData).length && Object.keys(chartsData).map(metric => {
      return ( <LineChart
        key={metric}
        width={700}
        height={200}
        data={chartsData[metric]}
        syncId={metric} 
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at">
          <Label value={`Showing last 30 min on X-axis (${metric})`} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="value" label={{ value: `(${chartsData[metric][0].unit})`, angle: -90, position: 'insideLeft' }}>
        </YAxis>
        <Tooltip labelFormatter={data => ''} formatter={(value, name, props) => [`${value} ${props.payload.unit} at ${formatDate(props.payload.at)}`, metric]}/>
        <Line type="monotone" dataKey="value" dot={false} stroke="#8884d8" fill="#8884d8" />
      </LineChart>);


    })}
    </div>
  );
};