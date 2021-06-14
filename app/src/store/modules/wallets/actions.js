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
    const targetWallet = await dispatch(
      'fetchLatestWallet',
      payload.targetWallet
    );
    await dispatch('adjustMoney', targetWallet);

    const myWallet = await dispatch('fetchLatestWallet', payload.myWallet);
    await dispatch('adjustMoney', myWallet);
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
  async adjustMoney(_, payload) {
    let updateData = {};
    updateData['/donation/' + payload.uid + '/wallet'] = payload.wallet;
    return await firebase
      .database()
      .ref()
      .update(updateData);
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
