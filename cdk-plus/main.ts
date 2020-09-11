import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// APP
const app = new cdk8s.App();

// CHART
const chart = new cdk8s.Chart(app, 'DinChart');

// POD
new kplus.Pod(chart, 'HelloPod', {
  metadata: {
    name: 'hellosolo'
  },
  spec: {
    containers: [new kplus.Container({
      image: 'paulbouwer/hello-kubernetes:1.8'
    })]
  }
})

// SERVICE
new kplus.Service(chart, 'HelloService', {
  metadata: {
    name: 'helloservice'
  }, spec: {
    type: kplus.ServiceType.LOAD_BALANCER,
    ports: [
      {
        port: 80,
        targetPort: 8080,
      }
    ]
  }
})

// CONTAINER
const port = 80;
const container = new kplus.Container({
  image: 'paulbouwer/hello-kubernetes:1.8',
  // workingDir: '/client',
  // command: ["yarn", "serve"],
  port: port,
})

// DEPLOYMENT
const deployment = new kplus.Deployment(chart, 'HelloDeployment', {
  spec: {
    replicas: 2,
    podSpecTemplate: {
      containers: [container]
    }
  },
});

// EXPOSE
deployment.expose({ port: 80, serviceType: kplus.ServiceType.LOAD_BALANCER })

// we are done, synth
app.synth();  