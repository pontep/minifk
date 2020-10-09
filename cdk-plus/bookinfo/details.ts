import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import * as kplus from 'cdk8s-plus'

export class DetailsService extends Chart {
	constructor(scope: Construct, id: string) {
		super(scope, id);

		// Details Service
		var details_service = new kplus.Service(this, 'details-service', {
			metadata: {
				name: 'details',
				labels: {
					app: 'details',
					service: 'details'
				}
			},
			spec: {
				ports: [
					{
						port: 9080,
						name: 'http'
					}
				],
			}
		})
		details_service.spec.addSelector('app', 'details')
		// ------------------------------------------------------------------------
		// 
		var details_deployment = new kplus.Deployment(this, 'details-v1', {
			metadata: {
				name: 'details-v1',
				labels: {
					app: 'details',
					version: 'v1'
				}
			},
			spec: {
				replicas: 1,
				podMetadataTemplate: {
					labels: {
						app: 'details',
						version: 'v1'
					}
				},
				podSpecTemplate: {
					serviceAccount: {
						name: 'bookinfo-details'
					},
					containers: [
						new kplus.Container({
							name: 'details',
							image: 'docker.io/istio/examples-bookinfo-details-v1:1.15.1',
							port: 9080
						})
					]
				}

			}
		})
		details_deployment.spec.selectByLabel('app', 'details')
		details_deployment.spec.selectByLabel('version', 'v1')
	}
}

// const app = new App();
// new BookInfo(app, 'bookinfo');
// app.synth();