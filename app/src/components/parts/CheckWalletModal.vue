<template>
  <div class="modal is-active is-justify-content-flex-end pb-6">
    <div class="modal-background"></div>
    <div class="modal-card">
      <section class="modal-card-body">
        <p>{{ wallet.username }}さんの残高</p>
        <p>{{ wallet.wallet }}</p>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button class="button is-danger" @click="$emit('close')">
          close
        </button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckWalletModal',
  props: ['wallet']
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
