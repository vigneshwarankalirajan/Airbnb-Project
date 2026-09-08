import { createResourceApi } from "./resourceApi";

const bookingGuestsApi = createResourceApi("booking-guests", "booking guests");

export const getBookingGuests = bookingGuestsApi.list;
export const getBookingGuest = bookingGuestsApi.get;
export const createBookingGuest = bookingGuestsApi.create;
export const updateBookingGuest = bookingGuestsApi.update;
export const deleteBookingGuest = bookingGuestsApi.remove;
