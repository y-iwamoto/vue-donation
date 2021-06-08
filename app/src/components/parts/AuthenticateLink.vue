<template>
    <router-link :to="nextLink">{{Linkname}}</router-link>
</template>
<script>
export default {
    name: 'AuthenticateLink',
    props: ["nextLink","Linkname"]
}
</script>