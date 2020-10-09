import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import * as kplus from 'cdk8s-plus'

export interface BookInfoOptions {

    readonly app: string
    readonly deploymentName: string
    readonly version?: string
    readonly image: string
    readonly spec?: kplus.DeploymentSpec
    readonly moreVersion?: number
    readonly whatType?: string
}
export class BookInfo extends Chart {

    constructor(scope: Construct, id: string, options: BookInfoOptions) {
        super(scope, id);

        // Declare variables
        const version = options.version || 'v1'
        const serviceAccountName = "bookinfo-" + options.app
        const http = "http"
        var spec = options.spec || {
            replicas: 1,
            podMetadataTemplate: {
                labels: {
                    app: options.app,
                    version: version
                }
            },
            podSpecTemplate: {
                serviceAccount: {
                    name: serviceAccountName
                },
                containers: [
                    new kplus.Container({
                        name: options.app,
                        image: options.image,
                        port: 9080,
                    })
                ],
            }
        }

        // moreVersion represent reviews and productpage
        // if (options.moreVersion) {
        //     spec.podSpecTemplate.containers[0].addEnv(
        //         'LOG_DIR', kplus.EnvValue.fromValue('/tmp/logs')
        //     )
        // }


        // Service
        const service = new kplus.Service(this, 'service', {
            metadata: {
                name: options.app,
                labels: {
                    app: options.app,
                    service: options.app
                }
            },
            spec: {
                ports: [
                    {
                        port: 9080,
                        name: http,
                    }
                ],
            }
        })
        service.spec.addSelector('app', options.app)

        // ServiceAccount
        new kplus.ServiceAccount(this, 'service-account', {
            metadata: {
                name: serviceAccountName,
                labels: {
                    account: options.app
                }
            }
        })

        // Deployment (metadata: name)
        if (options.moreVersion) {
            //if reviews
            if (options.whatType === 'reviews') {
                var wlp_output = kplus.Volume.fromEmptyDir('wlp-output')
                var tmp = kplus.Volume.fromEmptyDir('tmp')
                // assign spec
                for (var i = 1; i <= options.moreVersion; i++) {
                    new kplus.Deployment(this, options.app + '-v' + i, {
                        metadata: {
                            name: options.app + '-v' + i,  //details-v1
                            labels: {
                                app: options.app,
                                version: 'v' + i.toString()
                            }
                        }, spec: {
                            replicas: 1,
                            podMetadataTemplate: {
                                labels: {
                                    app: options.app,
                                    version: 'v' + i.toString()
                                }
                            },
                            podSpecTemplate: {
                                serviceAccount: {
                                    name: serviceAccountName
                                },
                                containers: [
                                    new kplus.Container({
                                        name: options.app,
                                        image: 'docker.io/istio/examples-bookinfo-reviews-v' + i + ':1.15.1',
                                        port: 9080,
                                        env: {
                                            LOG_DIR: kplus.EnvValue.fromValue('/tmp/logs')
                                        },
                                        volumeMounts: [
                                            {
                                                path: '/tmp',
                                                volume: tmp
                                            },
                                            {
                                                path: '/opt/ibm/wlp/output',
                                                volume: wlp_output
                                            }
                                        ]
                                    })
                                ], volumes: [

                                ]
                            }
                        }

                    })
                }
                //if reviews
            } else if (options.whatType === 'productpage') {
                var wlp_output = kplus.Volume.fromEmptyDir('wlp-output')
                var tmp = kplus.Volume.fromEmptyDir('tmp')
                // assign spec
                for (var i = 1; i <= options.moreVersion; i++) {
                    new kplus.Deployment(this, options.app + '-v' + i, {
                        metadata: {
                            name: options.app + '-v' + i,  //details-v1
                            labels: {
                                app: options.app,
                                version: 'v' + i.toString()
                            }
                        }, spec: {
                            replicas: 1,
                            podMetadataTemplate: {
                                labels: {
                                    app: options.app,
                                    version: 'v' + i.toString()
                                }
                            },
                            podSpecTemplate: {
                                serviceAccount: {
                                    name: serviceAccountName
                                },
                                containers: [
                                    new kplus.Container({
                                        name: options.app,
                                        image: 'docker.io/istio/examples-bookinfo-productpage-v' + i + ':1.15.1',
                                        port: 9080,

                                        volumeMounts: [
                                            {
                                                path: '/tmp',
                                                volume: tmp
                                            },

                                        ]
                                    })
                                ], volumes: [

                                ]
                            }
                        }

                    })
                }
            }

        } else {
            new kplus.Deployment(this, options.deploymentName, {
                metadata: {
                    name: options.deploymentName,  //details-v1
                    labels: {
                        app: options.app,
                        version: version
                    }
                }, spec

            })
        }



    }
}
