import netlifyIdentity from "netlify-identity-widget";

let currentUser
if (process.client) {
    netlifyIdentity.init()   
}

export const state = () => ({
  
  currentUser: currentUser
});

export const mutations = {
  SET_USER(state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  setUser: ({ commit }, payload) => {
    commit('SET_USER', payload)
  }
};