import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// APP
const app = new cdk8s.App();

// CHART
const chart = new cdk8s.Chart(app, 'scfinal');

const front = new kplus.Deployment(chart, 'front', {
  metadata: {
    name: 'front',
    labels: {
      app: 'front'
    }
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
  port: 9090,
  serviceType: kplus.ServiceType.LOAD_BALANCER
})

const source = new kplus.Deployment(chart, 'source', {
  metadata: {
    name: 'source',
    labels: {
      app: 'source'
    }
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

source.expose({
  port: 8080
})

const adder = new kplus.Deployment(chart, 'adder', {
  metadata: {
    name: 'adder',
    labels: {
      app: 'adder'
    }
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

adder.expose({
  port: 8080
})

const suber = new kplus.Deployment(chart, 'suber', {
  metadata: {
    name: 'suber',
    labels: {
      app: 'suber'
    }
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

suber.expose({ port: 8080 })

// we are done, synth
app.synth();  