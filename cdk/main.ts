import { Construct } from "constructs";
import { App, Chart } from "cdk8s";
import { Service, Deployment, Pod, Namespace, ConfigMap } from "./imports/k8s";

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    // Defining
    const app_name = "hello-k8s"

    // Namespace
    const namespace = "pontep"
    new Namespace(this, namespace, {
    })



    // ConfigMap
    new ConfigMap(this, "hello-configmap", {
      metadata: {
        name: "configmap-for-hellomanual-pod"
      },
      data: {
        "pontep_nickname": "Din",
        "backend_addr": "192.168.1.1:9000"
      }
    })

    // Pod
    const pod_image = "paulbouwer/hello-kubernetes:1.8";
    const pod_name = "hellomanual"

    new Pod(this, pod_name, {
      metadata: {
        labels: {
          app: app_name,
          creator: "paulbouwer",
          environment: "test",
          week: "4",
          reference: "chanwit",
        },
        name: pod_name,
      },
      spec: {
        containers: [
          {
            name: pod_name,
            image: pod_image,
            ports: [
              {
                containerPort: 8080,
              },
            ],
            env: [
              {
                name: "PONTEP_NICKNAME",
                valueFrom: {
                  configMapKeyRef: {
                    name: "configmap-for-hellomanual-pod",
                    key: "pontep_nickname"
                  }
                }
              },
              {
                name: "SERVER_ADDR",
                valueFrom: {
                  configMapKeyRef: {
                    name: "configmap-for-hellomanual-pod",
                    key: "backend_addr"
                  }
                }
              },

            ]
          },
        ],
      },
    });

    // Deployment
    const deploy_name = "hellodeployment"
    const deploy_pod_name = "hello-kubernetes"
    const deploy_image = "paulbouwer/hello-kubernetes:1.8";
    new Deployment(this, deploy_name, {
      metadata: {
        name: deploy_name
      },
      spec: {
        replicas: 2,
        selector: {
          matchLabels: {
            "app": app_name
          }
        },
        template: {
          metadata: {
            labels: {
              "app": app_name
            }
          },
          spec: {
            containers: [
              {
                name: deploy_pod_name,
                image: deploy_image,
                ports: [
                  {
                    containerPort: 8080
                  }
                ]
              }
            ]
          }
        }
      }
    })
    // Service
    const service_name = "helloservice"
    const service_type = "LoadBalancer"
    new Service(this, service_name, {
      metadata: {
        name: service_name
      },
      spec: {
        type: service_type,
        ports: [
          {
            port: 80,
            targetPort: 8080
          }
        ],
        selector: {
          "app": app_name
        }
      }
    })


  }
}

const app = new App();
new MyChart(app, "dinnynote");
app.synth();
