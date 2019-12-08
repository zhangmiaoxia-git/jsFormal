let tools = (function(){
    //通过父级的id，获取父级下的自己
    function getChild(data,id=0){
        // console.log(data);
        // console.log(id);
        //判断如果没有数据的话，直接返回null
        if(!data[id])return null;
        //获取数组的索引，根据索引获取对应的数据
        let ary = Object.keys(data);
        // console.log(ary);
        //根据索引取到数据中的pid，判断pid是否等于数据中的id，如果相等，那么就返回pid下所有的子级数据
        // console.log(ary.filter(item=>data[item].pid === id));  //获取父级下的子级id
        // console.log(ary.filter(item=>data[item].pid === id).map(item=>data[item]));
        return ary.filter(item=>data[item].pid === id).map(item=>data[item]);
    }

    //获取当前数据的一个父级的数据
    function getParent(id){
        //判断pid如果是-1的话，就已经是最顶级的了，不需要再获取数据了
        if(data[id].pid === '-1')return null;
        //返回当前数据的上一个父级的数据
        return data[data[id].pid];
    }

    //获取当前数据的所有父级
    function getParents(id){
        //获取一个父级的数据
        let pdata = getParent(id);
        //把当前数据放在ary中
        let ary = [data[id]];
        while(pdata){
            //每次都把父级放在ary中
            ary.unshift(pdata);
            pdata = getParent(pdata.id);
        }
        return ary;
    }

    return {
        getChild,
        getParents
    }
})();