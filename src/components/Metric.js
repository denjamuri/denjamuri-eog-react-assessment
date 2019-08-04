import React from "react";
import { useSelector } from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const getMetric = state => {
  return state.metrics;
};
export default ({metric}) => {
  const metrics = useSelector(getMetric);
  //console.log(metrics, metric);
  const metricValues = metrics[metric]
  return (
    <Card style={{maxWidth: "275px", float: "left", justifyContent: "space-around",  display: 'flex', flexWrap: 'wrap',}}>
      <CardContent>
      <Typography variant="h5" component="h2">
      {metric}
      </Typography>
      <Typography variant="h5" component="h2">
      {metricValues.at}
      </Typography>
      <Typography variant="h5" component="h2">
      {metricValues.value}
      </Typography>
      </CardContent>

    </Card>

  );
};