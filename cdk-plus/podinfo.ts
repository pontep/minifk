import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// APP
const app = new cdk8s.App();

// CHART
const chart = new cdk8s.Chart(app, 'DinChart');
const podinfo = new kplus.Container({
    image: 'stefanprodan/podinfo',
    port: 9898,
    name: 'podinfo'
})

const podinfo_dep = new kplus.Deployment(chart, 'podinfo', {
    metadata: {
        name: 'podinfo',
        labels: {
            'app': 'podinfo'
        }
    },
    spec: {
        replicas: 3,
        podSpecTemplate: {
            containers: [
                podinfo
            ]
        }
    }
})

podinfo_dep.expose({
    port: 9898,
    serviceType: kplus.ServiceType.LOAD_BALANCER
})



// we are done, synth
app.synth();  