import { createResourceApi } from "./resourceApi";

const cancellationPoliciesApi = createResourceApi(
	"cancellation-policies",
	"cancellation policies"
);

export const getCancellationPolicies = cancellationPoliciesApi.list;
export const getCancellationPolicy = cancellationPoliciesApi.get;
export const createCancellationPolicy = cancellationPoliciesApi.create;
export const updateCancellationPolicy = cancellationPoliciesApi.update;
export const deleteCancellationPolicy = cancellationPoliciesApi.remove;
