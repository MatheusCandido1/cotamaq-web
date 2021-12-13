module.exports = {
    purge: [],
    theme: {
        fontSize: {
            'xs': '.85rem',
            'sm': '.975rem',
            'tiny': '.975rem',
            'base': '1.1rem',
            'lg': '1.225rem',
            'xl': '1.35rem',
            '2xl': '1.6rem',
            '3xl': '1.975rem',
            '4xl': '2.35rem',
            '5xl': '3.1rem',
            '6xl': '4.1rem',
            '7xl': '5.1rem'
          },
        extend: {
            colors: {
                primary: {
                    'main': '#2BCB6F',
                    'darker': '#429959',
                    'lighter': '#2ECC71',
                },
                secondary: {
                    'main': '#6f2bcb'
                },
                orange: {
                    '100': '#fffaf0',
                    '200': '#feebc8',
                    '300': '#fbd38d',
                    '400': '#f6ad55',
                    '500': '#ed8936',
                    '600': '#dd6b20',
                    '700': '#c05621',
                    '800': '#9c4221',
                    '900': '#7b341e',
                },
                gray: {
                    '100': '#F7FAFC',
                    '200': '#EDF2F7',
                    '300': '#E2E8F0',
                    '400': '#CBD5E0',
                    '500': '#A0AEC0',
                    '600': '#718096',
                    '700': '#4A5568',
                    '800': '#2D3748',
                    '900': '#1A202C',
                    '1000': '#0d1119',
                },
            },
            spacing: {
                1.5: '0.313rem',
                1.6: '0.375em',
                2.5: '0.625rem',
                7: '1.875rem',
                13: '3.125rem',
                14: '3.370rem',
                15: '3.750rem',
            },
        },
    },
    variants: {
        borderWidth: ['responsive', 'last', 'hover', 'focus'],
        width: ['responsive', 'hover', 'focus'],
        height: ['responsive', 'hover', 'focus'],
    },
    plugins: [],
};
