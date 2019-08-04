import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux"
// import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import MetricSelection from "./MetricSelection";
import * as actions from "../store/actions";
import Subscription from "./Subscription";
import Metric from "./Metric";
import Chart from "./Chart";
import Grid from '@material-ui/core/Grid';

class Dashboard extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
		}
    }
    
    updateSelectedMetrics = (metrics) => {
       // console.log("metrics", metrics);
        this.props.updatedSelectedMetricsAction(metrics ? metrics.map(m => m.value) : []);
    }
	
    render() {
        const {selectedMetrics = []} = this.props;
        return (<Container maxWidth="lg">
            <Subscription/>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    {selectedMetrics && selectedMetrics.map(metric => <Metric key={metric} metric={metric}/>)}
                </Grid>
                <Grid item xs={6}>
                    <MetricSelection selectedMetrics= {selectedMetrics} onChange={this.updateSelectedMetrics}/>
                    
                </Grid>
            </Grid>
            <Chart metrics={selectedMetrics}/>
          </Container>);
	}
}
const mapStateToProps = (state) => {
    //console.log(state.metrics);
	return {
        selectedMetrics: state.metrics.selectedMetrics
	}
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({updatedSelectedMetricsAction: actions.updatedSelectedMetricsAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)