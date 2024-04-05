import Body from "./Body";
import {getObjects} from "../action";
export default class Platform {

    setup(t,map){
        getObjects(map,"platform").map((b) => {
            return  t.matter.add.rectangle(b.x + b.width / 2, b.y + b.height / 2, b.width, b.height, {label: b.type, isStatic:true})
        })

    }

}