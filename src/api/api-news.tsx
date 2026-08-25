import { dummyNews } from "@/data/News";
import API from "@/lib/axios-client"

export const getNewsFn = async (
    limit: number,
    page: number,
    category: string,
    subCategory: string,
    search: string
) => {
    // const response = await API.get(`/public/news`, {
    //     params: {
    //         limit,
    //         page,
    //         category,
    //         subCategory,
    //         search
    //     },
    // });

    // return response?.data || {}
    // if (response?.data) {
    //     return response.data;
    // }

    /**
     * Fallback dummy
     */
    return {
        data: dummyNews,
        meta_data: {
            page,
            limit,
            totalRows:
                dummyNews.length,
            totalPage: Math.ceil(
                dummyNews.length / limit,
            ),
        },
    };
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
