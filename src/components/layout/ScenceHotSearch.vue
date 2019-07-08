<template>
  <div class="search-hot-wrap">
    <p class="search-hot-title">热门景区</p>
    <div class="search-hot-list-wrap">
      <span
        class="text-overflow-hidden"
        v-for="(item,index) in dataList"
        :key="index"
        @click="selectScenic(item)"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: "",
  props: [""],
  data() {
    return {
      changeAreadata:{},
      dataList: [
        {
          id: "22",
          name: "苍岩山",
          position: [114.145831, 37.831976]
        },
        {
          id: "23",
          name: "徽州古城",
          position: [118.434598, 29.867]
        },
        {
          id: "24",
          name: "蓬莱",
          position: [120.752564, 37.825461]
          // id: "26",
          // name: "神垕",
          // position: [113.228142, 34.118356]

        },
        {
          id: "25",
          name: "少林",
          position: [112.95978, 34.520026]
        },
        {
          // id: "24",
          // name: "蓬莱",
          // position: [120.752564, 37.825461]

          id: "26",
          name: "神垕",
          position: [113.228142, 34.118356]
        },
        {
          id: "27",
          name: "云雾山",
          position: [114.214391, 31.12476]
        },
        {
          id: "35",
          name: "三孔",
          position: [116.989873, 35.590745]
        },
        {
          id: "66",
          name: "云冈石窟",
          position: [113.144103, 40.109236]
        }
      ]
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    // this.changeArea(item.id)
   // this.$http.post("https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.get_recommend_business&scenic_id=24&scenic.index.change_scenic")
    // .then(({data})=>{
    //   console.log(data.data);
    //   this.changeAreadata = data.data;
    //   console.log(this.changeAreadata);
    // })
  },

  methods: {
    selectScenic(item) {
      sessionStorage.removeItem("currentScenic");
      sessionStorage.setItem("currentScenic", item.id);
      setTimeout(() =>{
        // this.$router.goBack();
       this.$router.push("/indextab");
      },300)
     this.changeArea(item.id);
      console.log(item.id)
    },
    changeArea(id){
    this.$http.get("https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.change_scenic&scenic_id="+id)
    .then(({data})=>{
    console.log(data);
    console.log("点击获取景区数据成功");
    this.changeAreadata = data;
    console.log(this.changeAreadata);
    })
    }
  },
  watch: {}
};
</script>
<style lang='css' scoped>
.search-hot-wrap {
  width: 100%;
  height: 160px;
  background: #eee;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
}
.search-hot-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.search-hot-list-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
.search-hot-list-wrap span {
  width: auto;
  height: 24px;
  display: inline-block;
  padding: 0 10px;
  background: #fff;
  color: #222;
  font-size: 14px;
  text-align: center;
  line-height: 24px;
  margin: 0 16px 16px 0;
  border-radius: 2px;
}
</style>