<template>
    <div>
        <div v-if="inputError.$error">
            <div class="help is-danger is-size-6" v-if="inputError.name && !inputError.name.required">ユーザ名は必須入力です。</div>
            <div class="help is-danger is-size-6" v-if="!inputError.email.required">メールアドレスは必須入力です。</div>
            <div class="help is-danger is-size-6" v-if="!inputError.email.email">メールアドレス形式で入力してください</div>
            <div class="help is-danger is-size-6" v-if="!inputError.password.required">パスワードは必須入力です。</div>
        </div>
        <div v-if="getError && !inputError.$error">
            <div class="help is-danger is-size-6">{{ displayServerError }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ErrorMessage",
    props: ["inputError","displayServerError","getError"]
}
</script>