import Vue from 'vue'
import { conver_to_bangla } from '@/globals/'
export default () => {
  Vue.filter('bengali_number', function (value) {
      return conver_to_bangla(value)
  })
}
