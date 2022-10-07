/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			M: "544px",
			// => @media (min-width: 640px) { ... }

			L: "768px",
			// => @media (min-width: 1024px) { ... }

			XL: "1012px",
			// => @media (min-width: 1280px) { ... }
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
