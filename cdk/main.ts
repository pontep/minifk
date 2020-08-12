import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { WebService } from './lib/web-service';
// import { Deployment, Service, IntOrString } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    // DinnyNote Front-end
    new WebService(this, 'frontend', { image: 'pontep/client', replicas: 2 });

    // DinnyNote Back-end
    new WebService(this, 'backend', { image: 'pontep/backend', port: 9000, containerPort: 9000});
    // const label = { app: 'backend' };

    // new Service(this, 'service', {
    //   spec: {
    //     type: 'LoadBalancer',
    //     ports: [ { port: 9000, targetPort: IntOrString.fromNumber(9000) } ],
    //     selector: label
    //   }
    // });

    // new Deployment(this, 'deployment', {
    //   spec: {
    //     replicas: 1,
    //     selector: {
    //       matchLabels: label
    //     },
    //     template: {
    //       metadata: { labels: label },
    //       spec: {
    //         containers: [
    //           {
    //             name: 'app',
    //             image: 'pontep/backend',
    //             ports: [ { containerPort: 9000 } ]
    //           }
    //         ]
    //       }
    //     }
    //   }
    // });
  }
}

const app = new App();
new MyChart(app, 'dinnynote');
app.synth();