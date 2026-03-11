import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
})

api.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access_token")

    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,

    async (error) => {

        console.log("INTERCEPTOR ATIVADO")
        console.log("Status:", error.response?.status)

        const originalRequest = error.config || {}

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {

            originalRequest._retry = true

            try {

                const refreshToken = localStorage.getItem("refresh_token")

                if (!refreshToken) {
                    window.location.href = "/"
                    return
                }

                const response = await axios.post(
                    "http://127.0.0.1:8000/accounts/refresh/",
                    { refresh_token: refreshToken }
                )


                const newAccessToken = response.data.data.access_token
                const newRefreshToken = response.data.data.refresh_token

                localStorage.setItem("access_token", newAccessToken)
                localStorage.setItem("refresh_token", newRefreshToken)

                originalRequest.headers = originalRequest.headers || {}
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                return api(originalRequest)

            } catch (err) {
                console.log("Error refresh")

                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")

                window.location.href = "/"
            }
            
        } 

        return Promise.reject(error)
    }
)