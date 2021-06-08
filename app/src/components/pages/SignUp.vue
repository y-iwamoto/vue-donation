<template>
    <div>
        <Title :title="title" />
        <form @submit.prevent="submit" novalidate>
            <InputForm
                v-model="newUser.name"
                :v="$v.newUser.name"
                placeholder="userName"
                name="name"
                type="text"
             />
            <InputForm
                v-model="newUser.email"
                :v="$v.newUser.email"
                placeholder="E-mail"
                name="email"
                type="email"
             />
            <InputForm
                v-model="newUser.password"
                :v="$v.newUser.password"
                placeholder="Password"
                name="password"
                type="password"
             />
             <ErrorMessage
                :inputError="$v.newUser"
                :getError="this.getError"
                :displayServerError="this.displayServerError"
             />
             <AuthenticateButton
                :buttonName="buttonName"
             />
             <AuthenticateLink
                :nextLink="nextLink"
                :Linkname="Linkname"
             />
        </form>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators"

import Title from '../parts/Title.vue'
import InputForm from '../parts/InputForm.vue'
import ErrorMessage from '../parts/ErrorMessage.vue'
import AuthenticateButton from '../parts/AuthenticateButton.vue'
import AuthenticateLink from '../parts/AuthenticateLink.vue'
export default {
    name: 'SignUp',
    components: {
        Title,
        InputForm,
        ErrorMessage,
        AuthenticateButton,
        AuthenticateLink
    },
    validations: {
        newUser: {
            name: { required },
            email: { required, email },
            password: { required },
        }
    },
    data() {
        return {
            title: "新規登録画面",
            buttonName: '新規登録',
            nextLink: '/signup',
            Linkname: 'ログインはこちらから',
            newUser: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    computed: {...mapGetters("users",["getError"]),
        displayServerError() {
            if (this.getError === 'The email address is already in use by another account.') {
                return 'このメールアドレスはすでに登録済みです';
            } else if (this.getError === '新規アカウントを登録しました') {
                // TODO: ダッシュボード遷移時実装のときに削除
                return '新規アカウントを登録しました';
            } else {
                return ''
            }
        }
    },
    methods: {
        ...mapActions("users",["signUp"]),
        submit() {
            this.$v.newUser.$touch();
            if (this.$v.newUser.$pending || this.$v.newUser.$error) return;
            this.signUp( { username: this.newUser.name ,email: this.newUser.email, password: this.newUser.password });
        }
    }
}
</script>
