<!--
商品列表
-->
<template>
  <div class="goods-list-wrap">
    <p style="width:100%;text-align:center;" v-show="!goodList.length && goodList.length!=0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">加载中&nbsp;&nbsp;</span>
      <inline-loading></inline-loading>
    </p>
    <!-- <p style="width:100%;text-align:center;" v-show="goodList.length === 0">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">暂无数据</span>
    </p> -->
    <div
      class="goods-list"
      v-for="(item,index) in goodList"
      :key="index"
      @click="watchGoodsDetails(item.goods_id,item.id,item.rent,item)"
    >
      <img class="goods-img" v-lazy="item.thumb">
      <div class="good-desc-wrap">
        <p class="goods-name">{{item.goods_name ? item.goods_name : item.title}}</p>
        <p class="goods-price" v-show="item.marketprice">¥{{item.marketprice}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Divider, InlineLoading } from "vux";
export default {
  name: "",
  props: ["goodList"],
  data() {
    return {
      dataList: []
    };
  },

  components: {
    Divider,
    InlineLoading
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    watchGoodsDetails(goodsId, id, rent, item) {
      if (!rent) {
        let gid = goodsId ? goodsId : id;
        this.$router.push("/goodsdetails?id=" + gid);
      } else {
        sessionStorage.setItem("backleasedetails", JSON.stringify(item));
        this.$router.push("/backleasedetails");
      }
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.goods-list-wrap {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.goods-list {
  width: 49%;
  min-height: 80px;
  height: auto;
  margin-bottom: 20px;
}
.goods-img {
  width: 100%;
  height: 180px;
  display: inline-block;
  object-fit: contain;
  background: none;
}
.goods-name {
  width: 100%;
  font-size: 12px;
  line-height: 15px;
  word-break: break-all;
  margin-top: 10px;
}
.goods-price {
  font-size: 14px;
  color:#b7090a;
  margin-top: 10px;
}
</style>