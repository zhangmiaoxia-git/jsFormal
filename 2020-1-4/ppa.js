const ppa = {
    template:'#ppa',
    created(){
        console.log(this.$parent.num);
    },
    inject:['ary2']
}