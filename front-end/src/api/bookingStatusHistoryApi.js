import { createResourceApi } from "./resourceApi";

const bookingStatusHistoryApi = createResourceApi(
	"booking-status-history",
	"booking status history"
);

export const getBookingStatusHistory = bookingStatusHistoryApi.list;
export const getBookingStatusHistoryEntry = bookingStatusHistoryApi.get;
export const createBookingStatusHistory = bookingStatusHistoryApi.create;
export const updateBookingStatusHistory = bookingStatusHistoryApi.update;
export const deleteBookingStatusHistory = bookingStatusHistoryApi.remove;
