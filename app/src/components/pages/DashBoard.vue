<template>
<div class="columns">
    <div class="column"></div>
    <div class="column column is-two-fifths">
        <DashBoardHeader
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
import DashBoardHeader from '../parts/DashBoardHeader.vue'
export default {
    name: "DashBoard",
    components: {
        Title,
        DashBoardHeader
    },
    data() {
        return {
            title: "ユーザ一覧",
        }
    },
    computed: {...mapGetters("users",["getUser"])}
}
</script>