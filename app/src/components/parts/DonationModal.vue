<template>
  <div class="modal is-active is-justify-content-flex-end pb-6">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <p>あなたの残高:{{ myWallet.wallet }}</p>
        <p>送る金額</p>
        <div v-if="isValidDonation" class="help is-danger is-size-6">
          {{ isValidDonation }}
        </div>
        <input class="input" type="number" name="donation" v-model="donation" />
      </section>
      <footer class="modal-card-foot is-justify-content-space-between">
        <button class="button is-danger" @click="$emit('close')">
          close
        </button>
        <button
          class="button is-danger"
          @click="$emit('submit', { donation: donation, uid: wallet.uid })"
        >
          送信
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DonationModal',
  props: ['wallet', 'myWallet'],
  data() {
    return {
      donation: 1
    };
  },
  computed: {
    isValidDonation: function() {
      if (this.donation > this.myWallet.wallet) {
        return '寄付できる金額を超えています';
      } else if (this.donation < 1) {
        return '0より大きな値を設定してください';
      }
      return false;
    }
  }
};
</script>
<style scoped>
.modal-background {
  background-color: rgba(10, 10, 10, 0.26);
}
.modal-card {
  width: 300px;
}
</style>
