import Cookies from 'js-cookie';

export const isAuthenticatedFunc = () => {
	const token = Cookies.get('token');
	if (token) {
		return token;
	} else {
		return false;
	}
};
