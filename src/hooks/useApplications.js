import { useQuery } from "@tanstack/react-query";
import { getAllApplications } from "../services/applicationService";


export const useApplications = () => {
    return useQuery({
        queryKey: ["applications"],
        queryFn: getAllApplications,
        staleTime: 1000 * 60 * 10,
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });
};


export default useApplications; 