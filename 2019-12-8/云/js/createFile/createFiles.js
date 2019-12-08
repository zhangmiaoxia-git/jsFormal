let ary = [];
let nary = [];
//创建文件夹
//先在content_list中创建一个folder的div元素，当folder中的input框失焦之后把title添加到ary中，最后将最新的数据渲染在页面中
$('#create').click(function(){
    //创建文件夹
    let $folder = $(`
        <div class="folder">
            <img src="./img/folder-b.png" alt="">
            <input type="text" value="新建文件夹" placeholder="请设置文件名">
            <p>新建文件夹</p>
            <i class="checked"></i>
        </div>
    `);
    $folder.find('p').hide();
    //将创建的文件夹插入到页面中
    $('#floders').append($folder);
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
        let time = ''+Date.now();
        ary.push({
            id:time.substr(time.length-1-3,time.length-1)*1,
            pid:parentId?parentId:0,
            title:nval,
            checked:false,
        });
        ary.forEach((item)=>{
            data[item.id] = item;
        });
        for(let attr in data){
            nary.push(data[attr]);
        }
        $empty.hide();
        $contentList.css('background','none');
        let parId = '';
        parId = parentId;
        list = tools.getChild(data,parId);
        render(parId);
        $menu.children().children().append(createTree(0,true));
    });
});