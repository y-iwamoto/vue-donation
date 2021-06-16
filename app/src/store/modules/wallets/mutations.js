const mutations = {
  setWalletList(state, payload) {
    state.wallets = payload.wallets;
  },
  setError(state, payload) {
    state.error = payload;
  }
};
export default mutations;
