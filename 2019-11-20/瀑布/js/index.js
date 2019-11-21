class Tools{
    //获取最小值
    getMinIndex(obj){
        //获取被内容撑开的所有的li高度
        // console.log(Array.isArray(obj));
        //判断obj是否是为数组
        if(!Array.isArray(obj)){
            obj = [...obj].map(item=>item.scrollHeight);
        }
        //获取最小值
        let min = Math.min(...obj);
        //获取最小值的索引
        let index = obj.findIndex(item=>item===min);
        //返回最小值以及索引
        return {
            index,
            min,
        }
    }

    //防抖
    debounce(callBack,time){
        //设置一个属性timer，第一次开启定时器，当timer有值时，先关闭上一次开启的定时器
        let timer;
        //返回一个函数
        return function(...arg){
            //判断timer有值的时候，关闭定时器
            if(timer){
                clearTimeout(timer);
            }
            //开启定时器
            timer = setTimeout(()=>{
                //执行回调函数
                callBack.call(this,...arg);
            },time);
        }
    }

    //节流
    throttling(callBack,time){
        //设置一个初始时间
        let prevTime = 0;
        let timer;
        //返回一个函数
        return function(...arg){
            //获取当前时间
            let nowTime = +new Date;
            //判断当前时间-上一次的时间是否大于设置的时间，如果大于，就执行回调函数
            if(nowTime - prevTime > time){
                //执行回调函数
                callBack(this,...arg);
            }else{
                clearTimeout(timer);
                timer = setTimeout(()=>{
                    callBack.call(this,...arg);
                },time);
            }
            //将当前时间作为下一次的上一次的时间
            prevTime = nowTime;
        }
    }
}
class waterFall extends Tools{
    constructor(name){
        super();
        //获取class为body的ul
        this.box = document.querySelector(name);
        // console.log(this.box);
        //获取ul下的所有li
        this.lis = this.box.querySelectorAll('li');
        // console.log(this.lis);
        //获取ul的绝对位置top
        this.bodyT = this.box.offsetTop;
        // console.log(this.bodyT);
        //获取可视区的高度
        this.wh = window.innerHeight;
        this.loading = document.getElementById('loading');
        this.onoff = true;
    }
    //请求数据api
    api(url,callBack){
        //this要指向实例
        let that = this;
        fetch(url).then(d=>d.json()).then((data)=>{
            callBack.call(that,data);
        });
    }
    //渲染数据
    render(){
        this.onLd();
        this.changeLoading();
        setTimeout(()=>{
            this.api('./data.json',function(data){
                this.offLd();
                this.changeLoading();
                data.forEach((item,i)=>{
                    //取最小值的索引
                    let {index} = this.getMinIndex(this.lis);
                    //创建元素
                    let div = this.create(item);
                    //把div插入li中
                    this.lis[index].append(div);
                    setTimeout(()=>{
                        div.children[0].style.opacity = 1;
                    },i*100);
                });
            });
        });
    }
    //创建元素
    create({pic,desc,author,height}){
        let div = document.createElement('div');
        div.className = 'img_box';
        div.innerHTML = `
            <img src="${pic}" alt="">
            <p class="desc">${desc}</p>
            <p class="author">${author}</p>
        `;
        return div;
    }
    //下拉加载数据
    scroll(){
        let fn = () => {
            //可视区的高度+滚动条的距离>最小的li的高度+head的高度
            //最短的高度的索引
            let {index} = this.getMinIndex(this.lis);
            //获取滚动条的距离
            let sc = window.pageYOffset;
            //判断
            if(this.wh + sc > this.lis[index].scrollHeight + this.bodyT){
                this.render();
            }
        }

        window.onscroll = this.debounce(fn,200);
        window.onresize = () => {
            this.wh = window.innerHeight
        };
    }
    //判断是展示loading，还是隐藏loading
    changeLoading(){
        this.loading.style.display = this.onoff?'block':'none';
    }
    onLd(){
        this.onoff = true;
    }
    offLd(){
        this.onoff = false;
    }
}
let w = new waterFall('.body');
w.render();
w.scroll();