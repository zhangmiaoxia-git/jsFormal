/**
 * 当滚轮的时候，window.onscroll触发的次数非常多，如果是触底去请求服务器，那么会在同一时间请求若干次，这样会大大增加服务器的压力，也降低了用户的体验，使用防抖和节流解决此问题
 */
//获取要操作的元素
//获取class为body的ul
const box = document.querySelector('.body');
//获取ul下的li
const lis = box.querySelectorAll('li');
//获取头部的ul
const head = document.querySelector('.head');

//渲染数据
function render(){
    fetch('./data.json').then(d=>d.json()).then(data=>{
        // console.log(data);
        data.forEach((item,i)=>{
            //获取高度最小的元素
            let {ele} = minEle(lis);
            //创建结构
            let div = document.createElement('div');
            div.className = 'img_box';
            let img = document.createElement('img');
            img.src = item.pic;
            let p1 = document.createElement('p');
            p1.className = 'desc';
            p1.innerText = item.desc;
            let p2 = document.createElement('p');
            p2.className = 'author';
            p2.innerText = item.author;

            div.append(img);
            div.append(p1);
            div.append(p2);
            //给最小高度的li的元素中插入一个div
            ele.append(div);
            setTimeout(()=>{
                //把img的图片透明度设置为1
                img.style.opacity = 1;
            });
        });
    });
}
render();

//取高度最小的li，拿到这个li的索引，元素，以及最短的值
function minEle(lis){
    // console.log(lis);
    //获取每列li的被内容撑开的高度(所有的li)
    //最开始每个li被内容撑开的高度都是0
    let ary = [...lis].map(ele=>ele.scrollHeight);
    // console.log(ary);
    //找到li高度最短的值
    let min = Math.min(...ary);
    // console.log(min);
    //根据最短的值，可以获取到最短的li的索引
    let index = ary.findIndex((item)=>{
        // console.log(item);
        return item === min;
    });
    //返回3个值， ele：最短的元素，index：最短的元素的索引，min：最短的值
    // console.log(lis[index],index,min);
    return {
        ele:lis[index],
        index,
        min,
    }
}

// window.onscroll = debounce(fn,200);
window.onscroll = throttling(fn,200);

//防抖解决请求次数过多
function debounce(callBack,time){
    //声明一个属性timer
    let timer;
    return function(...arg){
        //当timer有值的时候，就清除定时器
        if(timer){
            clearTimeout(timer);
        }
        //当timer没有值的时候，就开启定时器
        timer = setTimeout(()=>{
            callBack.call(this,...arg);
        },time);
    }
}

//节流解决请求次数过多
function throttling(callBack,time){
    //设置上一次的时间
    let prevTime = 0,timer;
    return function(...arg){
        //获取当前时间
        let nowTime = +new Date;
        //判断当前时间减去上一次的时间大于设置的时间，就执行函数
        if(nowTime - prevTime > time){
            callBack.call(this,...arg);
        }else{
            //第一次不满足if中的条件，走else
            clearTimeout(timer);
            timer = setTimeout(()=>{
                if(+new Date - prevTime > time){
                    callBack.call(this,...arg);
                }
            });
        }
        //将当前时间作为下一次的上一次时间
        prevTime = nowTime;
    }
}

//滚轮的时候判断触底，如果没有触底就不加载代码，不请求数据
//获取可视区的高度
let iH = window.innerHeight;
// console.log(iH);
function fn(){
    //当ul的高度小于可视区的高度，就终止加载代码，终止请求
    console.log(box.scrollHeight);  //ul被内容撑开的高度
    if(box.scrollHeight < iH)return;
    //最短的距离
    let {min} = minEle(lis);
    // console.log(min);
    //获取滚动的距离
    let scroll = window.pageYOffset;
    //判断可视区的高度+滚动的距离大于等于最短的距离+head的高度，如果大于等于，就执行函数
    console.log(iH);
    console.log(scroll);
    console.log(min);
    console.log(head.offsetHeight);
    if(iH + scroll >= min + head.offsetHeight){
        render();
    }
}