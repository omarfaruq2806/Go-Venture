import { getSession } from "@/lib/session/server-session";
import React from "react";

const VendorProfile = async () => {
  const session = await getSession();
  return (
    <div>
      <h1>Vendor Profile</h1>
    </div>
  );
};

export default VendorProfile;
