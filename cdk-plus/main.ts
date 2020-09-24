import * as kplus from 'cdk8s-plus';
import * as cdk8s from 'cdk8s';

// APP
const app = new cdk8s.App();

// CHART
const chart = new cdk8s.Chart(app, 'cdk8s-plus');

// Front
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

// expose front
front.expose({
  port: 9090,
  serviceType: kplus.ServiceType.LOAD_BALANCER
})

// Source
new kplus.Deployment(chart, 'SourceDeployment', {
  metadata: {
    name: 'source',
    labels: {
      app: 'source'
    }
  },
  spec: {
    podMetadataTemplate: {
      name: 'source',
      labels: {
        app: 'source'
      }
    },
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

// expose source by specify service.
const source_service = new kplus.Service(chart, 'SourceService', {
  metadata: {
    name: 'source',
    labels: {
      app: 'source'
    }
  },
  spec: {
    ports: [
      {
        port: 8080
      }
    ]
  }
})
source_service.spec.addSelector('app', 'source')

// Adder
new kplus.Deployment(chart, 'adder', {
  metadata: {
    name: 'adder',
    labels: {
      app: 'adder'
    }
  },
  spec: {
    podMetadataTemplate: {
      name: 'adder',
      labels: {
        app: 'adder'
      }
    },
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

const adder_service = new kplus.Service(chart, 'AdderService', {
  metadata: {
    name: 'adder',
    labels: {
      app: 'adder'
    },
  },
  spec: {
    ports: [
      {
        name: 'adder',
        port: 8080,
      }
    ]
  }
})
adder_service.spec.addSelector('app', 'adder')

// adder.expose({
//   port: 8080
// })

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