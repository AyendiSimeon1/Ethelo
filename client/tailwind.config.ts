import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
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
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}, 
	keyframes : {
		'slide-in-up': {
			'0%': { transform : 'translateY(100%)', opacity: '0'},
			'100%': { transform: 'translateY(0)', opacity: '1'}
		},
		float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-20px)' },
		  },
		  fadeIn: {
			'0%': { opacity: '0' },
			'100%': { opacity: '1' },
		  },
		  fadeInUp: {
			'0%': {
			  opacity: '0',
			  transform: 'translateY(20px)',
			},
			'100%': {
			  opacity: '1',
			  transform: 'translateY(0)',
			},
	},
	animation: {
		'slide-in-up': 'slide-in-up 0.5s ease-out forwards',
		'float-slow': 'float 6s ease-in-out infinite',
		'float-medium': 'float 5s ease-in-out infinite',
		'float-fast': 'float 4s ease-in-out infinite',
		'fade-in': 'fadeIn 0.5s ease-out',
		'fade-in-up': 'fadeInUp 0.7s ease-out',
		'fade-in-delay': 'fadeIn 0.5s ease-out 0.2s forwards',
	}
  },
  plugins: [require("tailwindcss-animate")],
} }