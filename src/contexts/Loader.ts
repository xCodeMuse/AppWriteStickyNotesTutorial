import { createContext } from "react";

export const LoaderContext = createContext<(status: boolean) => void>((status: boolean) => {});

export const LoaderProvider = LoaderContext.Provider;

export default LoaderContext;
