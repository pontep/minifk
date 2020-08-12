import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { WebService } from './lib/web-service';
import { MicroService } from './lib/micro-service';
// import { Deployment, Service, IntOrString } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    // DinnyNote Front-end
    new WebService(this, 'frontend', { image: 'pontep/client', replicas: 2, loadBalancerIP: '172.17.0.208' });

    // DinnyNote Back-end
    new MicroService(this, 'backend', { image: 'pontep/backend', port: 9000, containerPort: 9000, loadBalancerIP: '172.17.0.209'});
  }
}

const app = new App();
new MyChart(app, 'dinnynote');
app.synth();