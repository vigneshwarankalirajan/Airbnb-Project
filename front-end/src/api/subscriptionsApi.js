import { createResourceApi } from "./resourceApi";

const subscriptionsApi = createResourceApi("subscriptions", "subscriptions");

export const getSubscriptions = subscriptionsApi.list;
export const getSubscription = subscriptionsApi.get;
export const createSubscription = subscriptionsApi.create;
export const updateSubscription = subscriptionsApi.update;
export const deleteSubscription = subscriptionsApi.remove;
