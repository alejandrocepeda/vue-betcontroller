<template>
    <div class="absolute loading">
        <div class="loader mx-auto my-5 py-5 text-center text-primary">
            <font-awesome-icon style="color:#0cd664" size="3x" icon="circle-notch" spin/>
            <br>
            <h6 class="pt-3">Loading</h6>
        </div>
    </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style scoped lang="scss">
    .absolute{
        &.loading{
            width:           100%;
            height:          100%;
            display:         flex;
            justify-content: center;

            .loader{
                display:         flex;
                justify-content: center;
                align-content:   stretch;
                flex-direction:  column;
                align-items:     center;
            }
        }
    }
</style>