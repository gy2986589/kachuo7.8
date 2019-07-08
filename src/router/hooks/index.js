import store from "@/store/index";
export default (router) => {
  router.beforeEach(function (to, from, next) {
    // store.commit('updateLoadingStatus', {isLoading: true});
  if(localStorage.getItem("token")){
    next();
    console.log("token存在")
    return
  }else{
    if(to.path === '/'){
      next()
    }else{
      next()
    }
    console.log("token不存在")
  }
})
  router.afterEach(function (router) {
    // store.commit('updateLoadingStatus', {isLoading: false});
  })
}