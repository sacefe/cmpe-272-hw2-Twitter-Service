export const AUTH_ACTIONS = {
    SET_LOGGED_IN: 'SET_LOGGED_IN'
}

export const actions = {
    setLoggedIn({commit}, payload) {
        commit(AUTH_ACTIONS.SET_LOGGED_IN, payload);
    }
}