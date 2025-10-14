import { useQuery } from "@tanstack/react-query";
import { getApplicationStatistics } from "../services/applicationService";

export const useApplicationStats = () => {
    return useQuery({
        queryKey: ["applicationStats"],
        queryFn: getApplicationStatistics,
        staleTime: 1000 * 60 * 5, // 2 minutes
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true, // Allow refetch on mount
    });
};

export default useApplicationStats;
