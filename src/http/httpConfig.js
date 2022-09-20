import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

const http = {}
var instance = axios.create({
    timeout: 5000,
    validateStatus(status) {
        switch (status) {
        case 400:
            Message.error('请求出错')
            break
        case 401:
            Message.warning({
                message: '授权失败，请重新登录'
            })
            store.commit('LOGIN_OUT')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return
        case 403:
            Message.warning({
                message: '拒绝访问'
            })
            break
        case 404:
            Message.warning({
                message: '请求错误,未找到该资源'
            })
            break
        case 500:
            Message.warning({
                message: '服务端错误'
            })
            break
        }
        return status >= 200 && status < 310
    }
})

// 添加请求拦截器
instance.interceptors.request.use(
    function(error) {
        return Promise.reject(error)
    }
)

// 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
        } else {
            err.message = '连接服务器失败'
        }
        return Promise.reject(err.response)
    }
)

http.get = function(url, options) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
               resolve(response.data)
            })
            .catch(e => {
                console.log(e, 'cathc')
            })
    })
}

http.post = function(url, data, options) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, data, options)
            .then(response => {
               resolve(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    })
}

export default http
