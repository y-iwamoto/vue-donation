<template>
    <div class="text-center">
        <button type="submit" class="button">
            {{buttonName}}
        </button>
    </div>
</template>
<script>
export default {
    name: 'AuthenticateButton',
    props: ["buttonName"]
}
</script>