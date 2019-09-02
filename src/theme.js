import { roboto } from '@theme-ui/presets'

export default {
	...roboto,
	styles: {
		...roboto.styles,
	},
	colors: {
		text: '#000',
		background: 'red',
		primary: 'white',
		modes: {
			dark: {
				text: '#fff',
				background: '#000',
				primary: '#0cf',
			},
		},
	},
}
