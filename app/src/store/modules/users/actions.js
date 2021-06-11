import firebase from "firebase/app";
import router from '../../../router/index'

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
    firebase.database().ref('donaition/' + payload.uid)
        .set({
            username: payload.username,
            uid: payload.uid,
            wallet: 1000
        });
    commit("setUserNameAndWallet", {
      username: payload.username, wallet: 1000
    });
    router.push({path: '/'});
  },
  signIn({ dispatch, commit }, payload) {
    commit("setError", null);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        dispatch('fetchUser', response)
      })
      .catch(error => {
        console.error("error", error)
        commit("setError", error.message);
      });
  },
  fetchUser({ commit }, payload) {
    firebase.database().ref()
      .child("donaition").child(payload.user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          commit("setUserNameAndWallet", snapshot.val())
          router.push({path: '/'});
        } else {
          commit("setError", "不正なアカウントです。管理者にお問い合わせください。");
          router.push({path: '/signin'});
        }
      }).catch((error) => {
        commit("setError", error.message);
      });

  }
};

export default actions;