/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthContextProviderProps, AuthContextType, AuthUser } from "../types";
import toast from "react-hot-toast";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

const getStoredUser = (): AuthUser | null => {
    const expiry = localStorage.getItem("UN-expiry");
    const now = new Date().getTime();

    if (!expiry || now > parseInt(expiry)) {
        // Token Expired
        localStorage.removeItem("UN-user");
        localStorage.removeItem("UN-token");
        localStorage.removeItem("UN-expiry");
        return null;
    }

    const user = localStorage.getItem("UN-user");
    return user ? JSON.parse(user) : null;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(getStoredUser());

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};