import firebase from 'firebase/app';
import store from '../../index';

const actions = {
  fetchWalletList({ commit }) {
    const myUid = store.getters['users/getAuthenticateInfo'].uid;
    firebase
      .database()
      .ref('donaition')
      .on('value', function(snapshot) {
        const wallets = Object.keys(snapshot.val())
          .map(function(key) {
            return snapshot.val()[key];
          })
          .filter(wallet => wallet.uid !== myUid);
        commit('setWalletList', { wallets });
      });
  }
};
export default actions;
