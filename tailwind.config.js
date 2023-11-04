/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mainBg: "#0D1117",
				colBg: "#161C22",
			},
		},
	},
	plugins: [],
};
