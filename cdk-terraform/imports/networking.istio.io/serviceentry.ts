// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * 
 *
 * @schema ServiceEntry
 */
export class ServiceEntry extends ApiObject {
  /**
   * Defines a "ServiceEntry" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: ServiceEntryOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'ServiceEntry',
      apiVersion: 'networking.istio.io/v1alpha3',
    });
  }
}

/**
 * @schema ServiceEntry
 */
export interface ServiceEntryOptions {
  /**
   * Configuration affecting service registry. See more details at: https://istio.io/docs/reference/config/networking/service-entry.html
   *
   * @schema ServiceEntry#spec
   */
  readonly spec?: ServiceEntrySpec;

}

/**
 * Configuration affecting service registry. See more details at: https://istio.io/docs/reference/config/networking/service-entry.html
 *
 * @schema ServiceEntrySpec
 */
export interface ServiceEntrySpec {
  /**
   * The virtual IP addresses associated with the service.
   *
   * @schema ServiceEntrySpec#addresses
   */
  readonly addresses?: string[];

  /**
   * One or more endpoints associated with the service.
   *
   * @schema ServiceEntrySpec#endpoints
   */
  readonly endpoints?: ServiceEntrySpecEndpoints[];

  /**
   * A list of namespaces to which this service is exported.
   *
   * @schema ServiceEntrySpec#exportTo
   */
  readonly exportTo?: string[];

  /**
   * The hosts associated with the ServiceEntry.
   *
   * @schema ServiceEntrySpec#hosts
   */
  readonly hosts?: string[];

  /**
   * @schema ServiceEntrySpec#location
   */
  readonly location?: ServiceEntrySpecLocation;

  /**
   * The ports associated with the external service.
   *
   * @schema ServiceEntrySpec#ports
   */
  readonly ports?: ServiceEntrySpecPorts[];

  /**
   * Service discovery mode for the hosts.
   *
   * @schema ServiceEntrySpec#resolution
   */
  readonly resolution?: ServiceEntrySpecResolution;

  /**
   * @schema ServiceEntrySpec#subjectAltNames
   */
  readonly subjectAltNames?: string[];

}

/**
 * @schema ServiceEntrySpecEndpoints
 */
export interface ServiceEntrySpecEndpoints {
  /**
   * @schema ServiceEntrySpecEndpoints#address
   */
  readonly address?: string;

  /**
   * One or more labels associated with the endpoint.
   *
   * @schema ServiceEntrySpecEndpoints#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * The locality associated with the endpoint.
   *
   * @schema ServiceEntrySpecEndpoints#locality
   */
  readonly locality?: string;

  /**
   * @schema ServiceEntrySpecEndpoints#network
   */
  readonly network?: string;

  /**
   * Set of ports associated with the endpoint.
   *
   * @schema ServiceEntrySpecEndpoints#ports
   */
  readonly ports?: { [key: string]: number };

  /**
   * The load balancing weight associated with the endpoint.
   *
   * @schema ServiceEntrySpecEndpoints#weight
   */
  readonly weight?: number;

}

/**
 * @schema ServiceEntrySpecLocation
 */
export enum ServiceEntrySpecLocation {
  /** MESH_EXTERNAL */
  MESH_EXTERNAL = "MESH_EXTERNAL",
  /** MESH_INTERNAL */
  MESH_INTERNAL = "MESH_INTERNAL",
}

/**
 * @schema ServiceEntrySpecPorts
 */
export interface ServiceEntrySpecPorts {
  /**
   * Label assigned to the port.
   *
   * @schema ServiceEntrySpecPorts#name
   */
  readonly name?: string;

  /**
   * A valid non-negative integer port number.
   *
   * @schema ServiceEntrySpecPorts#number
   */
  readonly number?: number;

  /**
   * The protocol exposed on the port.
   *
   * @schema ServiceEntrySpecPorts#protocol
   */
  readonly protocol?: string;

}

/**
 * Service discovery mode for the hosts.
 *
 * @schema ServiceEntrySpecResolution
 */
export enum ServiceEntrySpecResolution {
  /** NONE */
  NONE = "NONE",
  /** STATIC */
  STATIC = "STATIC",
  /** DNS */
  DNS = "DNS",
}

