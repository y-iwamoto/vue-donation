const mutations = {
    setUserInfo(state, payload) {
      const { email, uid } = payload;
      state.email = email;
      state.uid = uid;
    },
    setUserName(state, payload) {
        const {username } = payload;
        state.username = username;
    },
    setError(state, payload) {
      state.error = payload;
    }
  };
  export default mutations;