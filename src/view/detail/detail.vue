<template>
    <div>
        <!-- <div @click="goBack" class="back">返回</div> -->
        <div class="box" v-if="Object.keys(content).length">
            <h5>{{ name }}</h5>
            <div class="item" v-for="(value,key) of content" :key="key">
                <p>{{key}}</p>
                <p>{{value}}</p>
            </div>
        </div>
        <div class="footer">
            <p> 江苏省会计师协会版权所有<br>
                广州铭太科技信息有限公司承建
            </p>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            id: 0,
            content: {},
            name:''
        }
    },
    mounted() {
         this.id = this.$route.query.id
         this.init()
    },
    methods:{
        goBack(){
            this.$router.push('/index')
        },
        init() {
            let arr = []
            this.$http.get(`/data/${this.id}`).then(res =>{
              this.content = JSON.parse(res.content)
              this.name = res.name
            })
        }
    }
}
</script>
<style lang="less" scoped>
  .title{
    font-size: 10px;
    margin:0 auto -12px;
    height:60px;
    line-height:60px;
    text-align: center;
    border:1px solid #ccc;
    border-left:0;
    border-right:0;
  }
  .footer{
    width:50%;
    text-align: center;
    margin: 50px auto;
  }
  .box{

    margin:auto;
    padding:0;

  }
  .item{
        height: 50px;
        display: flex;
    }
   .box p{
        padding: 0 10px;
        flex:1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height:100%;
        border-bottom: 1px solid #ccc;

   }
   .box p:last-child{
        justify-content: flex-start;
        border-left:1px solid #ccc;
  }
  .back{
    font-size: 25px;
    margin-bottom: 50px;
    cursor: pointer;
  }
  .create-button{
    position: absolute;
     width:140px;
     top: 250px;
     left:8%;
  }
  #qrcode{
    margin:300px 100px;
  }
  h5{
    text-align: center;
  }
</style>