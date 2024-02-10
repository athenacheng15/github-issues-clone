/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		screens: {
			M: "544px",
			// => @media (min-width: 544px) { ... }

			L: "768px",
			// => @media (min-width: 768px) { ... }

			XL: "1012px",
			// => @media (min-width: 1012px) { ... }
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
