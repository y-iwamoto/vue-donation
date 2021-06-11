<template>
    <div class="is-flex is-justify-content-space-between is-align-items-center mb-3">
        <div>{{ username }}さんようこそ!!</div>
        <div class="is-flex is-align-items-center ">
            <div class="mr-5">残高：{{ wallet }}</div>
            <slot name="button"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "DashboardHeader",
    props: ["username", "wallet"]
}
</script>