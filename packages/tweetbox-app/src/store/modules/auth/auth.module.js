import {actions} from './auth.actions';
import {mutations} from './auth.mutations';

const state = {
    isLoggedIn: false
};

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    }
}

const namespaced = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
