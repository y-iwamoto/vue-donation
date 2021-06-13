import firebase from 'firebase/app';
import router from '../../../router/index';

const actions = {
  signUp({ dispatch, commit }, payload) {
    commit('setError', null);
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('setUserInfo', response.user);
        dispatch('saveUser', {
          username: payload.username,
          uid: response.user.uid
        });
      })
      .catch(error => {
        console.error(error);
        commit('setError', error.message);
      });
  },
  saveUser({ commit }, payload) {
    firebase
      .database()
      .ref('donaition/' + payload.uid)
      .set({
        username: payload.username,
        uid: payload.uid,
        wallet: 1000
      });
    commit('setUserNameAndWallet', {
      username: payload.username,
      wallet: 1000
    });
    router.push({ path: '/' });
  },
  signIn({ commit }, payload) {
    commit('setError', null);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        commit('setUserInfo', response.user);
        router.push({ path: '/' });
      })
      .catch(error => {
        console.error('error', error);
        commit('setError', error.message);
      });
  },
  fetchUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref()
        .child('donaition')
        .child(payload.uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists()) {
            commit('setUserNameAndWallet', snapshot.val());
            resolve(true);
          } else {
            commit(
              'setError',
              '不正なアカウントです。管理者にお問い合わせください。'
            );
            reject(false);
          }
        })
        .catch(error => {
          commit('setError', error.message);
          reject(false);
        });
    });
  },
  signOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('setUserInfo', { email: '', uid: '' });
        commit('setUserNameAndWallet', { username: '', wallet: 0 });
        router.push({ path: '/signin' });
      })
      .catch(error => {
        commit('setError', error.message);
      });
  },
  checkUser({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          commit('setUserInfo', { email: '', uid: '' });
          commit('setUserNameAndWallet', { username: '', wallet: 0 });
          reject(false);
        } else {
          commit('setUserInfo', user);
          resolve(true);
        }
      });
    });
  }
};

export default actions;
