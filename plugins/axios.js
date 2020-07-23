export default function({ $axios, redirect, store }) {
    // перехват запроса с помощью interceptors
    $axios.interceptors.request.use(request => {
            if (store.getters['modules/auth/isAuthenticated'] && !request.headers.common['Authorization']) {
                const token = store.getters['modules/auth/token']
                request.headers.common['Authorization'] = `Bearer ${token}`
            }
            return request
        })
        // обработка ошибок от axios
    $axios.onError(error => {
        if (error.response) {

            if (error.response.status === 401) {

                store.dispatch('modules/auth/logout')
                redirect('/login?message=login')

            } else if (error.response.status === 500) {

                console.error('Server 500 error')

            }
        }
    })
}