import { createResourceApi } from "./resourceApi";

const dynamicPricingRulesApi = createResourceApi(
	"dynamic-pricing-rules",
	"dynamic pricing rules"
);

export const getDynamicPricingRules = dynamicPricingRulesApi.list;
export const getDynamicPricingRule = dynamicPricingRulesApi.get;
export const createDynamicPricingRule = dynamicPricingRulesApi.create;
export const updateDynamicPricingRule = dynamicPricingRulesApi.update;
export const deleteDynamicPricingRule = dynamicPricingRulesApi.remove;
