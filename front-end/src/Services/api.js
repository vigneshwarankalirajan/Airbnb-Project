const API_BASE_URL = "http://127.0.0.1:8000";


// =====================================================
// USERS
// =====================================================

// GET ALL USERS
export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};


// GET SINGLE USER
export const getUser = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};


// CREATE USER
export const createUser = async (userData) => {
  const response = await fetch(
    `${API_BASE_URL}/users/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to create user"
    );
  }

  return response.json();
};


// UPDATE USER
export const updateUser = async (
  userId,
  userData
) => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to update user"
    );
  }

  return response.json();
};


// DELETE USER
export const deleteUser = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to delete user"
    );
  }

  return response.json();
};



// =====================================================
// USER VERIFICATIONS
// =====================================================


// GET ALL VERIFICATIONS
export const getVerifications = async () => {
  const response = await fetch(
    `${API_BASE_URL}/user-verifications/`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch verifications"
    );
  }

  return response.json();
};


// GET SINGLE VERIFICATION
export const getVerification = async (
  verificationId
) => {
  const response = await fetch(
    `${API_BASE_URL}/user-verifications/${verificationId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch verification"
    );
  }

  return response.json();
};


// GET VERIFICATIONS BY USER
export const getUserVerifications = async (
  userId
) => {
  const response = await fetch(
    `${API_BASE_URL}/user-verifications/user/${userId}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch user verifications"
    );
  }

  return response.json();
};


// CREATE VERIFICATION
export const createVerification = async (
  verificationData
) => {
  const response = await fetch(
    `${API_BASE_URL}/user-verifications/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
        "Failed to create verification"
    );
  }

  return response.json();
};


// UPDATE VERIFICATION
export const updateVerification = async (
  verificationId,
  verificationData
) => {
  const response = await fetch(
    `${API_BASE_URL}/user-verifications/${verificationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(verificationData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
        "Failed to update verification"
    );
  }

  return response.json();
};


// DELETE VERIFICATION
export const deleteVerification = async (
  verificationId
) => {
  const response = await fetch(
    `${API_BASE_URL}/user-verifications/${verificationId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
        "Failed to delete verification"
    );
  }

  return response.json();
};
// =====================================================
// USER PREFERENCES
// =====================================================

// GET ALL PREFERENCES
export const getPreferences = async () => {
  const response = await fetch(
    `${API_BASE_URL}/user-preferences/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch preferences");
  }

  return response.json();
};


// GET SINGLE PREFERENCE
export const getPreference = async (preferenceId) => {
  const response = await fetch(
    `${API_BASE_URL}/user-preferences/${preferenceId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch preference"
    );
  }

  return response.json();
};


// GET PREFERENCES BY USER
export const getUserPreferences = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/user-preferences/user/${userId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch user preferences"
    );
  }

  return response.json();
};


// CREATE PREFERENCE
export const createPreference = async (preferenceData) => {
  const response = await fetch(
    `${API_BASE_URL}/user-preferences/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to create preference"
    );
  }

  return response.json();
};


// UPDATE PREFERENCE
export const updatePreference = async (
  preferenceId,
  preferenceData
) => {
  const response = await fetch(
    `${API_BASE_URL}/user-preferences/${preferenceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to update preference"
    );
  }

  return response.json();
};


// DELETE PREFERENCE
export const deletePreference = async (preferenceId) => {
  const response = await fetch(
    `${API_BASE_URL}/user-preferences/${preferenceId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to delete preference"
    );
  }

  return response.json();
};
// =====================================================
// ADMIN USERS
// =====================================================

// GET ALL ADMIN USERS
export const getAdminUsers = async () => {
  const response = await fetch(
    `${API_BASE_URL}/admin-users/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin users");
  }

  return response.json();
};


// GET SINGLE ADMIN USER
export const getAdminUser = async (adminId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin-users/${adminId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch admin user"
    );
  }

  return response.json();
};


// GET ADMIN USERS BY USER
export const getAdminUsersByUser = async (userId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin-users/user/${userId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch admin users"
    );
  }

  return response.json();
};


// CREATE ADMIN USER
export const createAdminUser = async (adminData) => {
  const response = await fetch(
    `${API_BASE_URL}/admin-users/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to create admin user"
    );
  }

  return response.json();
};


// UPDATE ADMIN USER
export const updateAdminUser = async (
  adminId,
  adminData
) => {
  const response = await fetch(
    `${API_BASE_URL}/admin-users/${adminId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to update admin user"
    );
  }

  return response.json();
};


// DELETE ADMIN USER
export const deleteAdminUser = async (adminId) => {
  const response = await fetch(
    `${API_BASE_URL}/admin-users/${adminId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to delete admin user"
    );
  }

  return response.json();
};
// =====================================================
// ROLES
// =====================================================

// GET ALL ROLES
export const getRoles = async () => {
  const response = await fetch(
    `${API_BASE_URL}/roles/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  return response.json();
};


// GET SINGLE ROLE
export const getRole = async (roleId) => {
  const response = await fetch(
    `${API_BASE_URL}/roles/${roleId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch role"
    );
  }

  return response.json();
};


// CREATE ROLE
export const createRole = async (roleData) => {
  const response = await fetch(
    `${API_BASE_URL}/roles/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to create role"
    );
  }

  return response.json();
};


// UPDATE ROLE
export const updateRole = async (
  roleId,
  roleData
) => {
  const response = await fetch(
    `${API_BASE_URL}/roles/${roleId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to update role"
    );
  }

  return response.json();
};


// DELETE ROLE
export const deleteRole = async (roleId) => {
  const response = await fetch(
    `${API_BASE_URL}/roles/${roleId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to delete role"
    );
  }

  return response.json();
};
// =====================================================
// PERMISSIONS
// =====================================================

export const getPermissions = async () => {
  const response = await fetch(
    `${API_BASE_URL}/permissions/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch permissions");
  }

  return response.json();
};


export const getPermission = async (permissionId) => {
  const response = await fetch(
    `${API_BASE_URL}/permissions/${permissionId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch permission"
    );
  }

  return response.json();
};


export const createPermission = async (permissionData) => {
  const response = await fetch(
    `${API_BASE_URL}/permissions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissionData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to create permission"
    );
  }

  return response.json();
};


export const updatePermission = async (
  permissionId,
  permissionData
) => {
  const response = await fetch(
    `${API_BASE_URL}/permissions/${permissionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissionData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to update permission"
    );
  }

  return response.json();
};


export const deletePermission = async (permissionId) => {
  const response = await fetch(
    `${API_BASE_URL}/permissions/${permissionId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to delete permission"
    );
  }

  return response.json();
};



// =====================================================
// ROLE PERMISSIONS
// =====================================================

export const getRolePermissions = async () => {
  const response = await fetch(
    `${API_BASE_URL}/role-permissions/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch role permissions");
  }

  return response.json();
};


export const getRolePermission = async (
  rolePermissionId
) => {
  const response = await fetch(
    `${API_BASE_URL}/role-permissions/${rolePermissionId}`
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Failed to fetch role permission"
    );
  }

  return response.json();
};


export const createRolePermission = async (
  data
) => {
  const response = await fetch(
    `${API_BASE_URL}/role-permissions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
        "Failed to create role permission"
    );
  }

  return response.json();
};


export const updateRolePermission = async (
  rolePermissionId,
  data
) => {
  const response = await fetch(
    `${API_BASE_URL}/role-permissions/${rolePermissionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
        "Failed to update role permission"
    );
  }

  return response.json();
};


export const deleteRolePermission = async (
  rolePermissionId
) => {
  const response = await fetch(
    `${API_BASE_URL}/role-permissions/${rolePermissionId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
        "Failed to delete role permission"
    );
  }
// =====================================================
// properties
// =====================================================
  return response.json();
};
export const getProperties = async () => {
  const response = await fetch(`${API_URL}/properties/`);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
};

export const getProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`);

  if (!response.ok) {
    throw new Error("Property not found");
  }

  return response.json();
};

export const createProperty = async (propertyData) => {
  const response = await fetch(`${API_URL}/properties/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    throw new Error("Failed to create property");
  }

  return response.json();
};

export const updateProperty = async (id, propertyData) => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    throw new Error("Failed to update property");
  }

  return response.json();
};

export const deleteProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete property");
  }

  return response.json();
};
// =====================================================
// property images
// =====================================================

export const getPropertyImages = async () => {
  const response = await fetch(`${API_URL}/property-images/`);

  if (!response.ok) {
    throw new Error("Failed to fetch property images");
  }

  return response.json();
};

export const getPropertyImage = async (id) => {
  const response = await fetch(`${API_URL}/property-images/${id}`);

  if (!response.ok) {
    throw new Error("Property image not found");
  }

  return response.json();
};

export const createPropertyImage = async (imageData) => {
  const response = await fetch(`${API_URL}/property-images/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageData),
  });

  if (!response.ok) {
    throw new Error("Failed to create property image");
  }

  return response.json();
};

export const updatePropertyImage = async (id, imageData) => {
  const response = await fetch(`${API_URL}/property-images/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageData),
  });

  if (!response.ok) {
    throw new Error("Failed to update property image");
  }

  return response.json();
};

export const deletePropertyImage = async (id) => {
  const response = await fetch(`${API_URL}/property-images/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete property image");
  }

  return response.json();
};
// =====================================================
// AUTHENTICATION
// =====================================================

// REGISTER
export const registerUser = async (userData) => {
  const response = await fetch(
    `${API_BASE_URL}/users/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Registration failed"
    );
  }

  return response.json();
};


/// LOGIN

export const loginUser = async (loginData) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail || "Login failed"
    );
  }

  return response.json();
}; 