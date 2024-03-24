export function getObjects(map,name){
    return map.objects.map((obj)=>obj.objects.map((el)=>el).filter((f)=>f.name === name)).filter((fb)=>fb.length > 0)[0]
}