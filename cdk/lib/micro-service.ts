import { Construct, Node } from 'constructs';
import { Deployment, Service, IntOrString } from '../imports/k8s';

export interface MicroServiceOptions {
  /**
   * The Docker image to use for this service.
   */
  readonly image: string;

  /**
   * Number of replicas.
   *
   * @default 1
   */
  readonly replicas?: number;

  /**
   * External port.
   *
   * @default 80
   */
  readonly port?: number;

  /**
   * Internal port.
   *
   * @default 8080
   */
  readonly containerPort?: number;
  readonly loadBalancerIP?: string;
}

export class MicroService extends Construct {
  constructor(scope: Construct, ns: string, options: MicroServiceOptions) {
    super(scope, ns);

    const port = options.port || 80;
    const containerPort = options.containerPort || 8080;
    const label = { app: Node.of(this).uniqueId };
    const replicas = options.replicas ?? 1;
    const loadBalancerIP = options.loadBalancerIP || '';
    new Service(this, 'service', {
      spec: {
        type: 'LoadBalancer',
        ports: [ { port, targetPort: IntOrString.fromNumber(containerPort) } ],
        selector: label,
        loadBalancerIP: loadBalancerIP
      }
    });

    new Deployment(this, 'deployment', {
      spec: {
        replicas,
        selector: {
          matchLabels: label
        },
        template: {
          metadata: { labels: label },
          spec: {
            containers: [
              {
                name: 'app',
                image: options.image,
                ports: [ { containerPort } ]
              }
            ]
          }
        }
      }
    });
  }
}