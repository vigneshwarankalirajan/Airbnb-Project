import { createResourceApi } from "./resourceApi";

const rolePermissionsApi = createResourceApi(
	"role-permissions",
	"role permissions"
);

export const getRolePermissions = rolePermissionsApi.list;
export const getRolePermission = rolePermissionsApi.get;
export const createRolePermission = rolePermissionsApi.create;
export const updateRolePermission = rolePermissionsApi.update;
export const deleteRolePermission = rolePermissionsApi.remove;
