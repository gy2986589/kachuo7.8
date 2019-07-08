<!-- 
flex布局功能区域
-->
<template>
  <flexbox :gutter="0" wrap="wrap" class="function-areas-wrap">
    <flexbox-item :span="1/4" v-for="(item,index) in dataList" :key="index">
      <div class="flex-wrap-for" @click="getItem(item.link)">
        <!-- <span :class="item.class" style="font"></span> -->
        <img :src="item.imgSrc" alt="" class="flex-wrap-img">
        <p class="flex-wrap-name">{{item.name}}</p>
      </div>
    </flexbox-item>
  </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, Divider } from "vux";

export default {
  name: "",
  props: [""],
  data() {
    return {
      dataList: [
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "票务系统",
          link: "/ticketsdiscount",
          // class: "iconfont iconmenpiao btn1",
          imgSrc: require("@/assets/images/打折门票-圆角.png")
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "智慧导航",
          link: "/intelligentnavigation",
          // class: "iconfont iconzhihuidaohang btn2",
          imgSrc: require("@/assets/images/智慧导航-圆角.png")

        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "景区发布",
          link: "/scencerelease",
          // class: "iconfont iconjingqufabu"
          imgSrc: require("@/assets/images/景区发布-圆角.png")

        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "景区服务",
          link: "/scenceservice?type=1",
          // class: "iconfont iconjingqufuwu"
          imgSrc: require("@/assets/images/景区服务-圆角.png")

        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "记住的",
          link: "/remember?type=5&branch=1",
          // class: "iconfont iconjizhude"
          imgSrc: require("@/assets/images/记住的-圆角.png")
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "了解的",
          link: "/understand?type=7&branch=2",
          imgSrc: require("@/assets/images/了解的-圆角.png")
          // class: "iconfont iconliaojiede"
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "带走的",
          link: "/takeaway?carousel=2",
          // class: "iconfont icondaizoude"
          imgSrc: require("@/assets/images/带走的-圆角.png")
        },
        {
          imgUrl:
            "http://f.hiphotos.baidu.com/image/pic/item/359b033b5bb5c9eab0b192c9db39b6003af3b35e.jpg",
          name: "周边服务",
          link: "/servicesurround?type=4",
          // class: "iconfont iconzhoubianfuwu"
          imgSrc: require("@/assets/images/周边服务-圆角.png")

        }
      ]
    };
  },

  components: {
    Flexbox,
    FlexboxItem,
    Divider
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    getItem(link) {
      this.$router.push(link);
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.function-areas-wrap{
  background: #fff;
  position: relative;
  z-index: 999;
  height: 200px;
}
.flex-wrap-for {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.flex-wrap-img {
  width: 50px;
  height: 50px;
  /* border-radius: 50%; */
}
.flex-wrap-name {
  width: 100%;
  height: 20px;
  text-align: center;
  line-height: 32px;
  font-size: 13px;
}
.flex-wrap-for span {
  font-size: 44px;
}
.flex-wrap-img{
  width: 45px;
  height: 45px;
}
</style>
<style lang="less">
// .vux-flexbox{
//   height: 200px;
//   .vux-flexbox-item{
//     margin-top: 0!important;

//   }

// }
</style>
