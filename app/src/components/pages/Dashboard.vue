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
      />
      <CheckWalletModal
        :wallet="targetCheckWallet"
        v-show="showCheckWalletModal"
        @close="closeCheckWalletModal"
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
export default {
  name: 'Dashboard',
  components: {
    Title,
    DashboardHeader,
    AuthenticateButton,
    CheckWalletModal,
    WalletUserList
  },

  data() {
    return {
      title: 'ユーザ一覧',
      buttonName: 'ログアウト',
      showCheckWalletModal: false,
      targetCheckWallet: {}
    };
  },
  mounted() {
    this.fetchWalletList();
  },
  computed: {
    ...mapGetters('users', ['getMyWalletInfo']),
    ...mapGetters('wallets', ['getWallets'])
  },
  methods: {
    ...mapActions('users', ['signOut', 'checkUser']),
    ...mapActions('wallets', ['fetchWalletList']),
    submit() {
      this.signOut({});
    },
    openCheckWalletModal(wallet) {
      this.showCheckWalletModal = true;
      this.targetCheckWallet = wallet;
    },
    closeCheckWalletModal() {
      this.showCheckWalletModal = false;
    }
  }
};
</script>
