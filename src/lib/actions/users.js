import { authClient } from "../auth-client";

export const updateUserRole = async (userId, newRole) => {
  const { data, error } = await authClient.admin.setRole({
    userId: userId,
    role: newRole, // required
  });
  return { data, error };
};

export const markUserAsFraud = async (userId, isFraud) => {
  const { data, error } = await authClient.admin.updateUser({
    userId: userId,
    data: { isFraud: isFraud }, // required
  });
  return { data, error };
};
