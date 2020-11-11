import { createMuiTheme } from '@material-ui/core/styles';

const favBlack = '#0b0c10';
const favDarkGrey = '#1f2833';
const favLightGrey = '#c5c6c8';
const favBlue = '#64fcf1';
const favDarkBlue = '#44a29f';

const theme = createMuiTheme({
	palette: {
		common: {
			black: favBlack,
			darkGrey: favDarkGrey,
			lightGrey: favLightGrey,
			blue: favBlue,
			darkBlue: favDarkBlue,
		},

		type: 'dark',
		primary: {
			main: favDarkGrey,
		},

		secondary: {
			main: favBlue,
		},

		background: {
			default: favBlack,
			paper: '#000',
		},
	},
});

export default theme;
