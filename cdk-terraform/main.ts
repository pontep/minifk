import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { KubernetesProvider, Namespace, Deployment, Service, Pod } from './.gen/providers/kubernetes';

class KubeStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new KubernetesProvider(this, 'kind', {});

    const exampleNamespace = new Namespace(this, 'tf-cdk-example', {
      metadata: [{
        name: 'tf-cdk-example'
      }]
    })

    const app = 'nginx-example'
    new Deployment(this, 'nginx-deployment', {
      metadata: [{
        name: app,
        namespace: exampleNamespace.metadata[0].name,
        labels: {
          app
        }
      }],
      spec: [{
        replicas: 2,
        selector: [{
          matchLabels: {
            app
          }
        }],
        template: [{
          metadata: [{
            labels: {
              app
            }
          }],
          spec: [{
            container: [{
              image: 'nginx:1.7.8',
              name: 'example',
              port: [{
                containerPort: 80
              }],
              resources: [{
                limits: [{
                  cpu: '0.5',
                  memory: '512Mi'
                }],
                requests: [{
                  cpu: '250m',
                  memory: '50Mi'
                }]
              }]
            }]
          }]
        }]
      }]
    })

    new Service(this, 'nginx-service', {
      metadata: [{
        name: app
      }],
      spec: [{
        selector: {
          app
        },
        port: [{
          nodePort: 30201,
          port: 80,
          targetPort: '80'
        }],
        type: 'NodePort'
      }]
    })

    new Pod(this, 'hello-pod', {
      metadata: [
        {
          name: 'hello',
          labels: {
            app: 'hello'
          }
        }
      ],
      spec: [
        {
          container: [
            {
              name: 'hello',
              image: 'paulbouwer/hello-kubernetes:1.8',
              port: [
                {
                  name: 'hello',
                  containerPort: 8080
                }
              ]
            }
          ]
        }]
    })

    new Service(this, 'hello-service', {
      metadata: [
        {
          name: 'hello',
          labels: {
            app: 'hello'
          }
        }
      ],
      spec: [
        {
          selector: {
            app: 'hello'
          },
          port: [
            {
              name: 'hello',
              port: 80,
              targetPort: '8080',
            }
          ],
          type: 'LoadBalancer'
        }
      ]
    })

  }
}

const app = new App();
new KubeStack(app, 'tf-cdk-example');
app.synth();