import API from "@/lib/axios-client"

export const getPracticeAreasFn = async () => {
    const response = await API.get(`/public/practice-areas`);
    return response?.data || [];
};