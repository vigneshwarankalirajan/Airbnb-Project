import { createResourceApi } from "./resourceApi";

const userVerificationsApi = createResourceApi(
	"user-verifications",
	"user verifications"
);

export const getUserVerifications = userVerificationsApi.list;
export const getUserVerification = userVerificationsApi.get;
export const createUserVerification = userVerificationsApi.create;
export const updateUserVerification = userVerificationsApi.update;
export const deleteUserVerification = userVerificationsApi.remove;
