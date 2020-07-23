module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'profile-user',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'User profile app' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    telemetry: false,
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    styleResources: {
        sass: [
            '~/assets/smart-grid.sass', // путь к вашему файлу
        ],
    },
    plugins: [
        '~plugins/axios.js',
    ],
    /*
     ** Build configuration
     */
    buildModules: [
        '@nuxtjs/vuetify'
    ],
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios'
    ],
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}