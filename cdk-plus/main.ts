import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// our cdk app
const app = new cdk8s.App();

// our kuberentes chart
const chart = new cdk8s.Chart(app, 'DinChart');

// now we create a container that runs our app
const port = 8080;
const container = new kplus.Container({
  image: 'pontep/client',
  port: port,
})

// now lets create a deployment to run a few instances of this container
const deployment = new kplus.Deployment(chart, 'Deployment', {
  spec: {
    replicas: 3,
    podSpecTemplate: {
      containers: [container]
    }
  },
});

// finally, we expose the deployment as a load balancer service and make it run
deployment.expose({ port: 8080, serviceType: kplus.ServiceType.LOAD_BALANCER })

// we are done, synth
app.synth();  