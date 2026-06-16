"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(id) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      const nextUser = await response.json();

      if (!nextUser.id) {
        setUser(null);
        setError("Please enter a user ID from 1 to 10.");
        return false;
      }

      setUser(nextUser);
      return true;
    } catch {
      setUser(null);
      setError("We could not log you in. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setError("");
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
