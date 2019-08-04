export const API_ERROR = "EVENT/API_ERROR_RECEIVED";
export const WEATHER_DATA_RECEIVED = "EVENT/WEATHER_DATA_RECEIVED";


export const METRICS_DATA_RECEIVED = "EVENT/METRICS_DATA_RECEIVED";
export const NEW_MEASUREMENT_RECEIVED = "EVENT/NEW_MEASUREMENT_RECEIVED";
export const METRICS_SELECTED = "EVENT/METRICS_SELECTED";
export const MEASUREMENT_DATA_RECEIVED = "EVENT/MEASUREMENT_DATA_RECEIVED";
export const CHART_DATA_RECEIVED = "EVENT/CHART_DATA_RECEIVED";




export function updatedSelectedMetricsAction(selectedMetrics) {
    return {
      type: METRICS_SELECTED,
      selectedMetrics,
    };
  }