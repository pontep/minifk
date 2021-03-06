// generated by cdk8s
import { ApiObject } from 'cdk8s';
import { Construct } from 'constructs';

/**
 * 
 *
 * @schema PeerAuthentication
 */
export class PeerAuthentication extends ApiObject {
  /**
   * Defines a "PeerAuthentication" API object
   * @param scope the scope in which to define this object
   * @param name a scope-local name for the object
   * @param options configuration options
   */
  public constructor(scope: Construct, name: string, options: PeerAuthenticationOptions = {}) {
    super(scope, name, {
      ...options,
      kind: 'PeerAuthentication',
      apiVersion: 'security.istio.io/v1beta1',
    });
  }
}

/**
 * @schema PeerAuthentication
 */
export interface PeerAuthenticationOptions {
  /**
   * PeerAuthentication defines how traffic will be tunneled (or not) to the sidecar.
   *
   * @schema PeerAuthentication#spec
   */
  readonly spec?: PeerAuthenticationSpec;

}

/**
 * PeerAuthentication defines how traffic will be tunneled (or not) to the sidecar.
 *
 * @schema PeerAuthenticationSpec
 */
export interface PeerAuthenticationSpec {
  /**
   * Mutual TLS settings for workload.
   *
   * @schema PeerAuthenticationSpec#mtls
   */
  readonly mtls?: PeerAuthenticationSpecMtls;

  /**
   * Port specific mutual TLS settings.
   *
   * @schema PeerAuthenticationSpec#portLevelMtls
   */
  readonly portLevelMtls?: { [key: string]: PeerAuthenticationSpecPortLevelMtls };

  /**
   * The selector determines the workloads to apply the ChannelAuthentication on.
   *
   * @schema PeerAuthenticationSpec#selector
   */
  readonly selector?: PeerAuthenticationSpecSelector;

}

/**
 * Mutual TLS settings for workload.
 *
 * @schema PeerAuthenticationSpecMtls
 */
export interface PeerAuthenticationSpecMtls {
  /**
   * Defines the mTLS mode used for peer authentication.
   *
   * @schema PeerAuthenticationSpecMtls#mode
   */
  readonly mode?: PeerAuthenticationSpecMtlsMode;

}

/**
 * @schema PeerAuthenticationSpecPortLevelMtls
 */
export interface PeerAuthenticationSpecPortLevelMtls {
  /**
   * Defines the mTLS mode used for peer authentication.
   *
   * @schema PeerAuthenticationSpecPortLevelMtls#mode
   */
  readonly mode?: PeerAuthenticationSpecPortLevelMtlsMode;

}

/**
 * The selector determines the workloads to apply the ChannelAuthentication on.
 *
 * @schema PeerAuthenticationSpecSelector
 */
export interface PeerAuthenticationSpecSelector {
  /**
   * @schema PeerAuthenticationSpecSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

}

/**
 * Defines the mTLS mode used for peer authentication.
 *
 * @schema PeerAuthenticationSpecMtlsMode
 */
export enum PeerAuthenticationSpecMtlsMode {
  /** UNSET */
  UNSET = "UNSET",
  /** DISABLE */
  DISABLE = "DISABLE",
  /** PERMISSIVE */
  PERMISSIVE = "PERMISSIVE",
  /** STRICT */
  STRICT = "STRICT",
}

/**
 * Defines the mTLS mode used for peer authentication.
 *
 * @schema PeerAuthenticationSpecPortLevelMtlsMode
 */
export enum PeerAuthenticationSpecPortLevelMtlsMode {
  /** UNSET */
  UNSET = "UNSET",
  /** DISABLE */
  DISABLE = "DISABLE",
  /** PERMISSIVE */
  PERMISSIVE = "PERMISSIVE",
  /** STRICT */
  STRICT = "STRICT",
}

