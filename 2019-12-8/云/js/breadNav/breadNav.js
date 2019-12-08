const {getParents,getChild} = tools;
//获取面包屑导航元素
const $breadNav = $('.bread_nav');

function createMenu(id){
    $breadNav.html('');
    //获取当前id下的所有父级包括自己
    let pary = getParents(id);
    //循环所有的父级
    pary.forEach((item,i,all)=>{
        let $navChild = null;
        //判断如果是最后一个的话，就用span标签包着，其他就用a标签即可
        if(i === all.length-1){
            $navChild = $(`<span>${item.title}</span>`);
        }else{
            $navChild = $(`<a href="javascript:void(0)">${item.title}</a>`);
        }

        //将child插入breadNav中
        $breadNav.append($navChild);

        //当点击面包屑导航的时候，让文件夹与面包屑导航联动
        $navChild.click(function(){
            //点击面包屑导航之后，需要把复选框选中的清空，也就是需要修改数据中的checked值
            tools.getChild(data,id).forEach(item=>item.checked=false);
            //重新渲染页面文件的显示
            render(item.id);
            //重新渲染面包屑导航
            createMenu(item.id);
            parentId = item.id;
        });
    });
}
createMenu(0);