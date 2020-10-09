// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * 
 *
 * @schema ClusterRbacConfig
 */
export class ClusterRbacConfig extends ApiObject {
  /**
   * Defines a "ClusterRbacConfig" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: ClusterRbacConfigOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'ClusterRbacConfig',
      apiVersion: 'rbac.istio.io/v1alpha1',
    });
  }
}

/**
 * @schema ClusterRbacConfig
 */
export interface ClusterRbacConfigOptions {
  /**
   * Configuration for Role Based Access Control. See more details at: https://istio.io/docs/reference/config/security/istio.rbac.v1alpha1.html
   *
   * @schema ClusterRbacConfig#spec
   */
  readonly spec?: ClusterRbacConfigSpec;

}

/**
 * Configuration for Role Based Access Control. See more details at: https://istio.io/docs/reference/config/security/istio.rbac.v1alpha1.html
 *
 * @schema ClusterRbacConfigSpec
 */
export interface ClusterRbacConfigSpec {
  /**
   * @schema ClusterRbacConfigSpec#enforcementMode
   */
  readonly enforcementMode?: ClusterRbacConfigSpecEnforcementMode;

  /**
   * A list of services or namespaces that should not be enforced by Istio RBAC policies.
   *
   * @schema ClusterRbacConfigSpec#exclusion
   */
  readonly exclusion?: ClusterRbacConfigSpecExclusion;

  /**
   * A list of services or namespaces that should be enforced by Istio RBAC policies.
   *
   * @schema ClusterRbacConfigSpec#inclusion
   */
  readonly inclusion?: ClusterRbacConfigSpecInclusion;

  /**
   * Istio RBAC mode.
   *
   * @schema ClusterRbacConfigSpec#mode
   */
  readonly mode?: ClusterRbacConfigSpecMode;

}

/**
 * @schema ClusterRbacConfigSpecEnforcementMode
 */
export enum ClusterRbacConfigSpecEnforcementMode {
  /** ENFORCED */
  ENFORCED = "ENFORCED",
  /** PERMISSIVE */
  PERMISSIVE = "PERMISSIVE",
}

/**
 * A list of services or namespaces that should not be enforced by Istio RBAC policies.
 *
 * @schema ClusterRbacConfigSpecExclusion
 */
export interface ClusterRbacConfigSpecExclusion {
  /**
   * A list of namespaces.
   *
   * @schema ClusterRbacConfigSpecExclusion#namespaces
   */
  readonly namespaces?: string[];

  /**
   * A list of services.
   *
   * @schema ClusterRbacConfigSpecExclusion#services
   */
  readonly services?: string[];

}

/**
 * A list of services or namespaces that should be enforced by Istio RBAC policies.
 *
 * @schema ClusterRbacConfigSpecInclusion
 */
export interface ClusterRbacConfigSpecInclusion {
  /**
   * A list of namespaces.
   *
   * @schema ClusterRbacConfigSpecInclusion#namespaces
   */
  readonly namespaces?: string[];

  /**
   * A list of services.
   *
   * @schema ClusterRbacConfigSpecInclusion#services
   */
  readonly services?: string[];

}

/**
 * Istio RBAC mode.
 *
 * @schema ClusterRbacConfigSpecMode
 */
export enum ClusterRbacConfigSpecMode {
  /** OFF */
  OFF = "OFF",
  /** ON */
  ON = "ON",
  /** ON_WITH_INCLUSION */
  ON_WITH_INCLUSION = "ON_WITH_INCLUSION",
  /** ON_WITH_EXCLUSION */
  ON_WITH_EXCLUSION = "ON_WITH_EXCLUSION",
}
