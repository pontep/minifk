import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { WebService } from './lib/web-service';

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    new WebService(this, 'hello', { image: 'paulbouwer/hello-kubernetes:1.7', replicas: 2 });
    new WebService(this, 'ghost', { image: 'ghost', containerPort: 2368 });
  }
}