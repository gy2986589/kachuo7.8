<template>
    <group class="cell-no-border" style="border:none;">
      <cell class="cell-sty" :title="item.title" is-link :link="item.link" v-for="(item,index) in cellList" :key="index">
        <span slot="icon" class="img-sty" :class="item.icon" ></span>
        <badge :text="item.badgeText" v-show="item.showBadge"></badge>    
        <SwiperAdvEat class="SwiperAdvEat" :type="item.title"></SwiperAdvEat>
      </cell>

    </group>
</template>

<script>
import { Cell, Group,Badge } from "vux";
import SwiperAdvEat from "@/components/common/SwiperAdvEat";
export default {
  data(){
    return{
    }
  },
  props: {
    cellList: {
      type: Array,
      required: true
    }
  },
  mounted() {

  },
  components: {
    Group,
    Cell,
    Badge,
    SwiperAdvEat
  },
  methods: {
    onClick() {
      console.log("on click");
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.img-sty {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 6px;
  font-size: 24px;
}
.SwiperAdvEat{
  /** overflow: hidden;*/
  height: 32px;
  width: 200px;
  line-height: 32px;
  border:none;
  position:absolute;
  top:-15px;
  left: -210px;
  font-size: 12px;
  color: grey;
  overflow: hidden;

}
</style>