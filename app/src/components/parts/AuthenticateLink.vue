<template>
  <router-link class="button is-ghost" :to="nextLink">{{
    Linkname
  }}</router-link>
</template>
<script>
export default {
  name: 'AuthenticateLink',
  props: ['nextLink', 'Linkname']
};
</script>
