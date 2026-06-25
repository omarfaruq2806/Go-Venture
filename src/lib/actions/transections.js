import { serverMutation } from "../core/mutation";

export const saveTransection = async (transectionData) => {
  return serverMutation("/api/transections", transectionData, "POST");
};
