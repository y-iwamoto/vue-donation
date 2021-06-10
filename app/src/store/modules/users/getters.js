const getters = {
    getUser(state) {
      return { username: state.username, wallet: state.wallet }
    },
    getError(state) {
      return state.error;
    }
  };

export default getters;
