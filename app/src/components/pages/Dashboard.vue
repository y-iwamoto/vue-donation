<template>
<div class="columns">
    <div class="column"></div>
    <div class="column column is-two-fifths">
        <form @submit.prevent="submit" novalidate>
            <DashboardHeader
                :username="getUser.username"
                :wallet="getUser.wallet"
            >
                <template v-slot:button>
                    <AuthenticateButton
                        :buttonName="buttonName"
                    />
                </template>
            </DashboardHeader>
        </form>
        <Title :title="title" />
        <div class="mt-3">
            <h2 class="is-size-5 has-text-weight-bold">ユーザ名</h2>
        </div>
    </div>
    <div class="column"></div>
</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Title from '../parts/Title.vue'
import DashboardHeader from '../parts/DashboardHeader.vue'
import AuthenticateButton from '../parts/AuthenticateButton.vue'
export default {
    name: "Dashboard",
    components: {
        Title,
        DashboardHeader,
        AuthenticateButton
    },
    data() {
        return {
            title: "ユーザ一覧",
            buttonName: "ログアウト"
        }
    },
    computed: {...mapGetters("users",["getUser"])},
    methods: {
        ...mapActions("users",["signOut", "checkUser"]),
        submit() {
            this.signOut({});
        }
    }
}
</script>