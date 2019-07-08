<template>
  <div class="amap-page-container">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>

    <el-amap vid="amapDemo"  :center="center"  :zoom="zoom" class="amap-demo" :style="setMapHeight" :plugin="plugin"  :events="events">
      <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :vid="index" :offset="taOffset" v-if="navIndex == 0">
        <div @touchstart="showModel(marker.label,marker.position)">
          <div class="marker-icon-ta"></div>
        </div>
      </el-amap-marker>
      <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :vid="index" :offset="taOffset" v-if="navIndex">
        <div @touchstart="showModel(marker.label,marker.position)">
          <div class="marker-icon-sort">{{index}}</div>
        </div>
      </el-amap-marker>
      <el-amap-text v-for="text in markers" :text="text.label" :position="text.position"  :offset="[0,-55]" ></el-amap-text>

    </el-amap>
    <Popup class="content-model" ref="videoWrap" v-show="showModelFlag"></Popup>
    <NavigationTab :dataList="tabList" v-on:changePath="showPath"></NavigationTab>
  </div>
</template>

<script>
let map = null,walking = null;
let scenicDataObj = {};

import Header from "@/components/common/Header";
import NavigationTab from "@/components/common/NavigationTab";
import Popup from "@/components/common/Popup";
import locationIcon from "@/assets/images/amap-icon/location-icon.png";
import scenicIcon from "@/assets/images/amap-icon/scenic.png";
import sortIcon from '@/assets/images/amap-icon/map-sort-icon@2x .png'
import scenicActiveIcon from "@/assets/images/amap-icon/scenicActive.png";
import inlocationIcon from "@/assets/images/amap-icon/inlocation-icon.png";

import { CheckByLocation } from "@/servers/api";
import { setTimeout } from "timers";

export default {
  name: "amap-page",
  data() {
    let self = this;
    return {
      zoom: 16,
      center: [0,0],
      markers: [],
      markerRefs: [],
      events:{
        'moveend': () => {
          this.domBindEvent()
        },
        'zoomend':()=>{
          this.domBindEvent()
        }
      },
      source: 'click',
      taOffset : [-15,-35],
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      },
      {
          pName: 'Geolocation',
          events: {
            init(o) {
              document.getElementsByClassName('amap-geolocation-con')[0].onclick = () =>{
                console.log(1);
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {

                    self.center = [result.position.lng, result.position.lat];
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }
        }],
      TitleObjData: {
        titleContent: "智慧导航",
        showLeftBack: true,
        showRightMore: true
      },
      navIndex:0,
      tabList: ["全景图", "登山图", "寻花图", "戏水图", "访仙图", "问佛图", "探古图"],
      scenicList: [
        {id: "22", name: "苍岩山", position: [114.145831, 37.831976]},
        {id: "23", name: "徽州古城", position: [118.434598, 29.867]},
        {id: "24", name: "蓬莱", position: [120.752564, 37.825461]},
        {id: "25", name: "少林", position: [112.941363,34.506982]},
        {id: "26", name: "神垕", position: [113.228142, 34.118356]},
        {id: "27", name: "云雾山", position: [114.214391, 31.12476]},
        {id: "35", name: "三孔", position: [116.989873, 35.590745]},
        {id: "66", name: "云冈石窟", position: [113.144103, 40.109236]}
      ],
      roadPath: [],
      path: [],
      SCENICSPOT: [],
      SCENICLINE: [],
    };
  },
  components: {
    Header,
    Popup,
    NavigationTab
  },
  methods: {

    initLocalData() {
      let scenicId = sessionStorage.getItem("currentScenic")
      for (let i = 0; i < this.scenicList.length; i++) {
        if (this.scenicList[i].id == scenicId) {
          this.center = this.scenicList[i].position;
        }
      }
    },

    domBindEvent(){
      setTimeout(()=>{
        let dom  = document.getElementsByClassName('amap-overlay-text-container')

        for(var i=0;i<dom.length;i++){
          dom[i].style.boxShadow = '2px 2px 2px #ddd'
          dom[i].style.padding = '5px 7px'
          dom[i].style.borderRadius = '6px'
          this.markers.forEach((item,index)=>{
            if(item.label == dom[i].innerText) dom[i].index = index
          })

          dom[i].ontouchstart = (e) =>{
            let index = e.target.index
            this.showModel(this.SCENICLINE[index].label,this.SCENICLINE[index].position)
          }
        }
      },1000)
    },

    init() {

      if (this.SCENICLINE.length) {

        this.markers = []
        this.SCENICLINE.forEach((item, index) => {
          this.markers.push({
            position:[item.position[0], item.position[1]],
            label:item.label,
          })
        })

        this.domBindEvent()

      } else {
        this.$vux.toast.text("暂无相应景点", "middle")
        setTimeout(() => {
          this.$vux.toast.hide()
        }, 1000)
      }
    },
    //绘制路线

    showModel(name,position) {

      let clickPosition = {
        name:name,
        lat:position[1],
        lng:position[0]
      }
      this.$refs.videoWrap.getScenicDetails(clickPosition);
    },
    showPath(index) {
      this.markers = []
      this.navIndex = index;
      this.getMarkerList(index)
      // this.init(this.mapCenter, index)
    },
    getMarkerList(type){
      this.$http.get("https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.site.site_list&type="+type)
        .then(({ data }) => {
          var data = data.data
          let arr = []
          if(data == ''){
            data = []
          }
          data.forEach(item=>{
            arr.push({position:[ item.longitude,item.latitude ],label:item.title})
          })

          this.SCENICLINE = arr
          console.log(this.SCENICLINE);
          if(type == 0) this.initLocalData()
          else{
            this.center = arr.length ? arr[0].position : this.center
          }
          this.init();
        })
    }

  },
  computed: {
    setMapHeight() {
      return { height: document.documentElement.clientHeight - 90 + "px" }
    },
    showModelFlag: {
      get: function() {
        return this.$store.state.navigationDetails;
      },
      set: function() {}
    }
  },
  mounted() {
    this.getMarkerList('')
  }
};
</script>
<style scoped>
  .marker-icon-ta{
    width: 30px;
    height: 35px;
    background-image: url("../../../../assets/images/amap-icon/scenic.png");
    background-size: 100% 100%;
  }
  .marker-icon-sort{
    background-color: #e4794b;
    width: 23px;
    height: 23px;
    text-align: center;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50%;
  }

.amap-demo {
  width: 100%;
  height: 300px;
  margin-top: 50px;
}

.amap-page-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content-model {
  position: relative;
  z-index: 9999;
}


</style>
