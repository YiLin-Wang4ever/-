//因为是移动端应用 所以得根据rem来设置宽度
function remSize(){
    // 获取设备的宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    // 如果设备宽度大于750 就等于750
    if(deviceWidth >=750){
        deviceWidth = 750
    }
    // 如果太小 就320
    if(deviceWidth <= 320){
        deviceWidth = 320
    }
    // 设置fontsize
    // 750px --> 1rem = 100px  ,375px --> 1rem = 50px
    document.documentElement.style.fontSize = (deviceWidth/7.5)+'px';
    // 设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + "rem"
}
remSize()
window.onresize = function (){
    return remSize();
}