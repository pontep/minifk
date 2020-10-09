import { Construct } from 'constructs';
import { Chart } from 'cdk8s';
import { Gateway } from '../imports/networking.istio.io/gateway'
import { VirtualService } from '../imports/networking.istio.io/virtualservice'

export class BookInfoGateWay extends Chart {
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

		new VirtualService(this, 'bookinfo', {
			spec: {
				hosts: [
					'*'
				],
				gateways: [
					'bookinfo-gateway'
				],
				http: [
					{
						match: [
							{
								uri: {
									exact: '/productpage'
								}
							},
							{
								uri: {
									prefix: '/static'
								}
							},
							{
								uri: {
									exact: '/login'
								}
							},
							{
								uri: {
									exact: '/logout'
								}
							},
							{
								uri: {
									prefix: '/api/v1/products'
								}
							},


						],
						route: [
							{
								destination: {
									host: 'productpage',
									port: {
										number: 9080
									}
								}
							}
						]
					}
				]
			}
		})
	}
}
