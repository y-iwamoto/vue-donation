<template>
    <div class="is-flex is-justify-content-space-between mb-3">
        <div>{{ username }}さんようこそ!!</div><div>残高：{{ wallet }}</div>
    </div>
</template>
<script>
export default {
    name: "DashBoardHeader",
    props: ["username", "wallet"]
}
</script>