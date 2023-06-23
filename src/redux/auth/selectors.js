// export const selectAuth = state => state.auth;
// export const getUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefresher;
export const selectToken = state => state.auth.token;
