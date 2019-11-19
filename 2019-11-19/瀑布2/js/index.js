//获取class为body的ul
const box = document.querySelector('.body');
//获取head
const head = document.querySelector('.head');

//计算图片的x轴的宽度，以及y轴的高度
//固定图片的宽度
const picw = 236;
//图片的左边距
const ml = 10;  //margin-left
//ul以上的距离
const boxt = 66;
//获取可视区的宽度
let clientW = document.documentElement.clientWidth;
// console.log(clientW);
//求每行可以放几张图片（每行的图片数，图片数向下取整）
let len = Math.floor(clientW / (picw + ml));
// console.log(len);
//计算ul的宽度
box.style.width = (len * (picw + ml)) - ml + 'px';

let aryx = [];  //x轴（宽度）
let aryy = [];  //y轴（高度）

//for循环计算x轴的宽度，计算每张图片从0的位置开始，到结束的位置是多宽
for(let i=0;i<len;i++){
    aryx[i] = i * (picw + ml);
    aryy[i] = 0;
}
// console.log(aryx,aryy);


//渲染数据
function render(){
    fetch('./data.json').then(d=>d.json()).then(data=>{
        console.log(data);
        data.forEach((item,i)=>{
            //获取最小的top值，也就是最短的距离（y轴的高度）
            let {index} = minIndex(aryy);
            // console.log(aryy[index],aryx[index]);
            let li = document.createElement('li');
            //因为刚开始图片都是重叠在一起的，所以要在这里给li加上top值与left值
            li.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;

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
            li.append(div);
            box.append(li);
            setTimeout(()=>{
                img.style.opacity = 1;
            });
            //每次添加完一个li之后，把当前li的高度+间距赋值到当前数组中，以便于下次作比较
            aryy[index] += (boxt+item.height*1 + 20);
        });
    });
}
render();

//取最短距离
function minIndex(ary){
    //取最小值
    let min = Math.min(...ary);
    // console.log(min);
    //取最小值的索引
    let index = ary.findIndex((item)=>{
        return item === min;
    });
    // console.log(index);
    //返回最小值，以及最小值的索引
    return {
        index,
        min,
    }
}

//防抖解决请求多次的问题
function debounce(callBack,time){
    //设置一个属性timer，存储定时器的返回值
    let timer;
    //返回一个函数
    return function(...arg){
        //当timer有值时，清空定时器
        if(timer){
            clearTimeout(timer);
        }
        //当timer没有值时，开启一个定时器
        timer = setTimeout(()=>{
            //执行函数
            callBack.call(this,...arg);
        },time);
    }
}

//节流解决请求多次的问题
function throttling(callBack,time){
    //设置上一次的时间
    let prevTime = 0,timer;
    //返回一个函数
    return function(...arg){
        //获取当前时间
        let nowTime = +new Date;
        //判断当前时间-上一次的时间是否大于设置的时间，如果大于，则执行函数
        if(nowTime - prevTime > time){
            callBack.call(this,...arg);
        }else{
            clearTimeout(timer);
            timer = setTimeout(()=>{
                if(+new Date - prevTime > time){
                    callBack.call(this,...arg);
                }
            });
        }
        //将当前时间作为下一次的上次时间
        prevTime = nowTime;
    }
}

//滚轮的时候判断触底
//获取可视区的高度
let iH = window.innerHeight;
window.onscroll = debounce(fn,200);
//计算高度，判断是否需要执行函数
function fn(){
    //获取最短距离
    let {index} = minIndex(aryy);
    // console.log(index);
    //获取滚动条的距离
    let scroll = window.pageYOffset;
    // console.log(scroll);
    //判断可视区的高度+滚动条的距离是否大于最短距离，如果大于，则执行函数
    // console.log(aryy[index]);
    if(iH + scroll > aryy[index]){
        render();
    }
}

//当浏览器缩放的时候重新计算一下，可视区能放多少张图片
window.onresize = function(){
    //重新获取可视区的宽度
    clientW = document.documentElement.clientWidth;
    //重新计算可以放几张图片
    len = Math.floor(clientW / (picw + ml));
    //重新计算ul的宽度
    box.style.width = (len * (picw + ml)) - ml + 'px';
    //重新给存储left，top值的数组赋值
    aryx.length = 0;
    aryy.length = 0;
    //for循环重新计算left值（x），top值（y）
    for(let i=0;i<len;i++){
        aryx[i] = i * (picw + ml);
        aryy[i] = 0;
    }
    //获取所有的li，重新排列
    const lis = box.querySelectorAll('li');
    lis.forEach((ele,i)=>{
        //获取最短距离
        let {index} = minIndex(aryy);
        ele.style.cssText = `top:${aryy[index]}px;left:${aryx[index]}px`;
        //每次添加一个li之后，都要把每个li的高度计算一下，放到aryy中，以便于下次作比较
        aryy[index] += (ele.scrollHeight + 10);
    });
}


