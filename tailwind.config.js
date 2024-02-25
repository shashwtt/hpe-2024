/** @type {import('tailwindcss').Config} */


module.exports = {
  // darkMode: 'class',
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
      fontFamily: {
        satoshi: ['var(--font-satoshi)'],
        magh: ['var(--font-magh)'],
      },
      colors: {
        'black': '#0c0c0e',
        'dark': '#222224',
        'light': '#dbdbd1',
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '100rem',
      },
    },
	},
	plugins: [],
};
