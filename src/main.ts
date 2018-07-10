import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// import babylon from 'babylonjs'

Vue.config.productionTip = false;

let err: Error = new Error("indeex: http://www.indeex.cc");
window.console.log = () => {
  err;
};

!function() {
  var timelimit: number = 50;
  var open: boolean = false;
  setInterval(function() {
      var starttime: any = new Date();
      debugger ;
      let now: any = new Date();
      if (now - starttime > timelimit) {
          open = true;
          window.stop();
          alert('禁止调试!!!');
      } else {
          open = false
      }
  }, 500)
}();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
