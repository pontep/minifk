import { Cdk8sPlusChart } from './main';
import { Testing } from "cdk8s";

describe('Test', () => {
    test('MatchSnapshot', () => {
        const app = Testing.app();
        const chart = new Cdk8sPlusChart(app, 'cdk8splus-chart');
        const results = Testing.synth(chart)
        expect(results).toMatchSnapshot();
    });
});
