'use client';
import { queryClient } from "../../lib";
import { QueryClientProvider } from "@tanstack/react-query";

export const QueryClientProviderWrapper = ({children} : Readonly<{children:React.ReactElement}>) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}