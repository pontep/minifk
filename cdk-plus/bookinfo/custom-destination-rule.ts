import { Construct } from 'constructs';
import { DestinationRule, DestinationRuleSpecTrafficPolicyTlsMode } from '../imports/networking.istio.io/destinationrule'

export interface CustomOptions {

    readonly tls?: boolean;

}

export class CustomDestinationRule extends Construct {
    constructor(scope: Construct, id: string, options: CustomOptions) {
        super(scope, id);
        var trafficPolicy
        if (options.tls) {
            trafficPolicy = {
                tls: {
                    mode: DestinationRuleSpecTrafficPolicyTlsMode.ISTIO_MUTUAL
                }
            }
        } else {
            trafficPolicy = undefined
        }
        // Product page
        new DestinationRule(this, 'productpage', {
            spec: {
                host: 'productpage',
                subsets: [
                    {
                        name: 'v1',
                        labels: {
                            version: 'v1'
                        }
                    }
                ],
                trafficPolicy
            }
        })

        // Reviews
        new DestinationRule(this, 'reviews', {
            spec: {
                host: 'reviews',
                subsets: [
                    {
                        name: 'v1',
                        labels: {
                            version: 'v1'
                        }
                    },
                    {
                        name: 'v2',
                        labels: {
                            version: 'v2'
                        }
                    },
                    {
                        name: 'v3',
                        labels: {
                            version: 'v3'
                        }
                    }
                ],
                trafficPolicy
            }
        })

        // Ratings
        new DestinationRule(this, 'ratings', {
            spec: {
                host: 'ratings',
                subsets: [
                    {
                        name: 'v1',
                        labels: {
                            version: 'v1'
                        }
                    },
                    {
                        name: 'v2',
                        labels: {
                            version: 'v2'
                        }
                    },
                    {
                        name: 'v2-mysql',
                        labels: {
                            version: 'v2-mysql'
                        }
                    }, {
                        name: 'v2-mysql-vm',
                        labels: {
                            version: 'v2-mysql-vm'
                        }
                    },

                ],
                trafficPolicy
            }
        })

        // Details
        new DestinationRule(this, 'details', {
            spec: {
                host: 'details',
                subsets: [
                    {
                        name: 'v1',
                        labels: {
                            version: 'v1'
                        }
                    }, {
                        name: 'v2',
                        labels: {
                            version: 'v2'
                        }
                    },
                ],
                trafficPolicy
            }
        })
    }
}

// const app = new App();
// new BookInfoGateWay(app, 'bookinfo');
// app.synth();