import  {services}  from "..";

// 轮播图的请求
export function getBanners(){
    return services({
        method:"GET",
        url:"/banner?type=2"
    })
}
// 获取推荐歌单ist
export function getMusicList(){
    return services({
        method:"GET",
        url:"/personalized?limit=9"
    })
}
// 搜索
export function searchByKeyWord(keyword){
    return services({
        method:"GET",
        url:`/search?keywords=${keyword}`
    })
}
// 登录 /login/cellphone?phone=xxx&password=yyy
export function login(data){
    return services({
        method:"GET",
        url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}

// 获取用户详情 /user/detail?uid=32953014
export function getUserInfo(uid){
    return services({
        method:"GET",
        url:`/user/detail?uid=${uid}`
    })
}