//获取放文件夹的元素
const $folders = $('#floders');
//获取显示空文件夹元素
const $empty = $('.floder_empty');
//获取全选元素
const $checkAll = $('.checkAll');
//获取右侧主要内容展示区域的元素
const $contentList = $('#content_list');
let every = true;
let returnVal = false;
let parentId = 0;
//渲染数据
function render(num=0){
    every = true;
    //每次清空folders
    $folders.html('');
    //获取当前数据下的子级
    let d = tools.getChild(data,num);
    //在全局作用域下声明一个list变量，每次执行render的时候，都把当前需要显示的最新的数据放到list中，在其他地方可能会用到最新的数据
    list = d;
    // console.log(d);
    //判断如果当前数据下没有子级，就显示空文件夹，否则就展示最新的数据
    if(!d.length){
        $empty.show();
        $contentList.css('background','#f6f7fb');
        $checkAll.removeClass('check_all');
        return;
    }
    //有子级的情况下，隐藏空文件夹
    $empty.hide();
    //声明一个变量every，默认为true，方便下面全选做判断用
    // let every = true;
    // console.log(every);
    //循环展示数据
    $.each(d,(i,item)=>{
        // console.log(item);
        //判断每一项是否都被选中，只要有一个没有被选中，全选按钮就不能被选中
        if(!item.checked){
            //修改every的值
            every = false;
            $checkAll.removeClass('check_all');
        }
        //获取当前数据的信息，可以把id放在当前元素的div中
        let {id,title,checked} = item;
        // console.log(id);
        let $folder = $(`
            <div class="folder ${checked?'active':''}" did="${id}">
                <img src="./img/folder-b.png" alt="">
                <input type="text" value="${title}" placeholder="请设置文件名">
                <p>${title}</p>
                <i class="checked ${checked?'check_active':''}"></i>
            </div>
        `);
        $folder.find('input').hide();
        $folders.append($folder);

        //双击图片查看子级的详细信息
        //获取img元素
        $img = $folder.find('img');
        //双击事件
        $img.dblclick(function(){
            //获取点击的元素的父级的id
            let id = $(this).parent().attr('did')*1;
            parentId = id;
            //双击进入文件夹之后，先把当前数据对应的checked值修改为false
            d.forEach(item=>item.checked=false);
            //清除全选
            $checkAll.removeClass('checked');
            render(id);
            //联动面包屑导航
            createMenu(id);
        });

        //点击复选框选中
        //获取folder中的i标签
        let $i = $folder.find('i');
        //点击事件
        $i.click(function(){
            //修改数据中的checked值，每次点击取反即可
            data[id].checked = !data[id].checked;
            //渲染当前的数据
            render(num);
        });
    });

    //判断every如果是true，那么全选按钮就选中
    if(every){
        $checkAll.addClass('check_all');
    }

    //点击全选按钮，选中所有的
    $checkAll.off().click(function(){
        //如果list是空数组，那么点击全选不再执行，不再渲染页面
        if(!list.length)return;
        //修改数据中的checked值，取反即可
        d.forEach(item=>item.checked = !every);
        render(num);
    });
}
render(0);