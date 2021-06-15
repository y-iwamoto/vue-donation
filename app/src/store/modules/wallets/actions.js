import firebase from 'firebase/app';
import store from '../../index';

const actions = {
  fetchWalletList({ commit }) {
    const myUid = store.getters['users/getAuthenticateInfo'].uid;
    firebase
      .database()
      .ref('donation')
      .on('value', function(snapshot) {
        const wallets = Object.keys(snapshot.val())
          .map(function(key) {
            return snapshot.val()[key];
          })
          .filter(wallet => wallet.uid !== myUid);
        commit('setWalletList', { wallets });
      });
  },
  async requestDonation({ dispatch, commit }, payload) {
    commit('setError', null);
    const targetWallet = await dispatch(
      'fetchLatestWallet',
      payload.targetWallet
    );

    const myWallet = await dispatch('fetchLatestWallet', payload.myWallet);
    await dispatch('adjustWallet', { targetWallet, myWallet });
    commit(
      'users/setUserNameAndWallet',
      {
        username: store.getters['users/getMyWalletInfo'].username,
        wallet: myWallet.wallet
      },
      { root: true }
    );
    dispatch('fetchWalletList');
  },
  async adjustWallet({ commit }, payload) {
    const donationRef = firebase.database().ref('/donation');
    return await donationRef.transaction(
      currentData => {
        if (
          currentData &&
          currentData[payload.targetWallet.uid] &&
          currentData[payload.myWallet.uid]
        ) {
          currentData[payload.targetWallet.uid].wallet =
            payload.targetWallet.wallet;
          currentData[payload.myWallet.uid].wallet = payload.myWallet.wallet;
          return currentData;
        } else {
          return;
        }
      },
      (error, committed) => {
        if (error || !committed) {
          commit('setError', '送金に失敗しました。管理者に問い合わせください');
        }
      }
    );
  },
  async fetchLatestWallet(_, payload) {
    const userInfo = await firebase
      .database()
      .ref()
      .child('donation')
      .child(payload.uid)
      .get();
    return {
      wallet: Number(userInfo.val().wallet) + Number(payload.donation),
      uid: payload.uid
    };
  }
};
export default actions;
