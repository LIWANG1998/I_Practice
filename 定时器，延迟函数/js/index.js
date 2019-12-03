(function () {
    //定时器
    let _conut = 5;
    let _t = setInterval(function () {
        //清楚定时器
        if (_conut <= 0) {
            clearInterval(_t);
        }
        console.log(_conut--);
    }, 500);
    //延迟函数
    setTimeout(function () {
        console.log("Welcome!")
    }, 2000);
})();