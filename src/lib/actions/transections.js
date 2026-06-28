import { serverMutation } from "../core/mutation";

export const saveTransection = async (transectionData) => {
  return await serverMutation("/api/transections", transectionData, "POST");
};
