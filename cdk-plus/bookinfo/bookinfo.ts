import { Construct } from 'constructs';
import * as kplus from 'cdk8s-plus'
export interface BookInfoOptions {
    /**
    * String of Version to generate.
    * Just enter the number in string type.
    * Example if you enter '1' it will generate 'v1'
    */
    readonly version?: string
    /**
    * Type of bookinfo app.
    * Example BookInfoType.DETAILS = 'details'
    */
    readonly type: BookInfoType
}
export declare enum BookInfoType {
    DETAILS = 'details',
    RATINGS = 'ratings',
    REVIEWS = 'reviews',
    PRODUCT_PAGE = 'productpage'
}
export class BookInfo extends Construct {

    constructor(scope: Construct, id: string, options: BookInfoOptions) {
        super(scope, id);

        // Declare const variables
        const bookinfo = 'bookinfo'
        const http = "http"
        // Declare definability variable
        const version = 'v' + options.version || 'v1'
        const serviceAccountName = bookinfo + "-" + options.type //details
        const image = 'docker.io/istio/examples-bookinfo-' + options.type + '-' + options.version + ':1.15.1'
        // Creating Service
        const service = new kplus.Service(this, 'service', {
            metadata: {
                name: options.type,
                labels: {
                    app: options.type,
                    service: options.type
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
        service.spec.addSelector('app', options.type)

        // Creating ServiceAccount
        new kplus.ServiceAccount(this, 'service-account', {
            metadata: {
                name: serviceAccountName,
                labels: {
                    account: options.type
                }
            }
        })

        // Creating Deployment
        const deployment_name = options.type + '-' + version //details-v1
        // ส่งเลขเวอร์ชั่นให้ command -> รอบนี้จะ gen version 2,3, ..

        if (options.type === BookInfoType.REVIEWS) {

            // Creating volume for reviews deployment
            var wlp_output = kplus.Volume.fromEmptyDir('wlp-output')
            var tmp = kplus.Volume.fromEmptyDir('tmp')


            new kplus.Deployment(this, deployment_name, {
                metadata: {
                    name: deployment_name,
                    labels: {
                        app: options.type,
                        version: version
                    }
                }, spec: {
                    replicas: 1,
                    podMetadataTemplate: {
                        labels: {
                            app: options.type,
                            version: version
                        }
                    },
                    podSpecTemplate: {
                        serviceAccount: {
                            name: serviceAccountName
                        },
                        containers: [
                            new kplus.Container({
                                name: options.type,
                                image: image,
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


        } else if (options.type === BookInfoType.PRODUCT_PAGE) {
            var wlp_output = kplus.Volume.fromEmptyDir('wlp-output')
            var tmp = kplus.Volume.fromEmptyDir('tmp')

            new kplus.Deployment(this, deployment_name, {
                metadata: {
                    name: deployment_name,
                    labels: {
                        app: options.type,
                        version: version
                    }
                }, spec: {
                    replicas: 1,
                    podMetadataTemplate: {
                        labels: {
                            app: options.type,
                            version: version
                        }
                    },
                    podSpecTemplate: {
                        serviceAccount: {
                            name: serviceAccountName
                        },
                        containers: [
                            new kplus.Container({
                                name: options.type,
                                image: image,
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

        } else {
            new kplus.Deployment(this, deployment_name, {
                metadata: {
                    name: deployment_name,  //details-v1
                    labels: {
                        app: options.type,
                        version: version
                    }
                }, spec: {
                    replicas: 1,
                    podMetadataTemplate: {
                        labels: {
                            app: options.type,
                            version: version
                        }
                    },
                    podSpecTemplate: {
                        serviceAccount: {
                            name: serviceAccountName
                        },
                        containers: [
                            new kplus.Container({
                                name: options.type,
                                image: image,
                                port: 9080,
                            })
                        ],
                    }
                }

            })
        }





    }
}
