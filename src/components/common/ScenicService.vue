<template>
  <div class="scence-service-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <div class="scence-service-content">
      <div class="content-one">
        <div class="swp-wrap">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in advSwiper" :key="index">
              <img :src="item" alt>
            </swiper-slide>
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
          </swiper>
        </div>
        <div class="Selected-warp">
          <div class="Selected-title">商户精选</div>
          <scroller lock-y :scrollbar-x="false">
            <div class="Selected-business-list">
              <div
                class="business"
                v-for="(item,index) in recommend"
                :key="index"
                @click="details(item.id)"
              >
                <img :src="item.video_image" alt>
                <span class="price">{{item.price}}￥/人</span>
                <span class="name">{{item.name}}</span>
              </div>
            </div>
          </scroller>
        </div>
      </div>
      <div class="content-two">
        <div class="content-two-head">
          <div class="head-left">
            <popup-radio
              :options="this.checkList"
              v-model="option2"
              placeholder="分类"
              @on-hide="change"
            ></popup-radio>
          </div>
          <div class="head-right">
            <popup-radio :options="this.checkList" v-model="option2" placeholder="排序"></popup-radio>
          </div>
        </div>
        <scroller lock-x height="-378">
          <div class="store-list-warp">
            <div
              class="store"
              v-for="(item,index) in BusinessList"
              :key="index"
              @click="details(item.id)"
            >
              <div class="store-img-warp">
                <img :src="item.video_image" alt>
              </div>
              <div class="store-msg-warp">
                <div class="store-title">
                  <h3>{{item.name}}</h3>
                </div>
                <div class="star-price-warp">
                  <div class="star">
                    <!-- 星级评分组建 -->
                      <rater v-model="value" :font-size="11" disabled></rater>
                    <!-- <el-rate
                      v-model="value"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template
                    ></el-rate> -->
                  </div>
                  <div class="store-price">
                    <p>{{item.price}}￥/人</p>
                  </div>
                </div>
                <div class="store-time">
                  <span>营业时间 9:00-20:00</span>
                </div>
                <div class="tip">
                  <span>消费满50元送精美凉菜</span>
                </div>
              </div>
            </div>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/common/Header";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Scroller, PopupRadio, PopupPicker,Rater} from "vux";
// import "element-ui/lib/theme-chalk/index.css";
export default {
  name: "",
  props: [""],
  data() {
    return {
      //商家type
      typeNum: "",
      //选择分类绑定
      option2: "",
      //选择类别列表
      checkList: [],
      advSwiper: [],
      //推荐商家列表：
      recommend: [],
      //正儿八经商家列表:
      BusinessList: [],
      //商家打分数据：1~5
      value: 5,
      TitleObjData: {
        titleContent: "景区服务",
        showLeftBack: true,
        showRightMore: false
      },
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true
        },
        autoplay: {
          disableOnInteraction: true //触碰后继续轮播
        },
        speed: 600,
        loop: true, //循环模式
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        centeredSlides: true, //元素居中
        slidesPerView: "1"
      }
    };
  },
  components: {
    Header,
    swiper,
    swiperSlide,
    Scroller,
    PopupRadio,
    PopupPicker,
    Rater
  },

  computed: {},

  beforeMount() {},

  mounted() {
    //商家type值
    this.typeNum = this.$route.query.type;
    //获取景区服务轮播图；
    this.$http
      .post(
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=carousel&type=41"
      )
      .then(({ data }) => {
        // console.log(data.data.data.carousel);
        this.advSwiper = data.data.data.carousel;
        // console.log(this.advSwiper)
      });
    //获取选择分类！
    this.$http
      .post(
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.scenic_service"
      )
      .then(({ data }) => {
        // console.log(data.data.category);

        this.checkList = data.data.category.map(item => {
          return { key: item.id, value: item.name };
        });
        // this.checkList = data.data.category;
        // console.log(data)
        console.log(this.checkList);
        // console.log(this.checkList);
      });

    //获取推荐商家：
    this.$http
      .post(
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.scenic_service"
      )
      .then(({ data }) => {
        // console.log(data.data.recommend_business);
        this.recommend = data.data.recommend_business;
        // console.log(this.recommend)
      });
    //获取商家列表！
    this.$http
      .post(
        "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.scenic_service_list&type=" +
          this.typeNum
      )
      .then(({ data }) => {
        // console.log(data.data.list);
        this.BusinessList = data.data.list;
        // console.log(this.BusinessList);
      });
  },

  methods: {
    //传递id给详情页
    details(id) {
      this.$router.push({
        path: "/ServiceDetails",
        query: {
          idNum: id
        }
      });
    },
    //点击获取不同id切换类别
    change() {
      console.log(this.option2);
      this.$http
        .post(
          "https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.scenic_service_list&type=" +
            this.option2
        )
        .then(({ data }) => {
          // console.log(data.data.list);
          this.BusinessList = data.data.list;
          // console.log(this.BusinessList);
        });
    }
    // handleCommand(index) {
    //         console.log(index);
    //         }
  },

  watch: {}
};
</script>
<style lang="css" scoped>
img {
  width: 100%;
  height: 100%;
}
.scence-service-wrap {
  /* width: 100%; */
  height: 100%;
  overflow: hidden;
}
.scence-service-content {
  /* width: 375px; */
  height: 100%;
  margin-top: 46px;
  border-top: 1px solid #eeeeee;
  background: #f5f5f5;
}
.scence-service-content .content-one {
  /* width: 375px; */
  height: 277px;
  margin-top: 1px;
  background: #ffffff;
}
.scence-service-content .swp-wrap {
  /* width: 375px; */
  height: 90px;
}
.scence-service-content .swp-wrap img {
  /* width: 345px; */
  height: 80px;
  margin-top: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  /* margin-left: 15px; */
}
.swiper-slide {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}
.scence-service-content .content-one .Selected-warp {
  /* width: 375px; */
  height: 160px;
  margin-top: 10px;
}
.scence-service-content .content-one .Selected-warp .Selected-title {
  height: 30px;
  font-size: 18px;
  font-weight: 500;
  text-indent: 16px;
  color: #333333;
  line-height: 50px;
}
.scence-service-content .content-one .Selected-warp .Selected-business-list {
  height: 115px;
  width: 1500px;
  margin-top: 18px;
}
.scence-service-content
  .content-one
  .Selected-warp
  .Selected-business-list
  .business {
  height: 115px;
  width: 135px;
  margin: 2px 5px 0;
  float: left;
  display: inline-block;
}
.Selected-business-list:first-child {
  margin-left: 14px;
}
.scence-service-content
  .content-one
  .Selected-warp
  .Selected-business-list
  .business
  img {
  width: 135px;
  height: 90px;
  border-radius: 8px;
}
.scence-service-content
  .content-one
  .Selected-warp
  .Selected-business-list
  .business
  .price {
  width: 135px;
  height: 18px;
  background: rgba(000, 000, 000, 0.5);
  color: #ffffff;
  text-indent: 11px;
  position: absolute;
  top: 74px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  font-size: 11px;
}
.scence-service-content
  .content-one
  .Selected-warp
  .Selected-business-list
  .business
  .name {
  width: 66px;
  height: 13px;
  font-size: 14px;
  color: #333333;
  margin-top: 10px;
  line-height: 13px;
}
.scence-service-content .content-two {
  /* width: 375px; */
  height: 100%;
  margin-top: 10px;
  background: #ffffff;
}
.scence-service-content .content-two .content-two-head {
  /* width: 375px; */
  height: 45px;
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
}
/*选择分类区*/
.head-left {
  height: 45px;
  width: 100px;
  float: left;
}
.vux-cell-placeholder {
  font-size: 30px;
  color: #222222;
}
.head-right {
  height: 45px;
  width: 74px;
  /* margin-right: px; */
  float: right;
}

.head-right .el-dropdown-link {
  color: #666666;
}
/*下拉菜单左边*/
.el-dropdown {
  margin-top: 12px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #222222;
  font-size: 14px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.scence-service-content .content-two .store-list-warp {
  /* width: 375px; */
  /* height: 290px; */
  background: #ffffff;
  overflow-y: scroll;
}
.scence-service-content .content-two .store-list-warp .store {
  width: 120%;
  height: 145px;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
}
.scence-service-content .content-two .store-list-warp .store .store-img-warp {
  width: 105px;
  height: 105px;
  margin: 20px 21px 20px 15px;
  float: left;
}
.scence-service-content .content-two .store-list-warp .store .store-msg-warp {
  width: 234px;
  height: 105px;
  float: left;
  margin-top: 19px;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .store-title {
  height: 19px;
  margin-bottom: 15px;
  overflow: hidden;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .store-title
  h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 19px;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .star-price-warp {
  height: 14px;
  width: 180px;
  margin-bottom: 6px;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .star-price-warp
  .star {
  width: 75px;
  float: left;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .star-price-warp
  .store-price {
  width: 80px;
  float: left;
  margin-left: 8px;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .star-price-warp
  .store-price
  p {
  font-size: 14px;
  line-height: 16px;
  font-weight: Regular;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .store-time {
  width: 234px;
  height: 28px;
  border-bottom: 1px dotted #e5e5e5;
  margin-bottom: 6px;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .store-time
  span {
  font-size: 12px;
  color: #999999;
}
.scence-service-content
  .content-two
  .store-list-warp
  .store
  .store-msg-warp
  .tip
  span {
  font-size: 12px;
  color: #999999;
  line-height: 12px;
}
</style>
<style>
/* .el-rate__icon {
  font-size: 15px;
  margin-right: 0px;
  line-height: 4px;
} */
</style>
<style lang="less">
.weui-cell {
  .weui-cell__ft {
    color: #666666;
  }
}
.store-list-warp{
      .vux-rater {
        display: block; 
        line-height: 1;
  }
}

</style>
