<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column column is-two-fifths">
      <form @submit.prevent="submit" novalidate>
        <DashboardHeader
          :username="getMyWalletInfo.username"
          :wallet="getMyWalletInfo.wallet"
        >
          <template v-slot:button>
            <AuthenticateButton :buttonName="buttonName" />
          </template>
        </DashboardHeader>
      </form>
      <Title :title="title" />
      <WalletUserList
        :Wallets="getWallets"
        @open="openCheckWalletModal($event)"
        @openDonation="openDonationModal($event)"
      />
      <CheckWalletModal
        :wallet="targetCheckWallet"
        v-show="showCheckWalletModal"
        @close="closeCheckWalletModal"
      />
      <DonationModal
        :wallet="targetdonationInfo"
        :myWallet="getMyWalletInfo"
        v-show="showDonationModal"
        @submit="submitDonation($event)"
        @close="closeDonationModal"
      />
    </div>
    <div class="column"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Title from '../parts/Title.vue';
import DashboardHeader from '../parts/DashboardHeader.vue';
import AuthenticateButton from '../parts/AuthenticateButton.vue';
import WalletUserList from '../parts/WalletUserList.vue';
import CheckWalletModal from '../parts/CheckWalletModal.vue';
import DonationModal from '../parts/DonationModal.vue';
export default {
  name: 'Dashboard',
  components: {
    Title,
    DashboardHeader,
    AuthenticateButton,
    CheckWalletModal,
    WalletUserList,
    DonationModal
  },

  data() {
    return {
      title: 'ユーザ一覧',
      buttonName: 'ログアウト',
      showCheckWalletModal: false,
      showDonationModal: false,
      targetCheckWallet: {},
      targetdonationInfo: {}
    };
  },
  mounted() {
    this.fetchWalletList();
  },
  computed: {
    ...mapGetters('users', ['getMyWalletInfo', 'getAuthenticateInfo']),
    ...mapGetters('wallets', ['getWallets'])
  },
  methods: {
    ...mapActions('users', ['signOut', 'checkUser']),
    ...mapActions('wallets', ['fetchWalletList', 'requestDonation']),
    submit() {
      this.signOut({});
    },
    submitDonation(wallet) {
      this.requestDonation({
        targetWallet: {
          donation: Number(wallet.donation),
          uid: wallet.uid
        },
        myWallet: {
          donation: 0 - Number(wallet.donation),
          uid: this.getAuthenticateInfo.uid
        }
      });
      this.showDonationModal = false;
    },
    openCheckWalletModal(wallet) {
      this.showCheckWalletModal = true;
      this.targetCheckWallet = wallet;
    },
    closeCheckWalletModal() {
      this.showCheckWalletModal = false;
    },
    openDonationModal(wallet) {
      this.showDonationModal = true;
      this.targetdonationInfo = wallet;
    },
    closeDonationModal() {
      this.showDonationModal = false;
    }
  }
};
</script>
