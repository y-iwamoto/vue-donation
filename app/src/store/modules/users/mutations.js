const mutations = {
  setUserInfo(state, payload) {
    const { email, uid } = payload;
    state.email = email;
    state.uid = uid;
  },
  setUserNameAndWallet(state, payload) {
    const { username, wallet } = payload;
    state.username = username;
    state.wallet = wallet;
  },
  setError(state, payload) {
    state.error = payload;
  }
};
export default mutations;
