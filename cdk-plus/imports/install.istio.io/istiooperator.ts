// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * 
 *
 * @schema IstioOperator
 */
export class IstioOperator extends ApiObject {
  /**
   * Defines a "IstioOperator" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: IstioOperatorOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'IstioOperator',
      apiVersion: 'install.istio.io/v1alpha1',
    });
  }
}

/**
 * @schema IstioOperator
 */
export interface IstioOperatorOptions {
  /**
   * Specification of the desired state of the istio control plane resource. More info: https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   *
   * @schema IstioOperator#spec
   */
  readonly spec?: any;

}

