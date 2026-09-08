import { createResourceApi } from "./resourceApi";

const listingStatusHistoryApi = createResourceApi(
	"listing-status-history",
	"listing status history"
);

export const getListingStatusHistory = listingStatusHistoryApi.list;
export const getListingStatusHistoryEntry = listingStatusHistoryApi.get;
export const createListingStatusHistory = listingStatusHistoryApi.create;
export const updateListingStatusHistory = listingStatusHistoryApi.update;
export const deleteListingStatusHistory = listingStatusHistoryApi.remove;
