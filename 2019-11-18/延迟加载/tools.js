class Tools{
    position(nowEle){
        let l = 0;
        let t = 0;
        //左边框
        let cl = nowEle.clientLeft;
        //上边框
        let ct = nowEle.clientTop;
        while(nowEle){
            //当前元素的定位左边距离+当前元素的左边框
            l += (nowEle.offsetLeft + nowEle.clientLeft);
            //当前元素的定位上边距离+当前元素的上边框
            t += (nowEle.offsetTop + nowEle.clientTop);
            //把当前元素的定位父级变成下一次循环的当前元素
            nowEle = nowEle.offsetParent;
        }
        l = l -cl;
        t = t - ct;
        return {
            l,
            t
        }
    }
}