import { createResourceApi } from "./resourceApi";

const listingFeesApi = createResourceApi("listing-fees", "listing fees");

export const getListingFees = listingFeesApi.list;
export const getListingFee = listingFeesApi.get;
export const createListingFee = listingFeesApi.create;
export const updateListingFee = listingFeesApi.update;
export const deleteListingFee = listingFeesApi.remove;
