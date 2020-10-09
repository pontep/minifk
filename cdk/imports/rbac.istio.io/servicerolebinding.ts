// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * 
 *
 * @schema ServiceRoleBinding
 */
export class ServiceRoleBinding extends ApiObject {
  /**
   * Defines a "ServiceRoleBinding" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: ServiceRoleBindingOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'ServiceRoleBinding',
      apiVersion: 'rbac.istio.io/v1alpha1',
    });
  }
}

/**
 * @schema ServiceRoleBinding
 */
export interface ServiceRoleBindingOptions {
  /**
   * Configuration for Role Based Access Control. See more details at: https://istio.io/docs/reference/config/security/istio.rbac.v1alpha1.html
   *
   * @schema ServiceRoleBinding#spec
   */
  readonly spec?: ServiceRoleBindingSpec;

}

/**
 * Configuration for Role Based Access Control. See more details at: https://istio.io/docs/reference/config/security/istio.rbac.v1alpha1.html
 *
 * @schema ServiceRoleBindingSpec
 */
export interface ServiceRoleBindingSpec {
  /**
   * @schema ServiceRoleBindingSpec#actions
   */
  readonly actions?: ServiceRoleBindingSpecActions[];

  /**
   * @schema ServiceRoleBindingSpec#mode
   */
  readonly mode?: ServiceRoleBindingSpecMode;

  /**
   * @schema ServiceRoleBindingSpec#role
   */
  readonly role?: string;

  /**
   * Reference to the ServiceRole object.
   *
   * @schema ServiceRoleBindingSpec#roleRef
   */
  readonly roleRef?: ServiceRoleBindingSpecRoleRef;

  /**
   * List of subjects that are assigned the ServiceRole object.
   *
   * @schema ServiceRoleBindingSpec#subjects
   */
  readonly subjects?: ServiceRoleBindingSpecSubjects[];

}

/**
 * @schema ServiceRoleBindingSpecActions
 */
export interface ServiceRoleBindingSpecActions {
  /**
   * Optional.
   *
   * @schema ServiceRoleBindingSpecActions#constraints
   */
  readonly constraints?: ServiceRoleBindingSpecActionsConstraints[];

  /**
   * @schema ServiceRoleBindingSpecActions#hosts
   */
  readonly hosts?: string[];

  /**
   * Optional.
   *
   * @schema ServiceRoleBindingSpecActions#methods
   */
  readonly methods?: string[];

  /**
   * @schema ServiceRoleBindingSpecActions#notHosts
   */
  readonly notHosts?: string[];

  /**
   * @schema ServiceRoleBindingSpecActions#notMethods
   */
  readonly notMethods?: string[];

  /**
   * @schema ServiceRoleBindingSpecActions#notPaths
   */
  readonly notPaths?: string[];

  /**
   * @schema ServiceRoleBindingSpecActions#notPorts
   */
  readonly notPorts?: number[];

  /**
   * Optional.
   *
   * @schema ServiceRoleBindingSpecActions#paths
   */
  readonly paths?: string[];

  /**
   * @schema ServiceRoleBindingSpecActions#ports
   */
  readonly ports?: number[];

  /**
   * A list of service names.
   *
   * @schema ServiceRoleBindingSpecActions#services
   */
  readonly services?: string[];

}

/**
 * @schema ServiceRoleBindingSpecMode
 */
export enum ServiceRoleBindingSpecMode {
  /** ENFORCED */
  ENFORCED = "ENFORCED",
  /** PERMISSIVE */
  PERMISSIVE = "PERMISSIVE",
}

/**
 * Reference to the ServiceRole object.
 *
 * @schema ServiceRoleBindingSpecRoleRef
 */
export interface ServiceRoleBindingSpecRoleRef {
  /**
   * The type of the role being referenced.
   *
   * @schema ServiceRoleBindingSpecRoleRef#kind
   */
  readonly kind?: string;

  /**
   * The name of the ServiceRole object being referenced.
   *
   * @schema ServiceRoleBindingSpecRoleRef#name
   */
  readonly name?: string;

}

/**
 * @schema ServiceRoleBindingSpecSubjects
 */
export interface ServiceRoleBindingSpecSubjects {
  /**
   * @schema ServiceRoleBindingSpecSubjects#group
   */
  readonly group?: string;

  /**
   * @schema ServiceRoleBindingSpecSubjects#groups
   */
  readonly groups?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#ips
   */
  readonly ips?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#names
   */
  readonly names?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#namespaces
   */
  readonly namespaces?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#notGroups
   */
  readonly notGroups?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#notIps
   */
  readonly notIps?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#notNames
   */
  readonly notNames?: string[];

  /**
   * @schema ServiceRoleBindingSpecSubjects#notNamespaces
   */
  readonly notNamespaces?: string[];

  /**
   * Optional.
   *
   * @schema ServiceRoleBindingSpecSubjects#properties
   */
  readonly properties?: { [key: string]: string };

  /**
   * Optional.
   *
   * @schema ServiceRoleBindingSpecSubjects#user
   */
  readonly user?: string;

}

/**
 * @schema ServiceRoleBindingSpecActionsConstraints
 */
export interface ServiceRoleBindingSpecActionsConstraints {
  /**
   * Key of the constraint.
   *
   * @schema ServiceRoleBindingSpecActionsConstraints#key
   */
  readonly key?: string;

  /**
   * List of valid values for the constraint.
   *
   * @schema ServiceRoleBindingSpecActionsConstraints#values
   */
  readonly values?: string[];

}

