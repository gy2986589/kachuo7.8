<template>
  <div class="tab-item-paly-content">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/css/swiper.css"
    >
    <FunctionAreas class="tab-item-play-content-tools-wrap"></FunctionAreas>
    <div class="tab-item-play-content-tip-wrap">
      <AdvertiseSwiper style="padding-left:15px"></AdvertiseSwiper>
    </div>
    <div class="tab-item-play-content-scence">
      <div class="tab-item-play-content-tools">
        <span class="tab-item-play-content-tools-line"></span>
        <span class="tab-item-play-content-title">景区服务</span>
      </div>

      <Cell class="tab-item-play-content-cell" :cellList="cellListScence"></Cell>
    </div>
    <div class="tab-item-play-content-scence tab-item-play-content-scence-wrap">
      <div class="tab-item-play-content-tools">
        <span class="tab-item-play-content-tools-line"></span>
        <span class="tab-item-play-content-title">周边服务</span>
      </div>
    <div>
      <Cell
        class="tab-item-play-content-cell tab-item-play-content-cell-spec"
        :cellList="cellListAround">
      </Cell>
    </div>
    </div>
 
  </div>
</template>

<script>
import FunctionAreas from "@/components/layout/FunctionAreas";
import AdvertiseSwiper from "@/components/layout/AdvertiseSwiper";
import Cell from "@/components/common/CellNoBorder";
import SwiperAdvEat from "@/components/common/SwiperAdvEat";
export default {
  name: "",
  props: [""],
  data() {
    return {
      cellListScence: [
        {
          title: "吃吧",
          icon: "iconfont iconchiba",
          link: "/scenicService?type=1"
        },
        {
          title: "喝吧",
          icon: "iconfont iconheba",
          link: "/scenicService?type=2"
        },
        {
          title: "玩吧",
          icon: "iconfont iconwanba",
          link: "/scenicService?type=3"
        }
      ],
      cellListAround: [
        {
          title: "美食",
          icon: "iconfont iconmeishi",
          link: "/suerroundBusiness?type=4"
        },
        {
          title: "休闲",
          icon: "iconfont iconxiuxian",
          link: "/suerroundBusiness?type=5"
        },
        {
          title: "酒店",
          icon: "iconfont iconjiudian",
          link: "/suerroundBusiness?type=6"
        },
        {
          title: "娱乐",
          icon: "iconfont iconyule",
          link: "/suerroundBusiness?type=7"
        }
      ]
    };
  },

  components: {
    FunctionAreas,
    AdvertiseSwiper,
    Cell,
    SwiperAdvEat
  },

  computed: {},

  beforeMount() {},

  mounted() {
  },
  methods: {
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.tab-item-play-content-tools {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 12px;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 1px solid #f5f5f5;
}
.tab-item-play-content-tools-line {
  width: 2px;
  height: 16px;
  /* background: #000; */
  display: inline-block;
  /* margin-right: 10px; */
}
.tab-item-play-content-title {
  font-weight: bold;
}
.tab-item-play-content-cell {
  margin-top: -20px;
}
.tab-item-play-content-tip-wrap {
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
}
.tab-item-play-content-tools-wrap {
  width: 100%;
  height: 180px;
  background: #fff;
  position: relative;
  top: -10px;
  border-radius: 10px 10px 0 0;
}
.tab-item-play-content-scence {
  width: 100%;
  height: 200px;
}
.tab-item-play-content-scence-wrap {
  width: 100%;
  min-height: 210px;
  height: auto;
  padding: 0 0 20px 0;
  box-sizing: border-box;
}
.tab-item-play-content-cell-spec span {
  width: 24px;
  height: 24px;
  display: inline-block;
  font-size: 20px;
}
.tab-item-play-content-scence-line {
  width: 100%;
  height: 10px;
  background: #f5f5f5;
  margin-top: -10px;
}
.swiperadv{
  width: 100%;
  height: 40px;
  background:darkgreen;
  overflow: hidden;
  line-height: 40px;
}
</style>