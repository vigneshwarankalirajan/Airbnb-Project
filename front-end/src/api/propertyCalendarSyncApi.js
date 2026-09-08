import { createResourceApi } from "./resourceApi";

const propertyCalendarSyncApi = createResourceApi(
	"property-calendar-sync",
	"property calendar sync records"
);

export const getPropertyCalendarSyncs = propertyCalendarSyncApi.list;
export const getPropertyCalendarSync = propertyCalendarSyncApi.get;
export const createPropertyCalendarSync = propertyCalendarSyncApi.create;
export const updatePropertyCalendarSync = propertyCalendarSyncApi.update;
export const deletePropertyCalendarSync = propertyCalendarSyncApi.remove;
