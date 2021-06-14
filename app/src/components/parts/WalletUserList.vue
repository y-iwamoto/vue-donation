<template>
  <div class="mt-3">
    <h2 class="is-size-5 has-text-weight-bold has-text-left">ユーザ名</h2>
    <ul>
      <li
        class="is-flex is-justify-content-space-between"
        v-for="wallet in Wallets"
        :key="wallet.uid"
      >
        <div>{{ wallet.username }}</div>
        <div>
          <button @click="click(wallet)" class="button is-primary mr-2">
            walletを見る
          </button>
          <button class="button is-primary">送る</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'WalletUserList',
  props: ['Wallets'],
  methods: {
    click: function(wallet) {
      this.$emit('open', wallet);
    }
  }
};
</script>
