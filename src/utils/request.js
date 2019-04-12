import axios from 'axios'
import { Message } from 'element-ui'
import i18n from '@/lang'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
      // config.headers['fn-x-access-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)


// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * success = false 是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res && typeof res === 'object' && 'error' in res) {
      Message({
        message: res.error.code + res.error.msg,
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject('error')
    }
    return res
  },
  (error) => {
    let err = error.response && error.response.data && error.response.data.error

    if (!err && /timeout/.test(String(error))) {
      err = {
        msg: i18n.t('request.timeout')
      }
    }
    Message({
      message: (err.code || '') + (err.msg || ''),
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(err || error)
  }
)

export default service