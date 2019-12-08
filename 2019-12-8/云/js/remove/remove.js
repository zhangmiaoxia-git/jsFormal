//获取移动的按钮元素
$move = $('#move');
//获取要显示的元素
$move_file = $('.move_file');
//获取要插入的父元素
$tree_list = $('#tree_list').children();

let that = null;
//声明一个变量，为了在点击确定按钮的时候拿到当前点击的id
let btnCode = -1;
function createModelTree(num){
    //获取当前点击的对应的子级
    let ary = getChild(data,num);
    //判断点击的数据下是否存在子级，如果存在，则继续往下执行，否则不往下执行
    if(!ary.length)return;
    
    //创建一个子级的ul
    let $ul = $(`<ul style="margin-left:10px"></ul>`);
    //循环获取到的当前数据的子级
    ary.forEach(item=>{
        let $li = $(`<li>
                        <div class="tree_nav tree_ico">
                            <span><i></i>${item.title}</span>
                        </div>
                    </li>
                `);
        //将li放入到ul中
        $ul.append($li);

        //判断li下是否有子级，如果有子级，文件夹图片就是展开的样式，否则，就是不展开的样式
        if(!getChild(data,item.id).length){
            $li.find('i').css('background','none');
        }

        //点击li
        $li.off().click(function(){
            let reData = list.filter(item=>item.checked);
            //判断选中的文件的id与点击的文件的id是否一样，如果一样，那么就不把点击的id赋值给code
            if(reData.some(d=>d.id === item.id)){
                btnCode = 'error';
                return;
            }else{
                //把当前的id赋值给code
                btnCode = item.id;
            }
            //每次点击之前先清除上一次添加的背景色
            if(that){
                that.css({
                    background:'none',
                });
            }
            //点击之后，修改当前点击的li的背景色
            $(this).find('div').css({
                background:'#ccc',
            });
            that = $(this).find('div');
            //当点击之后，把i的class替换为open
            if(this.children[0].classList.toggle('open')){
                //通过item.id获取点击的数据下的子级，继续放入li中
                $(this).append(createModelTree(item.id));
            }else{
                //当闭合的时候把ul整个元素删除
                $(this).find('ul').remove();
            }
            
            return false;
        });
    });
    //返回一个ul，这个ul中是所有的文件
    return $ul;
}

//点击移动按钮显示要移动的父级的文件夹
$move.off().click(function(){
    //获取确定按钮元素
    const button = $('.button');
    //判断是否有已选中的文件，如果有就显示移动到的文件夹的元素，否则就给出提示
    let reData = list.filter(item=>item.checked);
    if(!reData.length){
        console.log('没有要移动的文件');
    }else{
        $move_file.show();
        $tree_list.find('ul').remove();
        $tree_list.append(createModelTree(0));
    }
    
    //点击确定按钮
    button.off().click(function(){
        //判断如果code为error，就给出提示
        if(btnCode === 'error'){
            console.log('非法操作');
            return;
        }
        //存储修改之前的pid，为了重新渲染页面使用
        let id = reData[0].pid;
        //点击确定按钮的时候，修改选中的数据的pid，这样选中的数据就会在点击的文件夹中
        reData.forEach(item=>{
            item.pid = btnCode;
            //移动之后，如果文件夹被选中，那么需要把选中的清除
            item.checked = false;
        });
        //重新渲染页面
        render(id);
        $menu.children().children().append(createTree(0,true));
        $move_file.hide();
    });




});