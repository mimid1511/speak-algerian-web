import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetail } from "@/api/auth";

// Créer le contexte utilisateur
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async (user) => {
      try {
        const userDetail = await getUserDetail(user.uid);
        setUserDetail(userDetail);
      } catch (error) {
        console.error('Erreur:', error.message);
      } finally {
        setUserLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserDetails(user);
      } else {
        setUser(null);
        setUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, userDetail, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};