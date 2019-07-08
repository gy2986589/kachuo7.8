<template>
  <div class="store-details-wrap">
    <Header
      :titleContent="TitleObjData.titleContent"
      :showLeftBack="TitleObjData.showLeftBack"
      :showRightMore="TitleObjData.showRightMore"
    ></Header>
    <scroller lock-x height="-10"  @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="-10">
     <div class="store-details-content">
      <div class="video-wrap">
        <video
          :src="this.storeDetails.video"
          :poster="this.storeDetails.video_image"
          controls="controls"
        ></video>
      </div>
      <div class="storeIntroduce-wrap">
        <div class="Introduce-title">
          <p>{{this.storeDetails.name}}</p>
        </div>
        <div class="star-price">
          <div class="star-wrap">
            <el-rate v-model="value" disabled text-color="#ff9900"></el-rate>
          </div>
          <dir class="price-wrap">
            <p>{{this.storeDetails.price}}¥/人</p>
          </dir>
        </div>
        <div class="introduce-wrap">
          <p>
            介绍：{{this.storeDetails.content}}
          </p>
        </div>
      </div>
      <div class="characteristic-wrap">
        <div class="characteristic-title">
          <p>商家特色</p>
        </div>
        <ul class="characteristic-list">
          <li>
            <p >{{this.storeDetails.product}}</p>
          </li>
        </ul>
      </div>
      <div class="contact-address-wrap">
        <div class="contact">
          <div class="contact-left">
            <p>联系方式</p>
            <p>{{this.storeDetails.phone}}</p>
          </div>
          <div class="contact-right">
            <i class="el-icon-phone-outline"></i>
          </div>
        </div>
        <div class="line-one"></div>
        <div class="adress-wrap">
          <div class="adress-title">
            <p>详细地址</p>
          </div>
          <div class="adress-details">
            <p>{{this.storeDetails.address}}</p>
          </div>
        </div>
        <div></div>
      </div>
      <div class="evaluate-wrap">
        <div class="evaluate-head">
          <div class="evaluate-title">
            <span>游客点评</span>
          </div>
          <div class="evaluate-button">
            <el-button size="mini" round>写评价</el-button>
          </div>
        </div>
        <div class="big-star">
          <div class="block">
            <el-rate v-model="value1"  disabled></el-rate>
          </div>
          <div class="line-two"></div>
        </div>
        <ul class="user-evaluate-wrap">
          <li  v-for="(item,index) in this.commentList"  :key="index">
            <div class="row-one">
              <div class="head-img">
                <img
                  :src="this.commentList.avatar"
                  alt
                >
              </div>
              <div class="name-star-wrap">
                <span class="name">{{this.commentList.nickname}}</span>
                <span>
                  <el-rate v-model="value2" disabled></el-rate>
                </span>
              </div>
              <div class="point-time">
                <div>
                  <i class="el-icon-more"></i>
                </div>
                <div class="time">{{this.commentList.date}}</div>
              </div>
            </div>
            <div class="row-two">
              <p>{{this.commentList.content}}</p>
            </div>
            <div class="line-two"></div>
          </li>
          <load-more tip="loading"></load-more>
        </ul>
      </div>
     </div>
    </scroller>
  </div>
</template>
<script>
import Header from "@/components/common/Header";
import { Scroller,LoadMore } from 'vux';
export default {
  data() {
    return {
      //获取到的商家id
      idNum:"",
      storeDetails:[],
      //评论列表
      commentList:[],
      TitleObjData: {
        titleContent: "商家详情",
        showLeftBack: true,
        showRightMore: false
      },
      //星星的评级1-5
      value: 5,
      //大星星
      value1: 4,
      //单用户评分
      value2: null
    };
  },
  components: {
    Header,
    Scroller,
    LoadMore
  },
  created() {},
  methods: {
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
        // console.log(1);
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.bottomCount += 10
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
        console.log(2);
      }
    }

  },
  mounted(){
    //获取列表页传来的id
    // console.log(this.$route.query.idNum);
    this.idNum = this.$route.query.idNum;
    // console.log(this.idNum)
    //获取商家详情！
    this.$http.post("https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.business_info&id="+this.idNum)
    .then(({data})=>{
      // console.log(data.data);
      this.storeDetails = data.data;
      console.log(this.storeDetails)
    })
    //获取评论列表
    this.$http.post("https://core.kachuo.com/app/ewei_shopv2_app.php?i=5&c=site&a=entry&m=ewei_shopv2&do=mobile&r=scenic.index.buscommentlist&page[currentpage]")
    .then(({data})=>{
      console.log(data)
      this.commentList = data.data.comment
      console.log(this.commentList)
      //获取用户评分
      this.value2 =  parseInt(data.data.comment.score)
      // console.log(this.value2)
    })
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({top: 0})
    })
    console.log(this.commentList.index)
  }
};
</script>
<style lang='css' scoped>
li {
  list-style: none;
}
.store-details-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f5f5;
}
.store-details-content {
  /* width: 375px; */
  /* height: 635px; */
  margin-top: 46px;
  overflow-y: scroll;
}
.video-wrap {
  /* width: 375px; */
  /* height: 210px; */
}
video{
  object-fit:fill;
  width: 100%;
  height: 100%;
}
.storeIntroduce-wrap {
  /* width: 375px; */
  height: 200px;
  overflow: hidden;
  background: #ffffff;
  margin-bottom: 10px;
}
.Introduce-title {
  /* width: 375px; */
  height: 20px;
  margin-top: 20px;
}
.Introduce-title p {
  font-size: 20px;
  line-height: 20px;
  text-indent: 15px;
}
.star-price {
  /* width: 375px; */
  height: 18px;
  margin: 10px 0 20px 0;
}
.star-wrap {
  width: 80px;
  height: 15px;
  float: left;
  margin: 0px 12px 0 15px;
}
.price-wrap {
  width: 62px;
  height: 14px;
  float: left;
}
.price-wrap p {
  line-height: 14px;
  font-size: 14px;
}
.introduce-wrap {
  /* width: 340px; */
  height: 87px;
  margin-left: 15px;
}
.introduce-wrap p {
  font-size: 14px;
}
.characteristic-wrap {
  /* width: 375px; */
  height: 80px;
  overflow: hidden;
  background: #ffffff;
  margin-bottom: 10px;
}
.characteristic-title {
  height: 14px;
  margin: 15px 0 12px 15px;
}
.characteristic-title p {
  font-size: 14px;
  color: #111111;
}
.characteristic-list {
  height: 22px;
}
.characteristic-list li:first-child {
  margin-left: 15px;
}
.characteristic-list li {
  display: block;
  height: 22px;
  float: left;
  margin-right: 10px;
  background: #f5f5f5;
  border-radius: 6%;
}
.characteristic-list li p {
  margin: 6px 13px;
  font-size: 11px;
  line-height: 12px;
}
.contact-address-wrap {
  /* width: 375px; */
  height: 112px;
  background: #ffffff;
  margin-bottom: 15px;
}
.contact {
  /* width: 375px; */
  height: 56px;
  overflow: hidden;
}
.contact-left {
  width: 80%;
  height: 20px;
  margin: 18px 0 0 15px;
  border-right: 1px solid #e5e5e5;
  float: left;
}
.contact-left p:first-child {
  margin-right: 16px;
}
.contact-left p {
  float: left;
  font-size: 14px;
  line-height: 20px;
}
.line-one {
  width: 360px;
  height: 1px;
  margin-left: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.contact-right {
  height: 20px;
  float: right;
  margin-right: 30px;
}
.contact-right i {
  font-size: 14px;
  line-height: 52px;
}
.adress-wrap {
  width: 375px;
  height: 56px;
}
.adress-title {
  width: 64px;
  margin-left: 15px;
  float: left;
  margin-top: 10px;
}
.adress-title p {
  font-size: 14px;
  color: #111111;
}
.adress-details {
  width: 272px;
  float: left;
  margin-left: 14px;
  margin-top: 10px;
}
.adress-details p {
  color: #666666;
  font-size: 14px;
}
.evaluate-wrap {
  /* width: 375px; */
  overflow: hidden;
  background: #ffffff;
}
.evaluate-head {
  height: 45px;
  /* width: 375px; */
  border-bottom: 1px solid #e5e5e5;
}
.evaluate-title {
  width: 80px;
  float: left;
  margin: 8px 0px 0 15px;
}
.evaluate-head span {
  font-size: 16px;
  color: #111111;
}
.evaluate-button {
  width: 80px;
  float: right;
  margin-right: 15px;
}
.el-button {
  height: 25px;
  width: 80px;
  color: #ffffff;
  background: #ff6d1b;
  border: none;
  font-size: 12px;
  margin-top: 8px;
}
.big-star {
  height: 58px;
  /* width: 375px; */
  overflow: hidden;
}
.block {
  width: 165px;
  height: 25px;
  margin: 15px auto;
  text-align: center;   
}
.line-two {
  width: 345px;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  margin-left: 15px;
}
.user-evaluate-warp {
  width: 375px;
}
.user-evaluate-wrap li {
  /* width: 375px; */
  /* height: 90px; */
  display: block;
}
.user-evaluate-wrap li .line-two {
  margin-top: 0px;
}
.row-one {
  /* width: 375px; */
  height: 50px;
}
.head-img {
  width: 35px;
  height: 35px;
  float: left;
  margin: 10px 0 0 15px;
}
.head-img img {
  border-radius: 50%;
}
.name-star-wrap {
  /* width: 88px; */
  height: 35px;
  float: left;
  margin: 13px 0 0 11px;
}
.name-star-wrap span:first-child {
  font-size: 14px;
  color: #333333;
  margin-bottom: 5px;
}
.point-time {
  width: 76px;
  height: 48px;
  float: right;
  margin: 10px 15px 0 0;
}
.el-icon-more {
  color: #999999;
  margin-left: 48px;
}
.time {
  font-size: 10px;
  color: #999999;
}
.row-two {
  /* width: 240px; */
  height: 40px;
  margin: 10px 0 0px 60px;
}
.row-two p {
  font-size: 14px;
  color: #333333;
}
</style>
<style>
.el-rate__icon {
  font-size: 14px;
  margin-right: 0px;
  line-height: 1px;
}
.block .el-rate__icon {
  font-size: 28px;
}
/* .el-icon-phone-outline{
  font-size: 14px;
  line-height: 20px;

} */
</style>
