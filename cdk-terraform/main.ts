import { App, TerraformStack } from 'cdktf';
import { KubernetesProvider, Deployment, Service } from './.gen/providers/kubernetes';

const app = new App();
const stack = new TerraformStack(app, 'cdk-terraform');

new KubernetesProvider(stack, 'kind', {});

const labels = { cdk: 'terrform-cdk' };

new Deployment(stack, 'deployment', {
  metadata: [{
    labels: labels,
    name: 'cdk-terraform-deployment' // metadata.name: Required value: name or generateName is required
  }],
  spec: [{
    replicas: 3,
    selector: [{
      matchLabels: labels
    }],
    template: [{
      metadata: [{
        labels: labels
      }],
      spec: [{
        container: [{
          image: 'paulbouwer/hello-kubernetes:1.8',
          name: 'hello-kubernetes',
          port: [{
            containerPort: 8080
          }],
        }]
      }]
    }]
  }]
})

new Service(stack, 'service', {
  metadata: [{
    labels,
    name: 'cdk-terraform-service' // metadata.name: Required value: name or generateName is required
  }],
  spec: [{
    selector: labels,
    port: [{
      port: 80,
      targetPort: '8080'
    }],
    type: 'LoadBalancer'
  }]
})

app.synth();