import { createResourceApi } from "./resourceApi";

const bookingReceiptsApi = createResourceApi("booking-receipts", "booking receipts");

export const getBookingReceipts = bookingReceiptsApi.list;
export const getBookingReceipt = bookingReceiptsApi.get;
export const createBookingReceipt = bookingReceiptsApi.create;
export const updateBookingReceipt = bookingReceiptsApi.update;
export const deleteBookingReceipt = bookingReceiptsApi.remove;
