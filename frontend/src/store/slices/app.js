export const createAppSlice = (set) => ({
	isAuthenticated: false,
	user: [],

	updateIsAuthenticated(payload) {
		set({ isAuthenticated: payload });
	},
	updateUser(payload) {
		set({ user: payload });
	},
});
