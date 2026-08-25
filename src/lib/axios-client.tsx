import axios, { InternalAxiosRequestConfig } from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API,
    timeout: 0,
})

// ✅ Use request interceptor to dynamically inject token every time
API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("user-auth-beasiswa");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // ❌ Don't override multipart/form-data
        if (
            !(config.data instanceof FormData) &&
            !config.headers["Content-Type"]
        ) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);


API.interceptors.response.use(
    (response) => response,
    (error) => {
        const { data, status } = error.response || {}

        console.error('Axios error:', {
            message: error.message,
            code: error.code,
            config: error.config,
            response: error.response,
        })

        return Promise.reject(data)
    }
)

export default API


// import useDialogSessionStore from '@/stores/session-store'
// import useDialogUnauthorizedStore from '@/stores/unauthorized-store'
// import axios, { InternalAxiosRequestConfig } from 'axios'


// const token = localStorage.getItem("user-auth-ems");

// const options = {
//     baseURL: import.meta.env.VITE_PUBLIC_API,
//     timeout: 0,
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// }

// const API = axios.create(options)

// API.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const token = localStorage.getItem("user-auth-pass");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         if (!config.headers['Content-Type']) {
//             config.headers['Content-Type'] = 'application/json';
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


// API.interceptors.response.use((response) => {
//     return response
// },
//     (error) => {
//         const { data, status } = error.response

//         console.error('Axios error:', {
//             message: error.message,
//             code: error.code,
//             config: error.config,
//             response: error.response,
//         });


//         if (status === 401) {
//             const showDialog = useDialogUnauthorizedStore.getState().showDialogUnauthorized
//             showDialog()
//         } else if (status === 403) {
//             const showDialog = useDialogSessionStore.getState().showDialog
//             showDialog()
//         }


//         return Promise.reject({
//             ...data
//         })
//     }
// )

// export default API;