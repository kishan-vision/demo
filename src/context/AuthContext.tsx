"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth";
import type { DecodedToken } from "@/types/auth";

interface AuthContextType {
  user: DecodedToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Setup SSO listener
    AuthService.setupSSO();

    // Check for existing valid session (e.g., from page refresh)
    const existingUser = AuthService.getUser();
    if (existingUser && existingUser.exp * 1000 > Date.now()) {
      setUser(existingUser);
    }

    // Set timeout for waiting for token
    const timeoutDuration = 5000;

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, timeoutDuration);

    // Listen for auth events
    const handleSSO = (event: CustomEvent<DecodedToken>) => {
      setUser(event.detail);
      setIsLoading(false);
      clearTimeout(timeout);
    };

    const handleAuthError = (event: CustomEvent) => {
      console.error("[Auth] SSO error:", event.detail);
      setIsLoading(false);
      clearTimeout(timeout);
    };

    const handleLogout = () => {
      setUser(null);
      setIsLoading(false);
      clearTimeout(timeout);
    };

    window.addEventListener("sso-authenticated", handleSSO as EventListener);
    window.addEventListener("sso-auth-error", handleAuthError as EventListener);
    window.addEventListener("sso-logout", handleLogout as EventListener);

    return () => {
      window.removeEventListener("sso-authenticated", handleSSO as EventListener);
      window.removeEventListener("sso-auth-error", handleAuthError as EventListener);
      window.removeEventListener("sso-logout", handleLogout as EventListener);
      clearTimeout(timeout);
    };
  }, []);

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Expose AuthService to window for development/testing
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).AuthService = AuthService;
}
