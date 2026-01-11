import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);
console.log("AuthModalContext mounted");
  return (
    <AuthModalContext.Provider value={{ showLogin, setShowLogin }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
