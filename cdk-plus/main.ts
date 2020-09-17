import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// APP
const app = new cdk8s.App();

// CHART
const chart = new cdk8s.Chart(app, 'scfinal');

const front = new kplus.Deployment(chart, 'front', {
  metadata: {
    name: 'front-deployment'
  },
  spec: {
    podSpecTemplate: {
      containers: [
        new kplus.Container({
          image: 'chanwit/front',
          port: 8080,
          name: 'front'
        })
      ]
    }
  }
})

front.expose({
  port: 6060,
  serviceType: kplus.ServiceType.LOAD_BALANCER
})

new kplus.Deployment(chart, 'source', {
  metadata: {
    name: 'source-deployment'
  },
  spec: {
    podSpecTemplate: {
      containers: [
        new kplus.Container({
          image: 'chanwit/source',
          port: 8080,
          name: 'source'
        })
      ]
    }
  }
})

new kplus.Deployment(chart, 'adder', {
  metadata: {
    name: 'adder-deployment'
  },
  spec: {
    podSpecTemplate: {
      containers: [
        new kplus.Container({
          image: 'chanwit/adder',
          port: 8080,
          name: 'adder'
        })
      ]
    }
  }
})

new kplus.Deployment(chart, 'suber', {
  metadata: {
    name: 'suber-deployment'
  },
  spec: {
    podSpecTemplate: {
      containers: [
        new kplus.Container({
          image: 'chanwit/suber',
          port: 8080,
          name: 'suber'
        })
      ]
    }
  }
})


// we are done, synth
app.synth();  