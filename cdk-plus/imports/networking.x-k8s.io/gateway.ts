// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * Gateway represents an instantiation of a service-traffic handling infrastructure by binding Listeners to a set of IP addresses.
 *
 * @schema Gateway
 */
export class Gateway extends ApiObject {
  /**
   * Defines a "Gateway" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: GatewayOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'Gateway',
      apiVersion: 'networking.x-k8s.io/v1alpha1',
    });
  }
}

/**
 * Gateway represents an instantiation of a service-traffic handling infrastructure by binding Listeners to a set of IP addresses.
 *
 * @schema Gateway
 */
export interface GatewayOptions {
  /**
   * @schema Gateway#metadata
   */
  readonly metadata?: any;

  /**
   * GatewaySpec defines the desired state of Gateway. 
 Not all possible combinations of options specified in the Spec are valid. Some invalid configurations can be caught synchronously via a webhook, but there are many cases that will require asynchronous signaling via the GatewayStatus block.
   *
   * @schema Gateway#spec
   */
  readonly spec?: GatewaySpec;

}

/**
 * GatewaySpec defines the desired state of Gateway. 
 Not all possible combinations of options specified in the Spec are valid. Some invalid configurations can be caught synchronously via a webhook, but there are many cases that will require asynchronous signaling via the GatewayStatus block.
 *
 * @schema GatewaySpec
 */
export interface GatewaySpec {
  /**
   * Addresses requested for this gateway. This is optional and behavior can depend on the GatewayClass. If a value is set in the spec and the requested address is invalid, the GatewayClass MUST indicate this in the associated entry in GatewayStatus.Addresses. 
 If no Addresses are specified, the GatewayClass may schedule the Gateway in an implementation-defined manner, assigning an appropriate set of Addresses. 
 The GatewayClass MUST bind all Listeners to every GatewayAddress that it assigns to the Gateway. 
 Support: Core
   *
   * @schema GatewaySpec#addresses
   */
  readonly addresses?: GatewaySpecAddresses[];

  /**
   * GatewayClassName used for this Gateway. This is the name of a GatewayClass resource.
   *
   * @schema GatewaySpec#gatewayClassName
   */
  readonly gatewayClassName: string;

  /**
   * Listeners associated with this Gateway. Listeners define logical endpoints that are bound on this Gateway's addresses. At least one Listener MUST be specified. 
 Each Listener in this array must have a unique Port field, however a GatewayClass may collapse compatible Listener definitions into a single implementation-defined acceptor configuration even if their Port fields would otherwise conflict. 
 Listeners are compatible if all of the following conditions are true: 
 1. all their Protocol fields are "HTTP", or all their Protocol fields are "HTTPS" or TLS" 2. their Hostname fields are specified with a match type other than "Any" 3. their Hostname fields are not an exact match for any other Listener 
 As a special case, each group of compatible listeners may contain exactly one Listener with a match type of "Any". 
 If the GatewayClass collapses compatible Listeners, the hostname provided in the incoming client request MUST be matched to a Listener to find the correct set of Routes. The incoming hostname MUST be matched using the Hostname field for each Listener in order of most to least specific. That is, "Exact" matches must be processed before "Domain" matches, which must be processed before "Any" matches. 
 If this field specifies multiple Listeners that have the same Port value but are not compatible, the GatewayClass must raise a "PortConflict" condition on the Gateway. 
 Support: Core
   *
   * @schema GatewaySpec#listeners
   */
  readonly listeners: GatewaySpecListeners[];

}

/**
 * GatewayAddress describes an address that can be bound to a Gateway.
 *
 * @schema GatewaySpecAddresses
 */
export interface GatewaySpecAddresses {
  /**
   * Type of the Address. This is either "IPAddress" or "NamedAddress". 
 Support: Extended
   *
   * @schema GatewaySpecAddresses#type
   */
  readonly type?: GatewaySpecAddressesType;

  /**
   * Value. Examples: "1.2.3.4", "128::1", "my-ip-address". Validity of the values will depend on `Type` and support by the controller.
   *
   * @schema GatewaySpecAddresses#value
   */
  readonly value: string;

}

/**
 * Listener embodies the concept of a logical endpoint where a Gateway can accept network connections.
 *
 * @schema GatewaySpecListeners
 */
export interface GatewaySpecListeners {
  /**
   * Hostname specifies to match the virtual hostname for protocol types that define this concept. 
 Incoming requests that include a hostname are matched according to the given HostnameMatchType to select the Routes from this Listener. 
 If a match type other than "Any" is supplied, it MUST be compatible with the specified Protocol field. 
 Support: Core
   *
   * @schema GatewaySpecListeners#hostname
   */
  readonly hostname?: GatewaySpecListenersHostname;

  /**
   * Port is the network port. Multiple listeners may use the same port, subject to the Listener compatibility rules. 
 Support: Core
   *
   * @schema GatewaySpecListeners#port
   */
  readonly port?: number;

  /**
   * Protocol specifies the network protocol this listener expects to receive. The GatewayClass MUST validate that match type specified in the Hostname field is appropriate for the protocol. 
 * For the "TLS" protocol, the Hostname match MUST be   applied to the [SNI](https://tools.ietf.org/html/rfc6066#section-3)   server name offered by the client. * For the "HTTP" protocol, the Hostname match MUST be   applied to the host portion of the   [effective request URI](https://tools.ietf.org/html/rfc7230#section-5.5)   or the [:authority pseudo-header](https://tools.ietf.org/html/rfc7540#section-8.1.2.3) * For the "HTTPS" protocol, the Hostname match MUST be   applied at both the TLS and HTTP protocol layers. 
 Support: Core
   *
   * @schema GatewaySpecListeners#protocol
   */
  readonly protocol?: GatewaySpecListenersProtocol;

  /**
   * Routes specifies a schema for associating routes with the Listener using selectors. A Route is a resource capable of servicing a request and allows a cluster operator to expose a cluster resource (i.e. Service) by externally-reachable URL, load-balance traffic and terminate SSL/TLS.  Typically, a route is a "HTTPRoute" or "TCPRoute" in group "networking.x-k8s.io", however, an implementation may support other types of resources. 
 The Routes selector MUST select a set of objects that are compatible with the application protocol specified in the Protocol field. 
 Support: Core
   *
   * @schema GatewaySpecListeners#routes
   */
  readonly routes: GatewaySpecListenersRoutes;

  /**
   * TLS is the TLS configuration for the Listener. This field is required if the Protocol field is "HTTPS" or "TLS" and ignored otherwise. 
 The association of SNIs to Certificate defined in GatewayTLSConfig is defined based on the Hostname field for this listener: - "Domain": Certificate should be used for the domain and its   first-level subdomains. - "Exact": Certificate should be used for the domain only. - "Any": Certificate in GatewayTLSConfig is the default certificate to use. 
 The GatewayClass MUST use the longest matching SNI out of all available certificates for any TLS handshake. 
 Support: Core
   *
   * @schema GatewaySpecListeners#tls
   */
  readonly tls?: GatewaySpecListenersTls;

}

/**
 * Type of the Address. This is either "IPAddress" or "NamedAddress". 
 Support: Extended
 *
 * @schema GatewaySpecAddressesType
 */
export enum GatewaySpecAddressesType {
  /** IPAddress */
  IP_ADDRESS = "IPAddress",
  /** NamedAddress */
  NAMED_ADDRESS = "NamedAddress",
}

/**
 * Hostname specifies to match the virtual hostname for protocol types that define this concept. 
 Incoming requests that include a hostname are matched according to the given HostnameMatchType to select the Routes from this Listener. 
 If a match type other than "Any" is supplied, it MUST be compatible with the specified Protocol field. 
 Support: Core
 *
 * @schema GatewaySpecListenersHostname
 */
export interface GatewaySpecListenersHostname {
  /**
   * Match specifies how the hostname provided by the client should be matched against the given value.
   *
   * @schema GatewaySpecListenersHostname#match
   */
  readonly match?: GatewaySpecListenersHostnameMatch;

  /**
   * Name contains the name to match against. This value must be a fully qualified host or domain name conforming to the preferred name syntax defined in [RFC 1034](https://tools.ietf.org/html/rfc1034#section-3.5) 
 In addition to any RFC rules, this field MUST NOT contain 
 1. IP address literals 2. Colon-delimited port numbers 3. Percent-encoded octets 
 This field is required for the "Domain" and "Exact" match types.
   *
   * @schema GatewaySpecListenersHostname#name
   */
  readonly name?: string;

}

/**
 * Protocol specifies the network protocol this listener expects to receive. The GatewayClass MUST validate that match type specified in the Hostname field is appropriate for the protocol. 
 * For the "TLS" protocol, the Hostname match MUST be   applied to the [SNI](https://tools.ietf.org/html/rfc6066#section-3)   server name offered by the client. * For the "HTTP" protocol, the Hostname match MUST be   applied to the host portion of the   [effective request URI](https://tools.ietf.org/html/rfc7230#section-5.5)   or the [:authority pseudo-header](https://tools.ietf.org/html/rfc7540#section-8.1.2.3) * For the "HTTPS" protocol, the Hostname match MUST be   applied at both the TLS and HTTP protocol layers. 
 Support: Core
 *
 * @schema GatewaySpecListenersProtocol
 */
export enum GatewaySpecListenersProtocol {
  /** HTTP */
  HTTP = "HTTP",
  /** HTTPS */
  HTTPS = "HTTPS",
  /** TLS */
  TLS = "TLS",
  /** TCP */
  TCP = "TCP",
  /** UDP */
  UDP = "UDP",
}

/**
 * Routes specifies a schema for associating routes with the Listener using selectors. A Route is a resource capable of servicing a request and allows a cluster operator to expose a cluster resource (i.e. Service) by externally-reachable URL, load-balance traffic and terminate SSL/TLS.  Typically, a route is a "HTTPRoute" or "TCPRoute" in group "networking.x-k8s.io", however, an implementation may support other types of resources. 
 The Routes selector MUST select a set of objects that are compatible with the application protocol specified in the Protocol field. 
 Support: Core
 *
 * @schema GatewaySpecListenersRoutes
 */
export interface GatewaySpecListenersRoutes {
  /**
   * Group is the group of the route resource to select. Omitting the value or specifying the empty string indicates the networking.x-k8s.io API group. For example, use the following to select an HTTPRoute: 
 routes:   resource: httproutes 
 Otherwise, if an alternative API group is desired, specify the desired group: 
 routes:   group: acme.io   resource: fooroutes 
 Support: Core
   *
   * @schema GatewaySpecListenersRoutes#group
   */
  readonly group?: string;

  /**
   * Resource is the API resource name of the route resource to select. 
 Resource MUST correspond to route resources that are compatible with the application protocol specified in the Listener's Protocol field. 
 If an implementation does not support or recognize this resource type, it SHOULD raise a "ConditionInvalidRoutes" condition for the affected Listener. 
 Support: Core
   *
   * @schema GatewaySpecListenersRoutes#resource
   */
  readonly resource: string;

  /**
   * RouteNamespaces indicates in which namespaces Routes should be selected for this Gateway. This is restricted to the namespace of this Gateway by default. 
 Support: Core
   *
   * @schema GatewaySpecListenersRoutes#routeNamespaces
   */
  readonly routeNamespaces?: GatewaySpecListenersRoutesRouteNamespaces;

  /**
   * RouteSelector specifies a set of route labels used for selecting routes to associate with the Gateway. If RouteSelector is defined, only routes matching the RouteSelector are associated with the Gateway. An empty RouteSelector matches all routes. 
 Support: Core
   *
   * @schema GatewaySpecListenersRoutes#routeSelector
   */
  readonly routeSelector?: GatewaySpecListenersRoutesRouteSelector;

}

/**
 * TLS is the TLS configuration for the Listener. This field is required if the Protocol field is "HTTPS" or "TLS" and ignored otherwise. 
 The association of SNIs to Certificate defined in GatewayTLSConfig is defined based on the Hostname field for this listener: - "Domain": Certificate should be used for the domain and its   first-level subdomains. - "Exact": Certificate should be used for the domain only. - "Any": Certificate in GatewayTLSConfig is the default certificate to use. 
 The GatewayClass MUST use the longest matching SNI out of all available certificates for any TLS handshake. 
 Support: Core
 *
 * @schema GatewaySpecListenersTls
 */
export interface GatewaySpecListenersTls {
  /**
   * CertificateRef is the reference to Kubernetes object that contain a TLS certificate and private key. This certificate MUST be used for TLS handshakes for the domain this GatewayTLSConfig is associated with. If an entry in this list omits or specifies the empty string for both the group and the resource, the resource defaults to "secrets". An implementation may support other resources (for example, resource "mycertificates" in group "networking.acme.io"). Support: Core (Kubernetes Secrets) Support: Implementation-specific (Other resource types)
   *
   * @schema GatewaySpecListenersTls#certificateRef
   */
  readonly certificateRef?: GatewaySpecListenersTlsCertificateRef;

  /**
   * Mode defines the TLS behavior for the TLS session initiated by the client. There are two possible modes: - Terminate: The TLS session between the downstream client   and the Gateway is terminated at the Gateway. - Passthrough: The TLS session is NOT terminated by the Gateway. This   implies that the Gateway can't decipher the TLS stream except for   the ClientHello message of the TLS protocol.   CertificateRef field is ignored in this mode.
   *
   * @schema GatewaySpecListenersTls#mode
   */
  readonly mode?: GatewaySpecListenersTlsMode;

  /**
   * Options are a list of key/value pairs to give extended options to the provider. 
 There variation among providers as to how ciphersuites are expressed. If there is a common subset for expressing ciphers then it will make sense to loft that as a core API construct. 
 Support: Implementation-specific.
   *
   * @schema GatewaySpecListenersTls#options
   */
  readonly options?: { [key: string]: string };

}

/**
 * Match specifies how the hostname provided by the client should be matched against the given value.
 *
 * @schema GatewaySpecListenersHostnameMatch
 */
export enum GatewaySpecListenersHostnameMatch {
  /** Domain */
  DOMAIN = "Domain",
  /** Exact */
  EXACT = "Exact",
  /** Any */
  ANY = "Any",
}

/**
 * RouteNamespaces indicates in which namespaces Routes should be selected for this Gateway. This is restricted to the namespace of this Gateway by default. 
 Support: Core
 *
 * @schema GatewaySpecListenersRoutesRouteNamespaces
 */
export interface GatewaySpecListenersRoutesRouteNamespaces {
  /**
   * NamespaceSelector is a selector of namespaces that Routes should be selected from. This is a standard Kubernetes LabelSelector, a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. Controllers must not support Routes in namespaces outside this selector. 
 An empty selector (default) indicates that Routes in any namespace can be selected. 
 The OnlySameNamespace field takes precedence over this field. This selector will only take effect when OnlySameNamespace is false. 
 Support: Core
   *
   * @schema GatewaySpecListenersRoutesRouteNamespaces#namespaceSelector
   */
  readonly namespaceSelector?: GatewaySpecListenersRoutesRouteNamespacesNamespaceSelector;

  /**
   * OnlySameNamespace is a boolean used to indicate if Route references are limited to the same Namespace as the Gateway. When true, only Routes within the same Namespace as the Gateway should be selected. 
 This field takes precedence over the NamespaceSelector field. That selector should only take effect when this field is set to false. 
 Support: Core
   *
   * @schema GatewaySpecListenersRoutesRouteNamespaces#onlySameNamespace
   */
  readonly onlySameNamespace?: boolean;

}

/**
 * RouteSelector specifies a set of route labels used for selecting routes to associate with the Gateway. If RouteSelector is defined, only routes matching the RouteSelector are associated with the Gateway. An empty RouteSelector matches all routes. 
 Support: Core
 *
 * @schema GatewaySpecListenersRoutesRouteSelector
 */
export interface GatewaySpecListenersRoutesRouteSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   *
   * @schema GatewaySpecListenersRoutesRouteSelector#matchExpressions
   */
  readonly matchExpressions?: GatewaySpecListenersRoutesRouteSelectorMatchExpressions[];

  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   *
   * @schema GatewaySpecListenersRoutesRouteSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

}

/**
 * CertificateRef is the reference to Kubernetes object that contain a TLS certificate and private key. This certificate MUST be used for TLS handshakes for the domain this GatewayTLSConfig is associated with. If an entry in this list omits or specifies the empty string for both the group and the resource, the resource defaults to "secrets". An implementation may support other resources (for example, resource "mycertificates" in group "networking.acme.io"). Support: Core (Kubernetes Secrets) Support: Implementation-specific (Other resource types)
 *
 * @schema GatewaySpecListenersTlsCertificateRef
 */
export interface GatewaySpecListenersTlsCertificateRef {
  /**
   * Group is the group of the referent.  Omitting the value or specifying the empty string indicates the core API group.  For example, use the following to specify a secrets resource: 
 fooRef:   resource: secrets   name: mysecret 
 Otherwise, if the core API group is not desired, specify the desired group: 
 fooRef:   group: acme.io   resource: foos   name: myfoo
   *
   * @schema GatewaySpecListenersTlsCertificateRef#group
   */
  readonly group?: string;

  /**
   * Name is the name of the referent.
   *
   * @schema GatewaySpecListenersTlsCertificateRef#name
   */
  readonly name: string;

  /**
   * Resource is the API resource name of the referent. Omitting the value or specifying the empty string indicates the secrets resource. For example, use the following to specify a secrets resource: 
 fooRef:   name: mysecret 
 Otherwise, if the secrets resource is not desired, specify the desired group: 
 fooRef:   group: acme.io   resource: foos   name: myfoo
   *
   * @schema GatewaySpecListenersTlsCertificateRef#resource
   */
  readonly resource?: string;

}

/**
 * Mode defines the TLS behavior for the TLS session initiated by the client. There are two possible modes: - Terminate: The TLS session between the downstream client   and the Gateway is terminated at the Gateway. - Passthrough: The TLS session is NOT terminated by the Gateway. This   implies that the Gateway can't decipher the TLS stream except for   the ClientHello message of the TLS protocol.   CertificateRef field is ignored in this mode.
 *
 * @schema GatewaySpecListenersTlsMode
 */
export enum GatewaySpecListenersTlsMode {
  /** Terminate */
  TERMINATE = "Terminate",
  /** Passthrough */
  PASSTHROUGH = "Passthrough",
}

/**
 * NamespaceSelector is a selector of namespaces that Routes should be selected from. This is a standard Kubernetes LabelSelector, a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. Controllers must not support Routes in namespaces outside this selector. 
 An empty selector (default) indicates that Routes in any namespace can be selected. 
 The OnlySameNamespace field takes precedence over this field. This selector will only take effect when OnlySameNamespace is false. 
 Support: Core
 *
 * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelector
 */
export interface GatewaySpecListenersRoutesRouteNamespacesNamespaceSelector {
  /**
   * matchExpressions is a list of label selector requirements. The requirements are ANDed.
   *
   * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelector#matchExpressions
   */
  readonly matchExpressions?: GatewaySpecListenersRoutesRouteNamespacesNamespaceSelectorMatchExpressions[];

  /**
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.
   *
   * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 *
 * @schema GatewaySpecListenersRoutesRouteSelectorMatchExpressions
 */
export interface GatewaySpecListenersRoutesRouteSelectorMatchExpressions {
  /**
   * key is the label key that the selector applies to.
   *
   * @schema GatewaySpecListenersRoutesRouteSelectorMatchExpressions#key
   */
  readonly key: string;

  /**
   * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
   *
   * @schema GatewaySpecListenersRoutesRouteSelectorMatchExpressions#operator
   */
  readonly operator: string;

  /**
   * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   *
   * @schema GatewaySpecListenersRoutesRouteSelectorMatchExpressions#values
   */
  readonly values?: string[];

}

/**
 * A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.
 *
 * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelectorMatchExpressions
 */
export interface GatewaySpecListenersRoutesRouteNamespacesNamespaceSelectorMatchExpressions {
  /**
   * key is the label key that the selector applies to.
   *
   * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelectorMatchExpressions#key
   */
  readonly key: string;

  /**
   * operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.
   *
   * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelectorMatchExpressions#operator
   */
  readonly operator: string;

  /**
   * values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.
   *
   * @schema GatewaySpecListenersRoutesRouteNamespacesNamespaceSelectorMatchExpressions#values
   */
  readonly values?: string[];

}

