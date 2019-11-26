class Tab{
    constructor(that){
        this.box = that;  //jquery对象，接收id为box的div
        // console.log(this.box);
        this.opts = {
            btns:['按钮一','按钮二','按钮三'],
            content:[
                '111',
                '222',
                '333',
            ],
        };
    }
    init(opts){
        //深度克隆，替换按钮的值
        $.extend(true,this.opts,opts);
        this.createBtn();
        this.createDiv();
        this.events();
    }
    //创建按钮
    createBtn(){
        this.opts.btns.forEach((item,i)=>{
            let $button = `<button class="${i===0?'active':''}">${item}</button>`;
            this.box.append($button);
        });
    }
    //创建div
    createDiv(){
        this.opts.content.forEach((item,i)=>{
            let $div = `<div class="${i===0?'show':''}">${item}</div>`;
            this.box.append($div);
        });
    }
    //执行事件
    events(){
        this.btns = this.box.find('button');
        this.divs = this.box.find('div');
        let that = this;

        this.btns.click(function(){
            $(this).addClass('active').siblings('button').removeClass('active');
            that.divs.eq($(this).index('button')).addClass('show').siblings('div').removeClass('show');
        });
    }
}

class Drag{
    constructor(that){
        this.box = that;
        this.disX = 0;
        this.disY = 0;
    }
    init(){
        this.mousedown();
        this.position();
    }
    //给box定位
    position(){
        this.box.css({
            position:'absolute',
            left:0,
            top:0,
        });
    }
    //鼠标按下
    mousedown(){
        let that = this;
        this.box.mousedown(function(ev){
            that.disX = ev.pageX - $(this).offset().left;
            that.disY = ev.pageY - $(this).offset().top;
            that.mousemove();
            that.mouseup();
            return false;
        });
    }

    //鼠标移动
    mousemove(){
        let that = this;
        $(document).mousemove(function(ev){
            that.box.css({
                left:ev.pageX - that.disX,
                top:ev.pageY - that.disY,
            });
        });
    }

    //鼠标抬起
    mouseup(){
        $(document).mouseup(function(){
            $(this).off('mousemove');
            $(this).off('mouseup');
        });
    }

}

//创建一个功能方法，使用$.fn.extend
$.fn.extend({
    //tab切换
    tabs:function(opts){
        // console.log(this);  //$('#box')
        let t = new Tab(this);
        t.init(opts);
        return this;
    },
    //拖拽
    dialog:function(){
        let d = new Drag(this);
        d.init();
    }
});