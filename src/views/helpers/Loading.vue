<template>
    <div class="loading">
        <div class="loader mx-auto my-5 py-5 text-center text-primary">
           
            <span class="mdi-68px mdi mdi-loading mdi-spin"></span>
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
        h6{
            color:#8697a2
        }
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