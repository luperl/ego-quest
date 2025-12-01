"use client";
import { createContext, useState } from "react";

export interface ILoading {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const LoadingContext = createContext<ILoading | undefined>(undefined);

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const value: ILoading = {
    isLoading,
    setIsLoading,
  };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
