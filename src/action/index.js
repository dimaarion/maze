export function getObjects(map,name){

    if(map.objects.map((obj)=>obj.objects.map((el)=>el).filter((f)=>f.name === name)).filter((fb)=>fb.length > 0)[0]){
        return map.objects.map((obj)=>obj.objects.map((el)=>el).filter((f)=>f.name === name)).filter((fb)=>fb.length > 0)[0];
    }else {
        return [{}];
    }

}

export function arrayCount(c = 0,n) {
    let a = [];
    for (let i = c; i <= n; i++) {
        a[i] = i + 1;
    }
    return a;
}