import { Construct } from "constructs";
import { App, Chart } from "cdk8s";
// import { WebService } from "./lib/web-service";
// import { MicroService } from "./lib/micro-service";
import { Pod } from "./imports/k8s";
// import { Deployment, Service, IntOrString } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, ns: string) {
    super(scope, ns);

    // Define
    const namespace = "b6000783";
    // Pod
    const pod_image = "paulbouwer/hello-kubernetes:1.8";
    const pod_label = "hello";

    new Pod(this, pod_label, {
      metadata: {
        labels: {
          app: pod_label,
          creator: "paulbouwer",
          environment: "test",
          week: "4",
          reference: "chanwit",
        },
        namespace: namespace,
        name: pod_label,
      },
      spec: {
        containers: [
          {
            name: pod_label,
            image: pod_image,
            ports: [
              {
                containerPort: 80,
              },
            ],
          },
        ],
      },
    });
  }
}

const app = new App();
new MyChart(app, "dinnynote");
app.synth();
