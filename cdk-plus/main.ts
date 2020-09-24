import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// APP
const app = new cdk8s.App();

// CHART
const chart = new cdk8s.Chart(app, 'cdk8splus');

// we are done, synth
app.synth();  