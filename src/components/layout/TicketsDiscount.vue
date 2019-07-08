<!--
门票购买
-->
<template>
  <div class="tickets-discount-list-wrap">
    <div class="tickets-discount-list" v-for="(item,index) in dataList" :key="index">
      <div class="img-wrap">
        <img :src="item.imgSrc">
        <span class="scence-distance-wrap">
          <span class="scence-distance">{{item.distance}}</span>
        </span>
      </div>
      <div class="img-desc">
        <div>
          <p class="font-size-14">{{item.name}}</p>
          <p class="font-size-12">
            <span>{{item.price}}</span>
            <span class="price-discount">原价：{{item.priceDiscount}}</span>
          </p>
        </div>
        <div >
          <x-button mini type="primary" style="border-radius:15px" @click.native="buyTickets(index)">立即购票</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
import { TicketsList } from "@/servers/api";
import Bus from '@/assets/js/bus.js';
export default {
  name: "",
  props: [""],
  data() {
    return {
      backgroundImgSty: {
        width: "100%",
        height: "400px"
      },
      dataList: [
        {
          imgSrc: require("@/assets/images/蓬莱阁.jpg"),
          distance: "500km",
          name: "蓬莱阁",
          price: "¥110",
          priceDiscount: "¥120",
          type:"蓬莱阁门票"
        },
        {
          imgSrc: require("@/assets/images/三孔.jpg"),
          distance: "500km",
          name: "三孔",
          price: "¥110",
          priceDiscount: "¥130",
          type:"三孔门票"

        },
        {
          imgSrc: require("@/assets/images/云冈石窟.jpg"),
          distance: "500km",
          name: "云冈石窟",
          price: "¥110",
          priceDiscount: "¥120",
          type:"云冈石窟门票"

        },
        {
          imgSrc: require("@/assets/images/云雾山.jpg"),
          distance: "500km",
          name: "云雾山",
          price: "¥110",
          priceDiscount: "¥120",
          type:"云雾山门票"

        },
        {
          imgSrc: require("@/assets/images/少林寺.jpg"),
          distance: "500km",
          name: "少林寺",
          price: "¥110",
          priceDiscount: "¥120",
          type:"少林寺门票"

        },
        {
          imgSrc: require("@/assets/images/徽州古城.jpg"),
          distance: "500km",
          name: "徽州古城",
          price: "¥110",
          priceDiscount: "¥120",
          type:"徽州古城门票"
        },
        {
          imgSrc: require("@/assets/images/苍岩山.jpg"),
          distance: "500km",
          name: "苍岩山",
          price: "¥110",
          priceDiscount: "¥120",
          type:"苍岩山门票"
        }

      ]
    };
  },

  components: {
    XButton
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.getDataList();
  },

  methods: {
    // changType(){
    //   Bus.$emit('txt',this.dataList.type)
    // },
    getDataList() {
      TicketsList({})
        .then(res => {
          console.log(res);
          // console.log(res.data.result);
          // this.dataList[0] = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    buyTickets(index) {
      // var i = 0 ; i < this.dataList.length; i ++ ;
      let a=0;
      for(let i=0;i<this.dataList ;i++){
        a+-i;
        return a;
      }
      // console.log(11)
      // console.log(a)
        this.$router.push({
        path:'/ticketsdetails',
        query:{
          type : this.dataList[index+a].type
        }
      })
      ;
    }
  },

  watch: {}
};
</script>
<style lang='css' scoped>
.font-size-14 {
  font-size: 14px;
  font-weight: bold;
}
.font-size-12 {
  font-size: 12px;
}
.price-discount {
  color: #666;
  margin-left: 6px;
}
.tickets-discount-list-wrap {
  background: #f9f9f9;
}
.tickets-discount-list {
  width: 100%;
  height: 250px;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 4px;
}
.img-wrap {
  width: 100%;
  height: 200px;
}
.img-desc {
  width: 100%;
  height: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.scence-distance-wrap {
  width: 50px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  background: #f9f9f9;
  border-radius: 10px;
  position: relative;
  top: -190px;
  left: 10px;
  color: #222;
  font-size: 12px;
}
</style>