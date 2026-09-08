import { createResourceApi } from "./resourceApi";

const discountOffersApi = createResourceApi("discount-offers", "discount offers");

export const getDiscountOffers = discountOffersApi.list;
export const getDiscountOffer = discountOffersApi.get;
export const createDiscountOffer = discountOffersApi.create;
export const updateDiscountOffer = discountOffersApi.update;
export const deleteDiscountOffer = discountOffersApi.remove;
