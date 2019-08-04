import * as actions from "../actions";

const initialState = {
    metrics: [],
    selectedMetrics: []
     
}
const metricsDataRecevied = (state, action) => {
  const { getMetrics } = action;
  
  return {...state, metrics: getMetrics};
};

const updateSelectedMetrics = (state, action) => {
    const { selectedMetrics =[] } = action;
    
    return {...state, selectedMetrics};
};
const updateNewMeasureMent = (state, action) => {
  const {measureMent} = action;
  return {...state, [measureMent.metric]: measureMent}; 
};

const handlers = {
  [actions.METRICS_DATA_RECEIVED]: metricsDataRecevied,
  [actions.METRICS_SELECTED]: updateSelectedMetrics,
  [actions.NEW_MEASUREMENT_RECEIVED]: updateNewMeasureMent,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
