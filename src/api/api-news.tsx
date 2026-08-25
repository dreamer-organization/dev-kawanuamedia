import API from "@/lib/axios-client"

export const getNewsFn = async ( 
    limit: number,
    page: number,
    search?: string
) => {
    const response = await API.get(`/public/news`, {
        params: {
            limit,
            page,
            search
        },
    });
    return response?.data || [];
};

export const getDetailNewsFn = async (slug: string) => {
    console.log("slug :", slug);

    // nanti ganti ini saat api ready
    const response = await API.get(`/public/news/${slug}`);
    return response.data || {};

    // simulasi loading API
    // await new Promise((resolve) => setTimeout(resolve, 1200));


    // if (slug !== newsDetail.data.slug) {
    //     throw new Error("Article not found");
    // }

    // return newsDetail.data;
};
