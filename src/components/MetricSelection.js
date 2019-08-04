import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Provider, createClient, useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";
import Select from 'react-select';

const client = createClient({
    url: "https://react.eogresources.com/graphql"
  });

  const getMetrics = state => {
    return state.metrics.metrics;
  };

  export default (props) => {
    return (
      <Provider value={client}>
        <MetricSelection {...props}/>
      </Provider>
    );
  };

  const MetricSelection = ({selectedMetrics, onChange}) => {
    const dispatch = useDispatch();
    const metrics = useSelector(getMetrics);
    const [result] = useQuery({
      query:`{
        getMetrics
      }`
    });
    const { fetching, data, error } = result;
    console.log(fetching, data, error);
    useEffect(
      () => {
        if (error) {
          dispatch({ type: actions.API_ERROR, error: error.message });
          return;
        }
        if (!data) return;
        const { getMetrics } = data;
        dispatch({ type: actions.METRICS_DATA_RECEIVED, getMetrics });
      },
      [dispatch, data, error]
    );
  
    if (fetching) return <LinearProgress />;
  
    return (
        <Select 
        label="Select An Equipment"  
        defaultOptions={selectedMetrics}
        options={metrics.map(metric => {return {label: metric, value: metric, key: metric}; })}
        onChange={onChange}
        isMulti={true}/>
    );
  };
  

