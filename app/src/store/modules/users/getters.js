const getters = {
    getUser(state) {
      return { username: state.username, wallet: state.wallet }
    },
    getAuthenticateInfo(state) {
      return { uid: state.uid, email: state.email }
    },
    getError(state) {
      return state.error;
    }
  };

export default getters;
