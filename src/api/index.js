import http from './http'
let mall = '/mall'
// let bizId = 1
// let biz = {biz_id: bizId}

//登录
export const login = function (account,password) {
    return http.post('amoy/auth/login',{account,password})
}