export const createAppSlice = (set) => ({
	isAuthenticated: false,
	user: [],
	aboutMe: '',
	socialMedia: {
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
    },
	userDetails: [],

	updateIsAuthenticated(payload) {
		set({ isAuthenticated: payload });
	},
	updateUser(payload) {
		set({ user: payload });
	},
	updateAboutMe(payload) {
		set({ aboutMe: payload });
	},
	updateSocialMedia(payload) {
		set({ socialMedia: payload });
	},
	updateUserDetails(payload) {
		set({ userDetails: payload });
	},
});
