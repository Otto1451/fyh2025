import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState(undefined);  // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // null if logged out, object if logged in
    });

    return unsub;
  }, []);

  return user;
}
