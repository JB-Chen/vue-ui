import Vue from "vue";
import Router from 'vue-router';
import xcSlide from '../components/xcSlide.vue'
import xcCaculator from '../components/xcCaculator.vue'





Vue.use(Router)


export default new Router({
     routes:[
         {
            path:'/xcCaculator',
            component:xcCaculator
         },
         {
            path:'/xcSlide',
            component:xcSlide,
         }
     ]
})
