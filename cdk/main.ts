import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';

// imported constructs
import { Deployment, Service, IntOrString } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const label = { app: 'hello-k8s' };

    new Service(this, 'service', {
      spec: {
        type: 'LoadBalancer',
        ports: [ { port: 80, targetPort: IntOrString.fromNumber(8080) } ],
        selector: label
      }
    });

    new Deployment(this, 'deployment', {
      spec: {
        replicas: 2,
        selector: {
          matchLabels: label
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'hello-kubernetes',
                image: 'paulbouwer/hello-kubernetes:1.7',
                ports: [ { containerPort: 8080 } ]
              }
            ]
          }
        }
      }
    });
  }
}

const app = new App();
new MyChart(app, 'hello');
app.synth();