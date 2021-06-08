import firebase from "firebase/app";

const actions = {
  signUp({ dispatch, commit }, payload) {
    commit("setError", null);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit("setUserInfo", response.user);
        dispatch('saveUser', {
            username: payload.username,
            uid: response.user.uid}
        )
      })
      .catch(error => {
        console.error(error)
        commit("setError", error.message);
      });
  },
  saveUser({ commit }, payload) {
    firebase.database().ref("donaition")
        .push({
            user: {
                username: payload.username,
                uid: payload.uid
            }
        });
    commit("setUserName", payload);
    // TODO: ダッシュボード遷移時実装のときに削除
    commit("setError", "新規アカウントを登録しました");
  }
};

export default actions;