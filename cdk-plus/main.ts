import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

const app = new cdk8s.App();
const chart = new cdk8s.Chart(app, 'Chart');

new kplus.Deployment(chart, 'Deployment', {
  spec: {
    replicas: 3,
    podSpecTemplate: {
      containers: [new kplus.Container({
        image: 'ubuntu',
      })],
    },
  },
});