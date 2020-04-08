<template>
    <div class="main-container">
        {{ msg }}
        {{ $t("login") }}
        <img src="../../assets/1.png" />
    </div>
</template>

<script>
export default {
    name: "hello-page",
    data() {
        return { msg: "hello-page" };
    },
};
</script>

<style scoped lang="scss">
.main-container {
    background-color: $kb-navy;
}
</style>
