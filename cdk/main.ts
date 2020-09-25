import * as cdk8s from 'cdk8s';
import * as k8s from "./imports/k8s";

// our cdk app
const app = new cdk8s.App();

// our kuberentes chart
const chart = new cdk8s.Chart(app, 'cdk8s');

const labels = { app: 'guestbook', tier: 'frontend' };

new k8s.Deployment(chart, 'deployment', {
  spec: {
    selector: { matchLabels: labels },
    replicas: 3,
    template: {
      metadata: { labels },
      spec: {
        containers: [
          {
            name: 'hello-kubernetes:1.8',
            image: 'paulbouwer/hello-kubernetes:1.8',
            ports: [{ containerPort: 8080 }]
          }
        ]
      }
    }
  }
});

new k8s.Service(chart, 'service', {
  metadata: { labels },
  spec: {
    type: 'LoadBalancer',
    ports: [{ port: 80 }],
    selector: labels,
  }
});

// we are done, synth
app.synth();