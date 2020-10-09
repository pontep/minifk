// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * UDPRoute is the Schema for the UDPRoute resource.
 *
 * @schema UDPRoute
 */
export class UdpRoute extends ApiObject {
  /**
   * Defines a "UDPRoute" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: UdpRouteOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'UDPRoute',
      apiVersion: 'networking.x-k8s.io/v1alpha1',
    });
  }
}

/**
 * UDPRoute is the Schema for the UDPRoute resource.
 *
 * @schema UDPRoute
 */
export interface UdpRouteOptions {
  /**
   * @schema UDPRoute#metadata
   */
  readonly metadata?: any;

  /**
   * UDPRouteSpec defines the desired state of UDPRoute.
   *
   * @schema UDPRoute#spec
   */
  readonly spec?: UdpRouteSpec;

}

/**
 * UDPRouteSpec defines the desired state of UDPRoute.
 *
 * @schema UdpRouteSpec
 */
export interface UdpRouteSpec {
  /**
   * Rules are a list of UDP matchers and actions.
   *
   * @schema UdpRouteSpec#rules
   */
  readonly rules: UdpRouteSpecRules[];

}

/**
 * UDPRouteRule is the configuration for a given rule.
 *
 * @schema UdpRouteSpecRules
 */
export interface UdpRouteSpecRules {
  /**
   * Action defines what happens to the packet.
   *
   * @schema UdpRouteSpecRules#action
   */
  readonly action?: UdpRouteSpecRulesAction;

  /**
   * Matches defines which packets match this rule.
   *
   * @schema UdpRouteSpecRules#matches
   */
  readonly matches?: UdpRouteSpecRulesMatches[];

}

/**
 * Action defines what happens to the packet.
 *
 * @schema UdpRouteSpecRulesAction
 */
export interface UdpRouteSpecRulesAction {
  /**
   * ExtensionRef is an optional, implementation-specific extension to the "action" behavior.  The resource may be "configmaps" (use the empty string for the group) or an implementation-defined resource (for example, resource "myrouteactions" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "configmaps".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the UDPRoute will be true. 
 Support: custom
   *
   * @schema UdpRouteSpecRulesAction#extensionRef
   */
  readonly extensionRef?: UdpRouteSpecRulesActionExtensionRef;

  /**
   * ForwardTo sends requests to the referenced object.  The resource may be "services" (omit or use the empty string for the group), or an implementation may support other resources (for example, resource "myroutetargets" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "services".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the UDPRoute will be true.
   *
   * @schema UdpRouteSpecRulesAction#forwardTo
   */
  readonly forwardTo: UdpRouteSpecRulesActionForwardTo;

}

/**
 * UDPRouteMatch defines the predicate used to match packets to a given action.
 *
 * @schema UdpRouteSpecRulesMatches
 */
export interface UdpRouteSpecRulesMatches {
  /**
   * ExtensionRef is an optional, implementation-specific extension to the "match" behavior.  The resource may be "configmap" (use the empty string for the group) or an implementation-defined resource (for example, resource "myroutematchers" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "configmaps".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the UDPRoute will be true. 
 Support: custom
   *
   * @schema UdpRouteSpecRulesMatches#extensionRef
   */
  readonly extensionRef?: UdpRouteSpecRulesMatchesExtensionRef;

}

/**
 * ExtensionRef is an optional, implementation-specific extension to the "action" behavior.  The resource may be "configmaps" (use the empty string for the group) or an implementation-defined resource (for example, resource "myrouteactions" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "configmaps".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the UDPRoute will be true. 
 Support: custom
 *
 * @schema UdpRouteSpecRulesActionExtensionRef
 */
export interface UdpRouteSpecRulesActionExtensionRef {
  /**
   * Group is the API group name of the referent.
   *
   * @schema UdpRouteSpecRulesActionExtensionRef#group
   */
  readonly group: string;

  /**
   * Name is the name of the referent.
   *
   * @schema UdpRouteSpecRulesActionExtensionRef#name
   */
  readonly name: string;

  /**
   * Resource is the API resource name of the referent.
   *
   * @schema UdpRouteSpecRulesActionExtensionRef#resource
   */
  readonly resource: string;

}

/**
 * ForwardTo sends requests to the referenced object.  The resource may be "services" (omit or use the empty string for the group), or an implementation may support other resources (for example, resource "myroutetargets" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "services".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the UDPRoute will be true.
 *
 * @schema UdpRouteSpecRulesActionForwardTo
 */
export interface UdpRouteSpecRulesActionForwardTo {
  /**
   * TargetPort specifies the destination port number to use for the TargetRef. If unspecified and TargetRef is a Service object consisting of a single port definition, that port will be used. If unspecified and TargetRef is a Service object consisting of multiple port definitions, an error is surfaced in status. 
 Support: Core
   *
   * @schema UdpRouteSpecRulesActionForwardTo#targetPort
   */
  readonly targetPort?: number;

  /**
   * TargetRef is an object reference to forward matched requests to. The resource may be "services" (omit or use the empty string for the group), or an implementation may support other resources (for example, resource "myroutetargets" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "services".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the HTTPRoute will be true. 
 Support: Core (Kubernetes Services) Support: Implementation-specific (Other resource types)
   *
   * @schema UdpRouteSpecRulesActionForwardTo#targetRef
   */
  readonly targetRef: UdpRouteSpecRulesActionForwardToTargetRef;

  /**
   * Weight specifies the proportion of traffic forwarded to a targetRef, computed as weight/(sum of all weights in targetRefs). Weight is not a percentage and the sum of weights does not need to equal 100. The following example (in yaml) sends 70% of traffic to service "my-trafficsplit-sv1" and 30% of the traffic to service "my-trafficsplit-sv2": 
   forwardTo:     - targetRef:         name: my-trafficsplit-sv1         weight: 70     - targetRef:         name: my-trafficsplit-sv2         weight: 30 
 If only one targetRef is specified, 100% of the traffic is forwarded to the targetRef. If unspecified, weight defaults to 1. 
 Support: Core (HTTPRoute) Support: Extended (TCPRoute)
   *
   * @schema UdpRouteSpecRulesActionForwardTo#weight
   */
  readonly weight?: number;

}

/**
 * ExtensionRef is an optional, implementation-specific extension to the "match" behavior.  The resource may be "configmap" (use the empty string for the group) or an implementation-defined resource (for example, resource "myroutematchers" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "configmaps".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the UDPRoute will be true. 
 Support: custom
 *
 * @schema UdpRouteSpecRulesMatchesExtensionRef
 */
export interface UdpRouteSpecRulesMatchesExtensionRef {
  /**
   * Group is the API group name of the referent.
   *
   * @schema UdpRouteSpecRulesMatchesExtensionRef#group
   */
  readonly group: string;

  /**
   * Name is the name of the referent.
   *
   * @schema UdpRouteSpecRulesMatchesExtensionRef#name
   */
  readonly name: string;

  /**
   * Resource is the API resource name of the referent.
   *
   * @schema UdpRouteSpecRulesMatchesExtensionRef#resource
   */
  readonly resource: string;

}

/**
 * TargetRef is an object reference to forward matched requests to. The resource may be "services" (omit or use the empty string for the group), or an implementation may support other resources (for example, resource "myroutetargets" in group "networking.acme.io"). Omitting or specifying the empty string for both the resource and group indicates that the resource is "services".  If the referent cannot be found, the "InvalidRoutes" status condition on any Gateway that includes the HTTPRoute will be true. 
 Support: Core (Kubernetes Services) Support: Implementation-specific (Other resource types)
 *
 * @schema UdpRouteSpecRulesActionForwardToTargetRef
 */
export interface UdpRouteSpecRulesActionForwardToTargetRef {
  /**
   * Group is the group of the referent.  Omitting the value or specifying the empty string indicates the core API group.  For example, use the following to specify a service: 
 fooRef:   resource: services   name: myservice 
 Otherwise, if the core API group is not desired, specify the desired group: 
 fooRef:   group: acme.io   resource: foos   name: myfoo
   *
   * @schema UdpRouteSpecRulesActionForwardToTargetRef#group
   */
  readonly group?: string;

  /**
   * Name is the name of the referent.
   *
   * @schema UdpRouteSpecRulesActionForwardToTargetRef#name
   */
  readonly name: string;

  /**
   * Resource is the API resource name of the referent. Omitting the value or specifying the empty string indicates the services resource. For example, use the following to specify a services resource: 
 fooRef:   name: myservice 
 Otherwise, if the services resource is not desired, specify the desired group: 
 fooRef:   group: acme.io   resource: foos   name: myfoo
   *
   * @schema UdpRouteSpecRulesActionForwardToTargetRef#resource
   */
  readonly resource?: string;

}

