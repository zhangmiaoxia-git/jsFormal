//获取画框的元素
const $drag = $('#drag');
//获取content_list的绝对定位
const {left:content_l,top:content_t} = $contentList.offset();

$contentList.on('mousedown',function(ev){
    //设置按下的位置的值
    let disX = ev.pageX,disY = ev.pageY;
    //获取folder元素
    $folder = $folders.find('.folder');
    // console.log($(ev.target).closest('.folder').length);
    //使用closest判断当前的元素是不是文件夹，如果是，就隐藏框，否则就显示框
    if($(ev.target).closest('.folder').length)return;
    //显示画框的元素
    $drag.show().css({
        left:disX-content_l,
        top:disY-content_t,
    });

    $contentList.on('mousemove',function(ev){
        //改变drag的宽高以及top，left值
        $drag.css({
            //宽高的值=移动的值-按下的值
            width:Math.abs(ev.pageX - disX),
            height:Math.abs(ev.pageY - disY),
            //top，left值，哪个小取哪个，如果按下的值比移动的值小，那么top，left值就是按下的值，如果移动的值比按下的值小，那么left，top值就是移动的值
            left:Math.min(ev.pageX-content_l,disX-content_l),
            top:Math.min(ev.pageY-content_t,disY-content_t),
        });

        //move的时候看看，当前的框是否碰到了文件夹元素
        $folder.each((i,ele)=>{
            //获取画框元素的绝对位置，以及floder的绝对位置
            let {left:l,top:t,bottom:b,right:r} = $drag[0].getBoundingClientRect();
            let {left:l2,top:t2,bottom:b2,right:r2} = ele.getBoundingClientRect();
            if(l > r2 || t > b2 || b < t2 || r < l2){
                //没碰到的情况
                list.forEach((item)=>{
                    if(item.id === $(ele).attr('did')*1){
                        item.checked = false;
                        $(ele).find('i').removeClass('check_active');
                        $(ele).removeClass('active');
                    }
                });
            }else{
                //碰到的情况
                list.forEach((item)=>{
                    //判断如果当前的数据的id与碰到的元素的did相等，就选中文件，同时把数据中的checked修改为true，如果全选中，那么全选按钮也要选中
                    if(item.id === $(ele).attr('did')*1){
                        //修改数据中的checked值
                        item.checked = true;
                        //folder的复选框选中，并且folder选中
                        $(ele).find('i').addClass('check_active');
                        $(ele).addClass('active');
                    }
                });
            }

            //如果全选就把全选复选框选中，否则不选中
            if(list.every(item=>item.checked)){
                $checkAll.addClass('check_all');
                every = true;
            }else{
                $checkAll.removeClass('check_all');
                every = false;
            }
        });
    });

    $(document).on('mouseup',function(ev){
        $contentList.off('mousemove');
        $(document).off('mouseup');
        $drag.css({
            width:0,
            height:0,
            display:'none',
        });
        //判断抬起的值与按下的值是一样的，这样就可以不选中复选框
        if(ev.pageX === disX && ev.pageY === disY && !returnVal){
            list.forEach(item=>item.checked = false);
            $folder.each((i,ele)=>{
                $(ele).find('i').removeClass('check_active');
                $(ele).removeClass('active');
                $(ele).find('input').hide();
                $(ele).find('p').show();
            });
            every = false;
            $checkAll.removeClass('check_all');
        }

    });

    // return false;  直接写false会影响重命名之后的失焦行为，因为重命名的失焦行为是浏览器的默认行为，直接在这里写false，是不行的，在鼠标down的时候，阻止浏览器的默认行为，在重命名失焦的时候，不阻止浏览器的默认行为
    //这里是false
    ev.originalEvent.returnValue = returnVal;
});