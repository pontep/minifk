import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// our cdk app
const app = new cdk8s.App();

// our kuberentes chart
const chart = new cdk8s.Chart(app, 'cdk8s-plus');

const deployment = new kplus.Deployment(chart, 'deployment', {
  spec: {
    replicas: 3,
    podSpecTemplate: {
      containers: [
        new kplus.Container({
          name: 'hello-kubernetes',
          image: 'paulbouwer/hello-kubernetes:1.8',
          port: 8080,
        })
      ]
    }
  }
});

deployment.expose({
  port: 80,
  serviceType: kplus.ServiceType.LOAD_BALANCER
})

// we are done, synth
app.synth();