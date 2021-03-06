// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * GatewayClass describes a class of Gateways available to the user for creating Gateway resources. 
 GatewayClass is a Cluster level resource. 
 Support: Core.
 *
 * @schema GatewayClass
 */
export class GatewayClass extends ApiObject {
  /**
   * Defines a "GatewayClass" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: GatewayClassOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'GatewayClass',
      apiVersion: 'networking.x-k8s.io/v1alpha1',
    });
  }
}

/**
 * GatewayClass describes a class of Gateways available to the user for creating Gateway resources. 
 GatewayClass is a Cluster level resource. 
 Support: Core.
 *
 * @schema GatewayClass
 */
export interface GatewayClassOptions {
  /**
   * @schema GatewayClass#metadata
   */
  readonly metadata?: any;

  /**
   * Spec for this GatewayClass.
   *
   * @schema GatewayClass#spec
   */
  readonly spec?: GatewayClassSpec;

}

/**
 * Spec for this GatewayClass.
 *
 * @schema GatewayClassSpec
 */
export interface GatewayClassSpec {
  /**
   * AllowedGatewayNamespaceSelector is a selector of namespaces that Gateways can use this GatewayClass from. This is a standard Kubernetes LabelSelector. Controllers must not support Gateways in namespaces outside this selector. 
 An empty selector (default) indicates that Gateways can use this GatewayClass from any namespace. 
 When a Gateway attempts to use this class from a namespace that is not allowed by this selector, the controller implementing the GatewayClass may add a new "ForbiddenNamespaceForClass" condition to the Gateway status. Adding this condition is considered optional since not all controllers will have access to all namespaces. 
 Support: Core
   *
   * @schema GatewayClassSpec#allowedGatewayNamespaceSelector
   */
  readonly allowedGatewayNamespaceSelector?: GatewayClassSpecAllowedGatewayNamespaceSelector;

  /**
   * AllowedRouteNamespaces indicates in which namespaces Routes can be selected for Gateways of this class. This is restricted to the namespace of the Gateway by default. 
 When any Routes are selected by a Gateway in a namespace that is not allowed by this selector, the controller implementing the GatewayClass may add a new "ForbiddenRoutesForClass" condition to the Gateway status. Adding this condition is considered optional since not all controllers will have access to all namespaces. 
 Support: Core
   *
   * @schema GatewayClassSpec#allowedRouteNamespaces
   */
  readonly allowedRouteNamespaces?: GatewayClassSpecAllowedRouteNamespaces;

  /**
   * Controller is a domain/path string that indicates the controller that is managing Gateways of this class. 
 Example: "acme.io/gateway-controller". 
 This field is not mutable and cannot be empty. 
 The format of this field is DOMAIN "/" PATH, where DOMAIN and PATH are valid Kubernetes names (https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names). 
 Support: Core
   *
   * @schema GatewayClassSpec#controller
   */
  readonly controller: string;

  /**
   * ParametersRef is a controller-specific resource containing the configuration parameters corresponding to this class. This is optional if the controller does not require any additional configuration. 
 Parameters resources are implementation specific custom resources. These resources must be cluster-scoped. 
 If the referent cannot be found, the GatewayClass's "InvalidParameters" status condition will be true. 
 Support: Custom
   *
   * @schema GatewayClassSpec#parametersRef
   */
  readonly parametersRef?: GatewayClassSpecParametersRef;

}

/**
 * AllowedGatewayNamespaceSelector is a selector of namespaces that Gateways can use this GatewayClass from. This is a standard Kubernetes LabelSelector. Controllers must not support Gateways in namespaces outside this selector. 
 An empty selector (default) indicates that Gateways can use this GatewayClass from any namespace. 
 When a Gateway attempts to use this class from a namespace that is not allowed by this selector, the controller implementing the GatewayClass may add a new "ForbiddenNamespaceForClass" condition to the Gateway status. Adding this condition is considered optional since not all controllers will have access to all namespaces. 
 Support: Core
 *
 * @schema GatewayClassSpecAllowedGatewayNamespaceSelector
 */
export interface GatewayClassSpecAllowedGatewayNamespaceSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   *
   * @schema GatewayClassSpecAllowedGatewayNamespaceSelector#matchExpressions
   */
  readonly matchExpressions?: GatewayClassSpecAllowedGatewayNamespaceSelectorMatchExpressions[];

  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   *
   * @schema GatewayClassSpecAllowedGatewayNamespaceSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

}

/**
 * AllowedRouteNamespaces indicates in which namespaces Routes can be selected for Gateways of this class. This is restricted to the namespace of the Gateway by default. 
 When any Routes are selected by a Gateway in a namespace that is not allowed by this selector, the controller implementing the GatewayClass may add a new "ForbiddenRoutesForClass" condition to the Gateway status. Adding this condition is considered optional since not all controllers will have access to all namespaces. 
 Support: Core
 *
 * @schema GatewayClassSpecAllowedRouteNamespaces
 */
export interface GatewayClassSpecAllowedRouteNamespaces {
  /**
   * NamespaceSelector is a selector of namespaces that Routes should be selected from. This is a standard Kubernetes LabelSelector, a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. Controllers must not support Routes in namespaces outside this selector. 
 An empty selector (default) indicates that Routes in any namespace can be selected. 
 The OnlySameNamespace field takes precedence over this field. This selector will only take effect when OnlySameNamespace is false. 
 Support: Core
   *
   * @schema GatewayClassSpecAllowedRouteNamespaces#namespaceSelector
   */
  readonly namespaceSelector?: GatewayClassSpecAllowedRouteNamespacesNamespaceSelector;

  /**
   * OnlySameNamespace is a boolean used to indicate if Route references are limited to the same Namespace as the Gateway. When true, only Routes within the same Namespace as the Gateway should be selected. 
 This field takes precedence over the NamespaceSelector field. That selector should only take effect when this field is set to false. 
 Support: Core
   *
   * @schema GatewayClassSpecAllowedRouteNamespaces#onlySameNamespace
   */
  readonly onlySameNamespace?: boolean;

}

/**
 * ParametersRef is a controller-specific resource containing the configuration parameters corresponding to this class. This is optional if the controller does not require any additional configuration. 
 Parameters resources are implementation specific custom resources. These resources must be cluster-scoped. 
 If the referent cannot be found, the GatewayClass's "InvalidParameters" status condition will be true. 
 Support: Custom
 *
 * @schema GatewayClassSpecParametersRef
 */
export interface GatewayClassSpecParametersRef {
  /**
   * Group is the API group name of the referent.
   *
   * @schema GatewayClassSpecParametersRef#group
   */
  readonly group: string;

  /**
   * Name is the name of the referent.
   *
   * @schema GatewayClassSpecParametersRef#name
   */
  readonly name: string;

  /**
   * Resource is the API resource name of the referent.
   *
   * @schema GatewayClassSpecParametersRef#resource
   */
  readonly resource: string;

}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 *
 * @schema GatewayClassSpecAllowedGatewayNamespaceSelectorMatchExpressions
 */
export interface GatewayClassSpecAllowedGatewayNamespaceSelectorMatchExpressions {
  /**
   * key is the label key that the selector applies to.
   *
   * @schema GatewayClassSpecAllowedGatewayNamespaceSelectorMatchExpressions#key
   */
  readonly key: string;

  /**
   * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
   *
   * @schema GatewayClassSpecAllowedGatewayNamespaceSelectorMatchExpressions#operator
   */
  readonly operator: string;

  /**
   * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   *
   * @schema GatewayClassSpecAllowedGatewayNamespaceSelectorMatchExpressions#values
   */
  readonly values?: string[];

}

/**
 * NamespaceSelector is a selector of namespaces that Routes should be selected from. This is a standard Kubernetes LabelSelector, a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. Controllers must not support Routes in namespaces outside this selector. 
 An empty selector (default) indicates that Routes in any namespace can be selected. 
 The OnlySameNamespace field takes precedence over this field. This selector will only take effect when OnlySameNamespace is false. 
 Support: Core
 *
 * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelector
 */
export interface GatewayClassSpecAllowedRouteNamespacesNamespaceSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   *
   * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelector#matchExpressions
   */
  readonly matchExpressions?: GatewayClassSpecAllowedRouteNamespacesNamespaceSelectorMatchExpressions[];

  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   *
   * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 *
 * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelectorMatchExpressions
 */
export interface GatewayClassSpecAllowedRouteNamespacesNamespaceSelectorMatchExpressions {
  /**
   * key is the label key that the selector applies to.
   *
   * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelectorMatchExpressions#key
   */
  readonly key: string;

  /**
   * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
   *
   * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelectorMatchExpressions#operator
   */
  readonly operator: string;

  /**
   * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   *
   * @schema GatewayClassSpecAllowedRouteNamespacesNamespaceSelectorMatchExpressions#values
   */
  readonly values?: string[];

}

