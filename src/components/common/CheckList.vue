<template>
  <checklist
    title="设置默认收获地址"
    :options="commonList"
    v-model="radioValue"
    :max="1"
    @on-change="changeVal"
  ></checklist>
</template>

<script>
import { Checklist } from "vux";
import { getAddressList, setDefaultAddr } from "@/servers/api";

export default {

  data() {
    return {
      commonList: [],
      radioValue: [""],
      flag:false,
    };
  },

  created() {
    this.getAddressList();
  },
  mounted() {
    console.log(this.$router);
  },
  components: {
    Checklist
  },
  methods: {
    changeVal(val, label) {
      if(!this.flag){
        this.flag = true
        return
      }
      this.$emit("getSetVal",val);
    },
    getAddressList() {
      getAddressList({})
        .then(res => {
          if (res.result === 1) {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].isdefault === "1") {
                this.radioValue.push(res.data.list[i].id);
              }
              this.commonList.push({
                key: res.data.list[i].id,
                value: res.data.list[i].realname,
                inlineDesc:
                  res.data.list[i].province +
                  res.data.list[i].city +
                  res.data.list[i].area +
                  res.data.list[i].address +
                  "," +
                  res.data.list[i].mobile
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },



  },
  watch:{
    '$store.state.address':function () {

      console.log(1);

      this.commonList = []
      this.getAddressList()
    }
  }
};
</script>

<style scoped>
.error {
  padding-left: 15px;
  line-height: 28px;
  color: #888;
  font-size: 12px;
}
</style>
