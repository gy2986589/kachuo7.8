   <template>
  <div>
    <swiper :options="swiperOption" v-if="AdvOptions[type]">
      <swiper-slide
        v-for="(item,index) in AdvOptions[type]"
        :key="index"
      >{{item}}</swiper-slide>
    </swiper>

  </div>

</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  props: ["type"],
  data() {
    return {
      swiperOption: {
        autoplay: {
          disableOnInteraction: false //触碰后继续轮播
        },
        speed: 600,
        loop: true, //循环模式
        direction: "vertical", //垂直播放
        autoHeight: true, //自动高度
        centeredSlides: true,
        centeredSlides: false, //设定为true时，active slide会居中，而不是默认状态下的居左
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // on: {
        //   touchStart: function(event) {
        //     // this.$router.push('/indextab')
        //     swiper.SlideTo()
        //     alert("事件触发了;");

        //   }
        // }
        //         onSlideChangeEnd: function(swiper){
        // 　　　    swiper.update();
        // 　　　    mySwiper.startAutoplay();
        // 　　      mySwiper.reLoop();
        //               }
      },
      AdvOptions: {
        // "吃吧": ["吃1吃1吃1吃1吃1吃1", "吃2吃2吃2吃2", "吃3吃3吃3吃3吃3吃3","吃4吃4吃4吃4吃4","吃5","吃6","吃7"],
        // "喝吧": [],
        // "玩吧": [],
        // "美食": ["美食1", "美食2", "美食3美食3美食3美食3美食3美食3美食3","美食4","美食5"],
        // "休闲": ["休闲1休闲1休闲1休闲1休闲1休闲1", "休闲2", "休闲3","休闲4"],
        // "酒店": ["酒店1酒店1酒店1酒店1酒店1酒店1"],
        // "娱乐": ["娱乐1", "娱乐2娱乐2娱乐2娱乐2娱乐2", "娱乐3","娱乐4娱乐4娱乐4娱乐4娱乐4","娱乐5","娱乐6"]
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {

    this.$nextTick(() => {
        this.$http.get("https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.get_recommend_business")
        .then(({ data }) => {
          console.log(data);
          this.AdvOptions = data.data;
          console.log(this.AdvOptions);
        });

    // this.get()

    });
  }
};
</script>
<style scoped>
swiper-slide {
  /** width: 100%;*/
  text-align: center;
  /*height: 100%;*/
}
</style>
