//获取本地存储的css，如果存在，则直接放在页面中，如果不存在，则需要加载css
let style = localStorage.getItem('style');
if(!style){
    fetch('./index.css').then(e=>e.text()).then(data=>{
        let link = document.createElement('style');
        link.innerHTML = data;
        //获取head标签
        document.querySelector('head').append(link);
        //本地存储css
        localStorage.setItem('style',data);
    });
}else{
    let link = document.createElement('style');
    link.innerHTML = style;
    document.querySelector('head').append(link);
}

const lis = document.querySelectorAll('#ul1 li');
//刚开始加载页面就需要获取本地的数据
let ary = JSON.parse(localStorage.getItem('gwc')) || [];
render(ary);


//添加购物车
lis.forEach((item,index)=>{
    item.onclick = function(){
        //判断ary中是否有数据
        if(!ary.includes(this.innerText)){
            ary.push(this.innerText);
            //设置本地存储数据，默认会转成字符串
            localStorage.setItem('gwc',JSON.stringify(ary));
            // console.log(localStorage.getItem('gwc'));
            render(ary);
        }
    }
});

//只要修改了localStorage值，兄弟页面就会触发这个事件，那么兄弟页面的数据就需要修改为最新的数据
window.onstorage = function(){
    ary = JSON.parse(localStorage.getItem('gwc')) || [];
    render(ary);
}

//渲染数据
function render(ary){
    let html = ary.map(item=>`<li>${item}</li>`).join('');
    ul2.innerHTML = html;
}

//删除购物车
ul2.onclick = function(ev){
    if(ev.target.tagName === 'LI'){
        //获取ary中不等于li的innerText的数据
        ary = ary.filter(item=>item !== ev.target.innerText);
        render(ary);
        localStorage.setItem('gwc',JSON.stringify(ary));
    }
}