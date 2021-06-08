<template>
    <div>
        <div v-if="inputError.$error">
            <div class="error" v-if="!inputError.name.required">ユーザ名は必須入力です。</div>
            <div class="error" v-if="!inputError.email.required">メールアドレスは必須入力です。</div>
            <div class="error" v-if="!inputError.email.email">メールアドレス形式で入力してください</div>
            <div class="error" v-if="!inputError.password.required">パスワードは必須入力です。</div>
        </div>
        <div v-if="getError && !inputError.$error">
            <div class="error">{{displayServerError}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ErrorMessage",
    props: ["inputError","displayServerError","getError"]
}
</script>