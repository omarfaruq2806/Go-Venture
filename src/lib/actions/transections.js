import { serverMutation } from "../core/server";

export const saveTransection = async (transectionData) => {
  return serverMutation("/api/transections", transectionData, "POST");
};
