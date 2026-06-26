import { authClient } from "../auth-client";

// session for client side
export const useSession = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  return { session, isPending, error, refetch };
};

export const googleSignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
};

export const signOut = () => {
  return authClient.signOut();
};
