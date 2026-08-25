import API from "@/lib/axios-client"

export const getTeamsFn = async ( 
    limit: number,
    page: number,
    search?: string
) => {
    const response = await API.get(`/public/teams`, {
        params: {
            limit,
            page,
            search
        },
    });
    return response?.data || [];
};

export const getDetailNewsFn = async (slug: string) => {
    const response = await API.get("/public/teams", {
        params: { slug },
    });
    return response.data || {};
};
