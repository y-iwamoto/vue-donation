<template>
<div class="columns">
    <div class="column"></div>
    <div class="column column is-two-fifths">
        <DashboardHeader
            :username="getUser.username"
            :wallet="getUser.wallet"
        />
        <Title :title="title" />
        <div class="mt-3">
            <h2 class="is-size-5 has-text-weight-bold">ユーザ名</h2>
        </div>
    </div>
    <div class="column"></div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import Title from '../parts/Title.vue'
import DashboardHeader from '../parts/DashboardHeader.vue'
export default {
    name: "Dashboard",
    components: {
        Title,
        DashboardHeader
    },
    data() {
        return {
            title: "ユーザ一覧",
        }
    },
    computed: {...mapGetters("users",["getUser"])}
}
</script>