new Vue({
    el:'.todoapp',
    data:{
        all:false,
        val:'',
        ary:[],
        hash:window.location.hash || '#/all'
    },
    created(){
        window.onhashchange = ()=>{
            this.hash = window.location.hash;
        }
        this.ary = getData();
    },
    methods:{
        //回车添加数据
        add(){
            if(!this.val)return;
            this.ary.unshift({
                id:''+new Date,
                txt:this.val,
                checked:false,
                onoff:false
            });
            this.val = '';
        },
        //删除
        rm(id){
            this.ary = this.ary.filter(e=>e.id !== id);
        },
        //切换全选
        changeAll(ev){
            this.ary = this.ary.map((e)=>{
                e.checked = ev.target.checked;
                return e;
            });
        },
        //双击修改
        replace({id,txt},num){
            this.onoff_FN(id,true);
            //双击之后，让内容聚焦选中
            Vue.nextTick(()=>{
                this.$refs.edit[num].focus();
            });

        },
        //失焦事件
        off({id,txt,onoff},ev){
            //如果onoff为false说明触发了esc，不需要修改数据
            if(!onoff)return;
            const {value} = ev.target;
            //判断有新增的数据，并且与原来的不一样，则需要修改数据
            if(value && txt != value){
                this.ary.forEach(e=>{
                    if(e.id === id){
                        e.txt = value;
                    }
                });
            }
            //将onoff改为false
            this.onoff_FN(id,false);
        },
        //修改数据中的onoff
        onoff_FN(id,bool){
            this.ary.forEach(e=>{
                if(e.id === id){
                    e.onoff = bool;
                }
            });
        }
    },
    filters:{
        unchecked(val){
            return val.filter(e=>!e.checked).length;
        }
    },
    computed:{
        hashAry(){
            const {ary,hash} = this;
            return ary.filter(item=>{
                switch(hash){
                    case '#/all':
                        return item;
                    case '#/unchecked':
                        return !item.checked;
                    case '#/checked':
                        return item.checked;
                    default:
                        return item;
                }
            });
        }
    },
    watch:{
        //监听数据发生变化的时候，是否全选
        ary:{
            handler(){
                // this.all = this.ary.every(e=>e.checked);
                this.all = !!this.ary.length && this.ary.every(e=>e.checked);
                if(this.ary.length){
                    localStorage.setItem('data',JSON.stringify(this.ary));
                }
            },
            deep:true,
            immediate:true
        }
    }
});

function getData(){
    let d = localStorage.getItem('data');
    return d?JSON.parse(d):[
        {
            id:0,
            txt:'哈哈',
            checked:false,
            onoff:false
        },
        {
            id:1,
            txt:'呵呵',
            checked:true,
            onoff:false
        }
    ]
}