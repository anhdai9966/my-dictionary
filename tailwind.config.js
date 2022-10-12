/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            animation: {
                visual: 'RefreshedLoadingBarProgress 2s linear infinite,LoadingBarEnter .5s ease-out forwards',
                spinner8: 'SpinnerSpin .8s steps(8) infinite;',
                spinner12: 'SpinnerSpin 1.2s steps(12) infinite;',
            },
            keyframes: {
                RefreshedLoadingBarProgress: {
                    '0%': { backgroundPosition: '125% 0' },
                    '100%': { backgroundPosition: '0% 0' },
                },
                LoadingBarEnter: {
                    '0%': { transform: 'scaleX(0)' },
                    '100%': { transform: 'scaleX(1)' },
                },
                SpinnerSpin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            backgroundImage: {
                visual: 'linear-gradient(to right, #ffd600, #ff7a00, #ff0169, #d300c5, #7638fa, #ffd600)',
            },
            fontFamily: {
                display: ['SF Pro Display', 'sans-serif'],
            },
            colors: {
                primary: '#007AFF',
            },
        },
    },
    plugins: [],
};
