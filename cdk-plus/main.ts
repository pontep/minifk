import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
// import * as kplus from 'cdk8s-plus'
// import { Deployment } from 'cdk8s-plus';
import { BookInfoGateWay } from './bookinfo/bookinfo-gateway';
import { CustomDestinationRule } from './bookinfo/custom-destination-rule';
import { BookInfo, BookInfoType } from './bookinfo/bookinfo'

export class Cdk8sPlusChart extends Chart {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // demo 1
        // new Deployment(this, 'demo', {
        //     spec: {
        //         podSpecTemplate: {
        //             containers: [
        //                 new kplus.Container({
        //                     image: 'paulbouwer/hello-kubernetes:1.8'
        //                 })
        //             ]
        //         }
        //     }
        // })

        // demo 2
        new CustomDestinationRule(this, 'destination-rule', {})
        new BookInfoGateWay(this, 'bookinfo-gateway')

        // ส่งเลขเวอร์ชั่นให้ command -> รอบนี้จะ gen version 2,3, ..
        new BookInfo(this, 'details', {
            type: BookInfoType.DETAILS
        })
        new BookInfo(this, 'ratings', {
            type: BookInfoType.RATINGS
        })
        new BookInfo(this, 'reviews', {
            type: BookInfoType.REVIEWS
        })
        new BookInfo(this, 'reviews-v2', {
            type: BookInfoType.REVIEWS,
            version: "2"
        })
        new BookInfo(this, 'reviews-v3', {
            type: BookInfoType.REVIEWS,
            version: "3"
        })
        new BookInfo(this, 'productpage', {
            type: BookInfoType.PRODUCT_PAGE
        })

    }
}


export const app = new App();
new Cdk8sPlusChart(app, 'cdk8splus-chart');
app.synth();