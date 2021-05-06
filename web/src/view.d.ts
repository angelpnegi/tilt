declare namespace Proto {
  export interface webviewView {
    log?: string;
    resources?: webviewResource[];
    /**
     * We used to have a setting that allowed users to dynamically
     * prepend timestamps in logs.
     */
    DEPRECATEDLogTimestamps?: boolean;
    featureFlags?: object;
    needsAnalyticsNudge?: boolean;
    runningTiltBuild?: webviewTiltBuild;
    DEPRECATEDLatestTiltBuild?: webviewTiltBuild;
    suggestedTiltVersion?: string;
    versionSettings?: webviewVersionSettings;
    tiltCloudUsername?: string;
    tiltCloudTeamName?: string;
    tiltCloudSchemeHost?: string;
    tiltCloudTeamID?: string;
    fatalError?: string;
    logList?: webviewLogList;
    /**
     * Allows us to synchronize on a running Tilt intance,
     * so we can tell when Tilt restarted.
     */
    tiltStartTime?: string;
    tiltfileKey?: string;
    /**
     * New API-server based data models. These will eventually obsolete the fields
     * above.
     */
    uiSession?: v1alpha1UISession;
    uiResources?: v1alpha1UIResource[];
  }
  export interface webviewVersionSettings {
    checkUpdates?: boolean;
  }
  export interface webviewUploadSnapshotResponse {
    url?: string;
  }
  export interface webviewTiltBuild {
    version?: string;
    commitSHA?: string;
    date?: string;
    dev?: boolean;
  }
  export interface webviewTargetSpec {
    id?: string;
    type?: string;
    hasLiveUpdate?: boolean;
  }
  export interface webviewSnapshotHighlight {
    beginningLogID?: string;
    endingLogID?: string;
    text?: string;
  }
  export interface webviewSnapshot {
    view?: webviewView;
    isSidebarClosed?: boolean;
    path?: string;
    snapshotHighlight?: webviewSnapshotHighlight;
    snapshotLink?: string;
  }
  export interface webviewResource {
    name?: string;
    lastDeployTime?: string;
    triggerMode?: number;
    buildHistory?: webviewBuildRecord[];
    currentBuild?: webviewBuildRecord;
    pendingBuildSince?: string;
    hasPendingChanges?: boolean;
    endpointLinks?: webviewLink[];
    podID?: string;
    k8sResourceInfo?: webviewK8sResourceInfo;
    localResourceInfo?: webviewLocalResourceInfo;
    runtimeStatus?: string;
    updateStatus?: string;
    isTiltfile?: boolean;
    specs?: webviewTargetSpec[];
    queued?: boolean;
  }
  export interface webviewLogSpan {
    manifestName?: string;
  }
  export interface webviewLogSegment {
    spanId?: string;
    time?: string;
    text?: string;
    level?: string;
    /**
     * When we store warnings in the LogStore, we break them up into lines and
     * store them as a series of line segments. 'anchor' marks the beginning of a
     * series of logs that should be kept together.
     *
     * Anchor warning1, line1
     *        warning1, line2
     * Anchor warning2, line1
     */
    anchor?: boolean;
    /**
     * Context-specific optional fields for a log segment.
     * Used for experimenting with new types of log metadata.
     */
    fields?: object;
  }
  export interface webviewLogList {
    spans?: object;
    segments?: webviewLogSegment[];
    /**
     * [from_checkpoint, to_checkpoint)
     *
     * An interval of [0, 0) means that the server isn't using
     * the incremental load protocol.
     *
     * An interval of [-1, -1) means that the server doesn't have new logs
     * to send down.
     */
    fromCheckpoint?: number;
    toCheckpoint?: number;
  }
  export interface webviewLocalResourceInfo {
    pid?: string;
    isTest?: boolean;
  }
  export interface webviewLink {
    url?: string;
    name?: string;
  }
  export interface webviewK8sResourceInfo {
    podName?: string;
    podCreationTime?: string;
    podUpdateStartTime?: string;
    podStatus?: string;
    podStatusMessage?: string;
    allContainersReady?: boolean;
    podRestarts?: number;
    spanId?: string;
    displayNames?: string[];
  }
  export interface webviewBuildRecord {
    error?: string;
    warnings?: string[];
    startTime?: string;
    finishTime?: string;
    isCrashRebuild?: boolean;
    /**
     * The span id for this build record's logs in the main logstore.
     */
    spanId?: string;
  }
  export interface webviewAckWebsocketResponse {}
  export interface webviewAckWebsocketRequest {
    toCheckpoint?: number;
    /**
     * Allows us to synchronize on a running Tilt intance,
     * so we can tell when we're talking to the same Tilt.
     */
    tiltStartTime?: string;
  }
  export interface v1Time {
    /**
     * Represents seconds of UTC time since Unix epoch
     * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     * 9999-12-31T23:59:59Z inclusive.
     */
    seconds?: string;
    /**
     * Non-negative fractions of a second at nanosecond resolution. Negative
     * second values with fractions must still have non-negative nanos values
     * that count forward in time. Must be from 0 to 999,999,999
     * inclusive. This field may be limited in precision depending on context.
     */
    nanos?: number;
  }
  export interface v1OwnerReference {
    /**
     * API version of the referent.
     */
    apiVersion?: string;
    kind?: string;
    name?: string;
    uid?: string;
    controller?: boolean;
    blockOwnerDeletion?: boolean;
  }
  export interface v1ObjectMeta {
    name?: string;
    /**
     * GenerateName is an optional prefix, used by the server, to generate a unique
     * name ONLY IF the Name field has not been provided.
     * If this field is used, the name returned to the client will be different
     * than the name passed. This value will also be combined with a unique suffix.
     * The provided value has the same validation rules as the Name field,
     * and may be truncated by the length of the suffix required to make the value
     * unique on the server.
     *
     * If this field is specified and the generated name exists, the server will
     * NOT return a 409 - instead, it will either return 201 Created or 500 with Reason
     * ServerTimeout indicating a unique name could not be found in the time allotted, and the client
     * should retry (optionally after the time indicated in the Retry-After header).
     *
     * Applied only if Name is not specified.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency
     * +optional
     */
    generateName?: string;
    /**
     * Namespace defines the space within which each name must be unique. An empty namespace is
     * equivalent to the "default" namespace, but "default" is the canonical representation.
     * Not all objects are required to be scoped to a namespace - the value of this field for
     * those objects will be empty.
     *
     * Must be a DNS_LABEL.
     * Cannot be updated.
     * More info: http://kubernetes.io/docs/user-guide/namespaces
     * +optional
     */
    namespace?: string;
    /**
     * SelfLink is a URL representing this object.
     * Populated by the system.
     * Read-only.
     *
     * DEPRECATED
     * Kubernetes will stop propagating this field in 1.20 release and the field is planned
     * to be removed in 1.21 release.
     * +optional
     */
    selfLink?: string;
    /**
     * UID is the unique in time and space value for this object. It is typically generated by
     * the server on successful creation of a resource and is not allowed to change on PUT
     * operations.
     *
     * Populated by the system.
     * Read-only.
     * More info: http://kubernetes.io/docs/user-guide/identifiers#uids
     * +optional
     */
    uid?: string;
    /**
     * An opaque value that represents the internal version of this object that can
     * be used by clients to determine when objects have changed. May be used for optimistic
     * concurrency, change detection, and the watch operation on a resource or set of resources.
     * Clients must treat these values as opaque and passed unmodified back to the server.
     * They may only be valid for a particular resource or set of resources.
     *
     * Populated by the system.
     * Read-only.
     * Value must be treated as opaque by clients and .
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
     * +optional
     */
    resourceVersion?: string;
    generation?: string;
    /**
     * CreationTimestamp is a timestamp representing the server time when this object was
     * created. It is not guaranteed to be set in happens-before order across separate operations.
     * Clients may not set this value. It is represented in RFC3339 form and is in UTC.
     *
     * Populated by the system.
     * Read-only.
     * Null for lists.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     * +optional
     */
    creationTimestamp?: string;
    /**
     * DeletionTimestamp is RFC 3339 date and time at which this resource will be deleted. This
     * field is set by the server when a graceful deletion is requested by the user, and is not
     * directly settable by a client. The resource is expected to be deleted (no longer visible
     * from resource lists, and not reachable by name) after the time in this field, once the
     * finalizers list is empty. As long as the finalizers list contains items, deletion is blocked.
     * Once the deletionTimestamp is set, this value may not be unset or be set further into the
     * future, although it may be shortened or the resource may be deleted prior to this time.
     * For example, a user may request that a pod is deleted in 30 seconds. The Kubelet will react
     * by sending a graceful termination signal to the containers in the pod. After that 30 seconds,
     * the Kubelet will send a hard termination signal (SIGKILL) to the container and after cleanup,
     * remove the pod from the API. In the presence of network partitions, this object may still
     * exist after this timestamp, until an administrator or automated process can determine the
     * resource is fully terminated.
     * If not set, graceful deletion of the object has not been requested.
     *
     * Populated by the system when a graceful deletion is requested.
     * Read-only.
     * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
     * +optional
     */
    deletionTimestamp?: string;
    deletionGracePeriodSeconds?: string;
    labels?: object;
    annotations?: object;
    ownerReferences?: v1OwnerReference[];
    finalizers?: string[];
    clusterName?: string;
    /**
     * ManagedFields maps workflow-id and version to the set of fields
     * that are managed by that workflow. This is mostly for internal
     * housekeeping, and users typically shouldn't need to set or
     * understand this field. A workflow can be the user's name, a
     * controller's name, or the name of a specific apply path like
     * "ci-cd". The set of fields is always in the version that the
     * workflow used when modifying the object.
     *
     * +optional
     */
    managedFields?: v1ManagedFieldsEntry[];
  }
  export interface v1MicroTime {
    /**
     * Represents seconds of UTC time since Unix epoch
     * 1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     * 9999-12-31T23:59:59Z inclusive.
     */
    seconds?: string;
    /**
     * Non-negative fractions of a second at nanosecond resolution. Negative
     * second values with fractions must still have non-negative nanos values
     * that count forward in time. Must be from 0 to 999,999,999
     * inclusive. This field may be limited in precision depending on context.
     */
    nanos?: number;
  }
  export interface v1ManagedFieldsEntry {
    /**
     * Manager is an identifier of the workflow managing these fields.
     */
    manager?: string;
    /**
     * Operation is the type of operation which lead to this ManagedFieldsEntry being created.
     * The only valid values for this field are 'Apply' and 'Update'.
     */
    operation?: string;
    /**
     * APIVersion defines the version of this resource that this field set
     * applies to. The format is "group/version" just like the top-level
     * APIVersion field. It is necessary to track the version of a field
     * set because it cannot be automatically converted.
     */
    apiVersion?: string;
    time?: string;
    fieldsType?: string;
    fieldsV1?: v1FieldsV1;
  }
  export interface v1FieldsV1 {
    /**
     * Raw is the underlying serialization of this object.
     */
    Raw?: string;
  }
  export interface v1alpha1UISessionStatus {
    /**
     * FeatureFlags reports a list of experimental features that have been
     * enabled.
     */
    featureFlags?: v1alpha1UIFeatureFlag[];
    /**
     * NeedsAnalyticsNudge reports whether the UI hasn't opted in or out
     * of analytics, and the UI should nudge them to do so.
     */
    needsAnalyticsNudge?: boolean;
    /**
     * RunningTiltBuild reports the currently running version of tilt
     * that this UI is talking to.
     */
    runningTiltBuild?: corev1alpha1TiltBuild;
    /**
     * SuggestedTiltVersion tells the UI the recommended version for this
     * user. If the version is different than what's running, the UI
     * may display a prompt to upgrade.
     */
    suggestedTiltVersion?: string;
    /**
     * VersionSettings indicates whether version updates have been enabled/disabled
     * from the Tiltfile.
     */
    versionSettings?: corev1alpha1VersionSettings;
    /**
     * TiltCloudUsername reports the username if the user is signed into
     * TiltCloud.
     */
    tiltCloudUsername?: string;
    /**
     * TiltCloudUsername reports the human-readable team name if the user is
     * signed into TiltCloud and the Tiltfile declares a team.
     */
    tiltCloudTeamName?: string;
    tiltCloudSchemeHost?: string;
    /**
     * TiltCloudTeamID reports the unique team id if the user is signed into
     * TiltCloud and the Tiltfile declares a team.
     */
    tiltCloudTeamID?: string;
    /**
     * A FatalError is an error that forces Tilt to stop its control loop.
     * The API server will stay up and continue to serve the UI, but
     * no further builds will happen.
     */
    fatalError?: string;
    /**
     * The time that this instance of tilt started.
     * Clients can use this to determine if the API server has restarted
     * and all the objects need to be refreshed.
     */
    tiltStartTime?: string;
    /**
     * An identifier for the Tiltfile that is running.
     * Clients can use this to store data associated with a particular
     * project in LocalStorage or other persistent storage.
     */
    tiltfileKey?: string;
  }
  export interface v1alpha1UISessionSpec {}
  export interface v1alpha1UISession {
    metadata?: v1ObjectMeta;
    spec?: v1alpha1UISessionSpec;
    status?: v1alpha1UISessionStatus;
  }
  export interface v1alpha1UIResourceTargetSpec {
    /**
     * The ID of the target.
     */
    id?: string;
    /**
     * The type of the target.
     */
    type?: string;
    /**
     * Whether the target has a live update assocated with it.
     */
    hasLiveUpdate?: boolean;
  }
  export interface v1alpha1UIResourceStatus {
    /**
     * The last time this resource was deployed.
     */
    lastDeployTime?: string;
    triggerMode?: number;
    /**
     * Past completed builds.
     */
    buildHistory?: v1alpha1UIBuildTerminated[];
    /**
     * The currently running build, if any.
     */
    currentBuild?: v1alpha1UIBuildRunning;
    /**
     * When the build was put in the pending queue.
     */
    pendingBuildSince?: string;
    /**
     * True if the build was put in the pending queue due to file changes.
     */
    hasPendingChanges?: boolean;
    /**
     * Links attached to this resource.
     */
    endpointLinks?: v1alpha1UIResourceLink[];
    /**
     * Extra data about Kubernetes resources.
     */
    k8sResourceInfo?: v1alpha1UIResourceKubernetes;
    localResourceInfo?: v1alpha1UIResourceLocal;
    /**
     * The RuntimeStatus is a simple, high-level summary of the runtime state of a server.
     *
     * Not all resources run servers.
     */
    runtimeStatus?: string;
    /**
     * The UpdateStatus is a simple, high-level summary of any update tasks to bring
     * the resource up-to-date.
     *
     * If the resource runs a server, this may include both build tasks and live-update
     * syncing.
     */
    updateStatus?: string;
    /**
     * Information about all the target specs that this resource summarizes.
     */
    specs?: v1alpha1UIResourceTargetSpec[];
    /**
     * Queued is a simple indicator of whether the resource is queued for an update.
     */
    queued?: boolean;
  }
  export interface v1alpha1UIResourceSpec {}
  export interface v1alpha1UIResourceLocal {
    /**
     * The PID of the actively running local command.
     */
    pid?: string;
    /**
     * Whether this represents a test job.
     */
    isTest?: boolean;
  }
  export interface v1alpha1UIResourceLink {
    /**
     * A URL to link to.
     */
    url?: string;
    /**
     * The display label on a URL.
     */
    name?: string;
  }
  export interface v1alpha1UIResourceKubernetes {
    /**
     * The name of the active pod.
     *
     * The active pod tends to be what Tilt defaults to for port-forwards,
     * live-updates, etc.
     */
    podName?: string;
    /**
     * The creation time of the active pod.
     */
    podCreationTime?: string;
    podUpdateStartTime?: string;
    /**
     * The status of the active pod.
     */
    podStatus?: string;
    /**
     * Extra error messaging around the current status of the active pod.
     */
    podStatusMessage?: string;
    /**
     * Whether all the containers in the pod are currently healthy
     * and have passed readiness checks.
     */
    allContainersReady?: boolean;
    /**
     * The number of pod restarts.
     */
    podRestarts?: number;
    /**
     * The span where this pod stores its logs in the Tilt logstore.
     */
    spanID?: string;
    /**
     * The list of all resources deployed in the Kubernetes deploy
     * for this resource.
     */
    displayNames?: string[];
  }
  export interface v1alpha1UIResource {
    metadata?: v1ObjectMeta;
    spec?: v1alpha1UIResourceSpec;
    status?: v1alpha1UIResourceStatus;
  }
  export interface v1alpha1UIFeatureFlag {
    /**
     * The name of the flag.
     */
    name?: string;
    /**
     * The value of the flag.
     */
    value?: boolean;
  }
  export interface v1alpha1UIBuildTerminated {
    /**
     * A non-empty string if the build failed with an error.
     */
    error?: string;
    /**
     * A list of warnings encountered while running the build.
     * These warnings will also be printed to the build's log.
     */
    warnings?: string[];
    /**
     * The time when the build started.
     */
    startTime?: string;
    /**
     * The time when the build finished.
     */
    finishTime?: string;
    /**
     * The log span where the build logs are stored in the logstore.
     */
    spanID?: string;
    /**
     * A crash rebuild happens when Tilt live-updated a container, then
     * the pod crashed, wiping out the live-updates. Tilt does a full
     * build+deploy to reset the pod state to what's on disk.
     */
    isCrashRebuild?: boolean;
  }
  export interface v1alpha1UIBuildRunning {
    /**
     * The time when the build started.
     */
    startTime?: string;
    /**
     * The log span where the build logs are stored in the logstore.
     */
    spanID?: string;
  }
  export interface corev1alpha1VersionSettings {
    /**
     * Whether version updates have been enabled/disabled from the Tiltfile.
     */
    checkUpdates?: boolean;
  }
  export interface corev1alpha1TiltBuild {
    /**
     * A semantic version string.
     */
    version?: string;
    /**
     * The Git digest of the commit this binary was built at.
     */
    commitSHA?: string;
    /**
     * A human-readable string representing when the binary was built.
     */
    date?: string;
    /**
     * Indicates whether this is a development build (true) or an official release (false).
     */
    dev?: boolean;
  }
}
