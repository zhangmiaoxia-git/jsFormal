let ary = [
    // {
    //     id:1,
    //     title:'新建文件夹',
    // },
    // {
    //     id:2,
    //     title:'新建文件夹(1)'
    // }
];
//渲染数据
function render(arr){
    $('#folders').html('');
    //清空content_list内容，shiwei
    $.each(arr,(i,ele)=>{
        //页面展示数据
        let $folder = $(`
            <div class="folder">
                <img src="./img/folder-b.png" alt="">
                <input type="text" value="新建文件夹" placeholder="请设置文件名">
                <p>${ele.title}</p>
            </div>
        `);
        //隐藏input框
        $folder.find('input').hide();
        //把数据插入到content_list元素中，展示在页面中
        $('#folders').append($folder);
    });
}
render(ary);

//创建文件夹
//先在content_list中创建一个folder的div元素，当folder中的input框失焦之后把title添加到ary中，最后将最新的数据渲染在页面中
$('#create').click(function(){
    //创建文件夹
    let $folder = $(`
        <div class="folder">
            <img src="./img/folder-b.png" alt="">
            <input type="text" value="新建文件夹" placeholder="请设置文件名">
        </div>
    `);
    //将创建的文件夹插入到页面中
    $('#folders').append($folder);
    //input框失焦之后，将数据push大数组中
    //获取input框
    let $txt = $folder.find('input');
    //创建一个文件夹后，让input框中的文字聚焦
    $txt.select();
    //input框失焦之后将数据push到ary中
    $txt.blur(function(){
        //获取input框中的内容
        let val = $txt.val() ? $txt.val() : '新建文件夹';
        //判断是否重名
        bool = ary.map(item=>item.title).includes(val);
        //定义一个变量，存放新的内容
        let nval = '';
        let num = 1;
        nval = val;
        while(bool){
            //在循环外面判断如果title已存在，说明新建文件夹名字已存在，在循环中判断是为了判断结尾是数字的新建文件夹是否已存在，如果已存在，那么继续执行循环
            let s = val.replace(/\(\d\)$/,'')+'('+ num++ +')';
            bool = ary.map(item=>item.title).includes(s);
            nval = s;
        }
        ary.push({
            id:+new Date,
            title:nval,
        });
        render(ary);
    });
});
//画框拖拽碰撞
function dragDiv(){
    $contentList = $('#content_list');
    //获取drag元素（要画框的元素）
    $drag = $('#drag');
    $disX = $disY = 0;
    //鼠标按下触发事件
    $contentList.mousedown(function(ev){
        //获取最新的folder元素
        $folder = $('.folder');
        $folder.css({
            background:'',
        });
        // console.log(ev);
        //按下的距离就是鼠标移动的距离
        $disX = ev.pageX;
        $disY = ev.pageY;
        // console.log($disX,$disY);
        //按下的时候让画框的元素展示
        $drag.show();
        $drag.css({
            top:$disY+'px',
            left:$disX+'px',
        });
        //移动事件
        $(document).mousemove(function(ev){
            //判断如果按下的值比移动的值大，那么left，top值就是移动的值，如果移动的值比按下的值小，那么left，top值就是按下的值
            $drag.css({
                top:Math.min(ev.pageY,$disY),
                left:Math.min(ev.pageX,$disX),
            });

            //碰撞，画框之后选中每个folder
            $folder.each((i,ele)=>{
                // console.log(ele);
                //获取画框的元素的绝对位置
                let {left:l,top:t,bottom:b,right:r} = $drag[0].getBoundingClientRect();
                //获取ele的绝对位置
                let {left:l2,top:t2,bottom:b2,right:r2} = ele.getBoundingClientRect();

                if(l > r2 || b < t2 || r < l2 || t > b2){
                    ele.style.background = '';
                }else{
                    ele.style.background = '#D0D0D0';
                }
            });

            //画框的元素的宽高就是移动了多少距离，移动了多少距离=移动的至-按下的值
            // console.log(ev.offsetX-$disX,ev.offsetY-$disY);
            $drag.css({
                width:Math.abs(ev.pageX-$disX),
                height:Math.abs(ev.pageY-$disY),
            });
        });
        //抬起事件
        $(document).mouseup(function(){
            //让画框的元素隐藏，并且改变画框元素的样式
            $drag.css({
                display:'none',
                width:0,
                height:0,
                top:0,
                left:0,
            });
            //清除移动事件
            $(document).off('mousemove');
            //清除抬起事件
            $(document).off('mouseup');
        });
        //阻止默认事件
        ev.returnValue = false;
    });
}
dragDiv();