import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        staleTime : 30_000,
        refetchOnWindowFocus : false,
        retry: (count, error: any) => {
            const status = error?.response?.status;

            if (!status) return count < 2;        // network error
            if (status >= 400 && status < 500) return false;
            return count < 2;                     // 5xx
        },
        },
    },
});
