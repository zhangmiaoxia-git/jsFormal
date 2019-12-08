//获取删除按钮
const $del = $('#del');
//获取重命名按钮
const $rename = $('#rename');
//删除操作
$del.click(function(){
    // console.log(list);
    //判断至少要有一个文件夹被选中，如果都没有被选中，那么需要给出提示，请选择一个文件，用some做判断
    if(list.some(item=>item.checked)){
        //获取list中的pid，为了删除之后重新渲染页面
        let {pid} = list[0];
        //循环删除数据中被选中的数据
        list.forEach(item=>{
            //判断如果被选中就删除选中的那条数据
            if(item.checked){
                delete data[item.id];
            }
        });
        //重新渲染页面
        render(pid);
    }else{
        alert('请选择文件');
    }
});


//重命名
$rename.click(function(){
    returnVal = true;
    //过滤已被选中的数据
    let reData = list.filter(item=>item.checked);
    //判断只有被选中的文件夹才可以重命名
    if(list.some(item=>item.checked)){
        //判断每次重命名只能重命名一个文件，不能超过一个
        if(reData.length === 1){
            //获取被选中的文件元素
            $folder = $folders.find('.active');
            //获取被选中的元素下的p标签元素
            let $p = $folder.find('p');
            //获取被选中的元素下的input标签
            let $txt = $folder.find('input');
            //隐藏p标签
            $p.hide();
            //显示input标签
            $txt.show();
            //input标签中的文字聚焦
            $txt.select();
            //失焦事件
            $txt.blur(function(){
                //判断用户如果没有修改名字，那么直接让p标签显示即可，隐藏input标签
                //获取input标签中的value值
                let val = $txt.val();
                if($p.text() === val){
                    $p.show();
                    $txt.hide();
                }else{
                    if(!val){
                        // alert('请填写内容');
                        console.log('请填写内容');
                        //如果没有填写内容，那么就将p标签的内容放入input中
                        $txt.val($p.text());
                        //让input标签中的内容聚焦
                        $txt.select();
                        return;
                    }
                    //获取被选中的文件的id，pid
                    let {id,pid} = reData[0];
                    //获取当前页面中没有被选中的文件的数据
                    let siblings = list.filter(item=>item.id != id);
                    //判断选中的文件的名字是否与其他文件有重名，如果有重名，则给出提示，否则修改文件名称
                    if(siblings.some(item=>item.title === val)){
                        console.log('重名了');
                        $txt.select();
                    }else{
                        //数据修改成功之后阻止默认行为
                        returnVal = false;
                        //修改数据中的文件名称
                        data[id].title = val;
                        //修改数据中的checked值
                        data[id].checked = false;
                        //重新渲染页面
                        render(pid);
                    }
                }
            });
        }else{
            alert('只能选择一个文件');
        }
    }else{
        alert('请选择文件');
    }
});