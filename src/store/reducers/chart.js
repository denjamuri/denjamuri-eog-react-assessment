import * as actions from "../actions";

const initialState = {
};

const updateChartData = (state, {type, data=[]}) => {
  console.log("action", type, data);
  let newState = {};
  data.forEach(m => {newState = {...newState,[m.metric]: m.measurements }})
  return newState;
  
};

const updateLiveChartData = (state, {type, data=[]}) => {
    let newState = {};
    data.forEach(m => {newState = {...newState,[m.metric]: m.measurements }})
    return newState;
    
  };
const updateNewMeasureMent = (state, action) => {
    if(action.measureMent && state[action.measureMent.metric]) {
        return {...state, [action.measureMent.metric]: [...state[action.measureMent.metric], action.measureMent]}
    }
    return state;
  };
const handlers = {
  [actions.CHART_DATA_RECEIVED]:updateChartData,
  [actions.NEW_MEASUREMENT_RECEIVED]: updateNewMeasureMent,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
