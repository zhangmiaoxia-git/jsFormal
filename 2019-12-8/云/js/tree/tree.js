//获取左侧菜单栏的范围元素
const $menu = $('.menu');

//onoff 是为了弹框中的移动，当点击的时候，不能改变页面中的其他东西
function createTree(num,onoff){

    if(onoff){
        $menu.children().children().find('ul').remove();
    }
    
    //获取当前点击的对应的子级
    let ary = getChild(data,num);
    // console.log(ary);
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
            //当点击之后，把i的class替换为open
            if(this.children[0].classList.toggle('open')){
                //通过item.id获取点击的数据下的子级，继续放入li中
                $(this).append(createTree(item.id));
                //当点击左侧菜单栏的时候，页面数据展示以及面包屑导航也要随着一起改变
                render(item.id);
                createMenu(item.id);
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
$menu.children().children().append(createTree(0));