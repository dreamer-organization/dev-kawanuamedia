/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1600px',
				'h-mini': {
					raw: '(max-height: 700px)'
				}
			},
			colors: {
				// 'primary-kawanuamedia': '#071118',
				// 'secondary-kawanuamedia': '#101C29',
				'primary-kawanuamedia': '#08763E',
				'secondary-kawanuamedia': '#191C44',
				'gold-kawanuamedia': '#C9A35A',
				'secondary-gold-kawanuamedia': '#C6A15B',
				'dark-kawanuamedia': '#09121D',
				'gold-light-kawanuamedia': '#D8B97A',
				'primary-light-kawanuamedia': '#F5F0E6',
				'border-kawanuamedia': '#243445',
				// 'blue-kawanuamedia': '#1B91D0',
				'blue-kawanuamedia': '#201F53',
				'blue-secondary-kawanuamedia': '#04567B',
				'gray-kawanuamedia': '#5D6471',
				'secondary-gray-kawanuamedia': '#667085',
				'green-kawanuamedia': '#75C142',
				'orange-kawanuamedia': '#FF6347',
				'yellow-kawanuamedia': '#FBBB2B',
				'purple-kawanuamedia': '#7158D9',
				'navy-kawanuamedia': {
					50: "#E8E8F5",
					100: "#B9BAE0",
					200: "#8B8DCB",
					300: "#686BB9",
					400: "#4A4DA3",
					500: "#35388A",
					600: "#292B6B",
					700: "#202253",
					800: "#101126",
					900: "#0A0B1C",
					'dark': "#0B0C1D",
					'light': '##F7F7FB',
					DEFAULT: "#17183A",
				},
				"emerald-kawanuamedia": {
					50: "#E8F5EE",
					100: "#C5E6D3",
					200: "#9FD6B8",
					300: "#76C39A",
					400: "#4EAD7D",
					500: "#2D9662",
					600: "#08763E",
					700: "#066032",
					800: "#044B27",
					900: "#03381D",

					DEFAULT: "#08763E",
					dark: "#032A16",
					light: "#F4FAF7",
				},
				"maron-kawanuamedia": {
					50: "#FCE9E8",
					100: "#F8C7C5",
					200: "#F3A19E",
					300: "#EC7773",
					400: "#E04C47",
					500: "#CE2F29",
					600: "#B6160F",
					700: "#920F0A",
					800: "#700B07",
					900: "#4D0705",

					DEFAULT: "#B6160F",
					dark: "#3A0503",
					light: "#FFF6F5",
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: '#d1d5db',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				"basic-gold-metallic-kawanuamedia": "linear-gradient( 135deg, #76501F 0%, #B88732 18%, #D4A144 35%, #F5E8C8 50%, #D4A144 65%, #B88732 82%, #76501F 100%)",
				"premium-gold-metallic-kawanuamedia": "linear-gradient(110deg, #76501F 0%, #B88732 20%, #D4A144 38%, #F5E8C8 50%, #DDB05A 62%, #B88732 80%, #76501F 100%)",
				"gold-metallic": "linear-gradient(110deg, #76501F 0%, #B88732 20%, #D4A144 38%, #F5E8C8 50%, #DDB05A 62%, #B88732 80%, #76501F 100%)",

				"basic-black-metallic-kawanuamedia": "linear-gradient(135deg, #0A0A0A 0%, #2B2B2B 18%, #5A5A5A 35%, #D6D6D6 50%, #5A5A5A 65%, #2B2B2B 82%, #0A0A0A 100%)",
				"premium-silver-metallic-kawanuamedia": "linear-gradient(110deg, #080808 0%, #1F1F1F 12%, #555555 25%, #A8A8A8 38%, #F2F2F2 50%, #A8A8A8 62%, #555555 75%, #1F1F1F 88%, #080808 100%)",
				"steel-metallic-kawanuamedia": "linear-gradient(110deg, #111111 0%, #303030 15%, #686868 30%, #BDBDBD 42%, #E8E8E8 50%, #BDBDBD 58%, #686868 70%, #303030 85%, #111111 100%)",
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// dialogIn: {
				// 	"0%": {
				// 		opacity: "0",
				// 		transform: "translate(-50%, calc(-50% + 60px))",
				// 	},
				// 	"100%": {
				// 		opacity: "1",
				// 		transform: "translate(-50%, -50%)",
				// 	},
				// },
				// dialogOut: {
				// 	"0%": {
				// 		opacity: "1",
				// 		transform: "translate(-50%, -50%)",
				// 	},
				// 	"100%": {
				// 		opacity: "0",
				// 		transform: "translate(-50%, calc(-50% + 60px))",
				// 	},
				// },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// dialogIn: "dialogIn 300ms ease-out",
				// dialogOut: "dialogOut 250ms ease-in",
			},
		}
	},
	// plugins: [require("tailwindcss-animate")],
	plugins: [animate],
}