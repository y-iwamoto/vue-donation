<template>
    <div>
        <Title :title="title" />
        <form class="mt-5" @submit.prevent="submit" novalidate>
            <div class="columns">
                <div class="column"></div>
                <div class="column column is-two-fifths">
                    <InputForm
                        v-model="loginUser.email"
                        :v="$v.loginUser.email"
                        placeholder="E-mail"
                        name="email"
                        type="email"
                        :label="emailLabel"
                    />
                    <InputForm
                        v-model="loginUser.password"
                        :v="$v.loginUser.password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        :label="passwordLabel"
                    />
                    <ErrorMessage
                        :inputError="$v.loginUser"
                        :getError="this.getError"
                        :displayServerError="this.displayServerError"
                    />
                    <div class="mt-5">
                        <AuthenticateButton
                            :buttonName="buttonName"
                        />
                        <AuthenticateLink
                            :nextLink="nextLink"
                            :Linkname="Linkname"
                        />
                    </div>
                </div>
                <div class="column"></div>
            </div>
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
    name: 'SignIn',
    components: {
        Title,
        InputForm,
        ErrorMessage,
        AuthenticateButton,
        AuthenticateLink,
    },
    validations: {
        loginUser: {
            email: { required, email },
            password: { required },
        }
    },
    data() {
        return {
            title: "ログイン画面",
            emailLabel: 'メールアドレス',
            passwordLabel: 'パスワード',
            buttonName: 'ログイン',
            nextLink: '/signup',
            Linkname: '新規登録はこちらから',
            loginUser: {
                email: "",
                password: ""
            }
        }
    },
    computed: {...mapGetters("users",["getError"]),
        displayServerError() {
             if (this.getError === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                return 'メールアドレスまたはパスワードが合致しません';
            } else if (this.getError === '不正なアカウントです。管理者にお問い合わせください。') {
                return '不正なアカウントです。管理者にお問い合わせください。';
            } else {
                 return ''
            }
         }
    },

    methods: {
        ...mapActions("users",["signIn"]),
        submit() {
            this.$v.loginUser.$touch();
            if (this.$v.loginUser.$pending || this.$v.loginUser.$error) return;
            this.signIn( { email: this.loginUser.email, password: this.loginUser.password });
        }
    }
}
</script>
