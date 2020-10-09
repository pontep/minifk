import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';

// import { DestinationRuleAll } from './bookinfo/destination-rule';
// import { DetailsService } from './bookinfo/details'
export class Cdk8sChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // new DestinationRuleAll(this, 'destination-rule-all')
    // new DetailsService(this, 'details-service')
  }
}


const app = new App();
new Cdk8sChart(app, 'cdk8s-chart');
app.synth();