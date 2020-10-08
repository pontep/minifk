import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';

import { IstioOperator } from './imports/install.istio.io/istiooperator'
import { Policy } from './imports/authentication.istio.io/policy'
// import { Rule } from './imports/config.istio.io/rule'
import { Gateway, GatewaySpecServersTlsMode } from './imports/networking.istio.io/gateway'
// import { ServiceRole } from './imports/rbac.istio.io/servicerole'
// import { AuthorizationPolicy } from './imports/security.istio.io/authorizationpolicy'
export class HelloKube extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new IstioOperator(this, 'istiooperator', {
            spec: {
                profile: 'demo'
            }
        })
        // Gateway example: https://istio.io/v1.5/docs/concepts/traffic-management/#gateways
        new Gateway(this, 'istio-gateway', {
            spec: {
                selector: {
                    app: 'my-gateway-controller'
                },
                servers: [
                    {
                        port: {
                            number: 443,
                            name: 'https',
                            protocol: 'HTTPS'
                        },
                        hosts: [
                            'ext-host.example.com'
                        ],
                        tls: {
                            mode: GatewaySpecServersTlsMode.SIMPLE,
                            serverCertificate: '/tmp/tls.crt',
                            privateKey: '/tmp/tls.key'
                        }
                    }
                ]
            }
        })

        new Policy(this, 'istio-policy', {
            spec: {

            }
        })



    }
}

const app = new App();
new HelloKube(app, 'hello-k8s');
app.synth();