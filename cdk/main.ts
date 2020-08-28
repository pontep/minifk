import { Construct } from "constructs";
import { App, Chart } from "cdk8s";
// import { WebService } from "./lib/web-service";
// import { MicroService } from "./lib/micro-service";
import { Service, Deployment } from "./imports/k8s";
// import { Deployment, Service, IntOrString } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    // Defining
    const app_name = "hello-k8s"

    // Pod
    // const pod_image = "paulbouwer/hello-kubernetes:1.8";
    // const pod_label = "hello";

    // new Pod(this, pod_label, {
    //   metadata: {
    //     labels: {
    //       app: pod_label,
    //       creator: "paulbouwer",
    //       environment: "test",
    //       week: "4",
    //       reference: "chanwit",
    //     },
    //     name: pod_label,
    //   },
    //   spec: {
    //     containers: [
    //       {
    //         name: pod_label,
    //         image: pod_image,
    //         ports: [
    //           {
    //             containerPort: 80,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // });

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
