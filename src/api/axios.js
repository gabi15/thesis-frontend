import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8087',
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    async function async(config) {
        console.log(config.url)
        if (config.url !== "/users/signIn" && config.url !== "/users/register") {
            let token = sessionStorage.getItem('token');
            if (!token) {
                console.log("You are not logged in");
                alert("You are not logged in");
                return {
                    ...config,
                    signal: AbortSignal.abort()
                };
            }
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("response");
        console.log(response);
        return response;
    },
    error => {
        console.log("error");
        console.log(error);
        if (error.response === undefined) {
            alert("AAA");
            return;
        } else if (error.response.status === 400) {
            console.log("bad request");
            alert(error.response.data);
        } else if (error.response.status === 401) {
            console.log("You are not logged in");
            alert("You are not logged in");
        } else if (error?.response.status === 403) {
            alert("You are not authorized to perform this action");
        } else if (error?.response.status === 409) {
            alert("This username is already taken");
        } else if (error?.response.status >= 500) {
            alert("Server error");
        }
        // return Promise.reject(error);
    }
);


export default axiosInstance;



