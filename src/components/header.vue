<template>
    <div class="addFrom">
        <div class="g-dialog">form</div>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
  .addFrom{
    height: 100%;
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 10px 85px 18px;
    z-index: 2001;
    background-color: rgba(0,0,0,0.5);
    overflow: hidden;
    .g-dialog{
        position: relative;
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        box-sizing: border-box;
        width: auto;
        overflow: hidden;
    }
  }
</style>