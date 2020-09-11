import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';
import * as path from 'path';

// our cdk app
const app = new cdk8s.App();

// our kuberentes chart
const chart = new cdk8s.Chart(app, 'DinChart');

// lets create a volume that contains our app.
// we use a trick with a config map!
const appData = new kplus.ConfigMap(chart, 'AppData');
appData.addDirectory(path.join(__dirname, 'app'));

const appVolume = kplus.Volume.fromConfigMap(appData);

// now we create a container that runs our app
const appPath = '/var/lib/app';
const port = 80;
const container = new kplus.Container({
    image: 'node:14.4.0-alpine3.12',
    command: ['node', 'index.js', `${port}`],
    port: port,
})

// make the app accessible to the container
container.mount(appPath, appVolume);

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