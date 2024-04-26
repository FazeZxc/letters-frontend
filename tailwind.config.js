/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './src/pages/*.jsx',
        './src/components/*.jsx',
        './src/store/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                'primary-accent': '#7AE058',
                'primary-black': '#131200',
                'primary-secondary': '#D6DBA9',
            },
            backgroundImage: {
                homepage: 'url("./src/assets/homepage.jpg")',
                loginpage: 'url("./src/assets/login.jpg")',
            },
        },
    },
    plugins: [require('daisyui')],
}
