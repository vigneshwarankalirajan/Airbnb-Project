import { createResourceApi } from "./resourceApi";

const bookingRulesApi = createResourceApi("booking-rules", "booking rules");

export const getBookingRules = bookingRulesApi.list;
export const getBookingRule = bookingRulesApi.get;
export const createBookingRule = bookingRulesApi.create;
export const updateBookingRule = bookingRulesApi.update;
export const deleteBookingRule = bookingRulesApi.remove;
