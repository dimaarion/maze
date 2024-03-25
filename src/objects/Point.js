import Body from "./Body";
export default class Point extends Body{

    constructor(props) {
        super(props);
    }

    setup(t,map){
        this.rectangle(t,map,{isSensor:true})
    }

    draw(){

    }
}