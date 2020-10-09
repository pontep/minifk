import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { BookInfoGateWay } from './bookinfo/bookinfo-gateway';
import { CustomDestinationRule } from './bookinfo/custom-destination-rule';
import { BookInfo } from './bookinfo/bookinfo'
// import { DetailsService } from './bookinfo/details'
export class Cdk8sPlusChart extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new CustomDestinationRule(this, 'destination-rule', {})
        new BookInfoGateWay(this, 'bookinfo-gateway')
        new BookInfo(this, 'details', {
            app: 'details',
            deploymentName: 'details-v1',
            image: 'docker.io/istio/examples-bookinfo-details-v1:1.15.1'
        })
        new BookInfo(this, 'ratings', {
            app: 'ratings',
            deploymentName: 'ratings-v1',
            image: 'docker.io/istio/examples-bookinfo-ratings-v1:1.15.1'
        })
        new BookInfo(this, 'reviews', {
            app: 'reviews',
            image: '',
            deploymentName: 'reviews-v1',
            moreVersion: 3,
            whatType: 'reviews'
        })
        new BookInfo(this, 'productpage', {
            app: 'productpage',
            image: '',
            deploymentName: 'productpage-v1',
            moreVersion: 1,
            whatType: 'productpage'
        })

    }
}


const app = new App();
new Cdk8sPlusChart(app, 'cdk8splus-chart');
app.synth();