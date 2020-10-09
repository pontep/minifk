import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';
import { Gateway } from '../imports/networking.istio.io/gateway'

export class BookinfoGateway extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new Gateway(this, 'bookinfo-gateway', {
            spec: {
                selector: {
                    istio: 'ingressgateway'
                },
                servers: [
                    {
                        port: {
                            number: 80,
                            name: 'http',
                            protocol: 'HTTP'
                        },
                        hosts: [
                            '*'
                        ]
                    }
                ]
            }
        })


    }
}
