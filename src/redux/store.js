import { combineReducers } from "redux";


export function money(state = 0, action) {
    switch (action.type) {
        case "MONEY":
            return state = action.money;
        default:
            return state;
    }
}

export function activeMobMenu(state = {preload:"noActive",heigiht:0}, action) {
    switch (action.type) {
        case "MOBMENU":
            return state = {preload:action.preload,heigiht:action.heigiht};
        default:
            return state;
    }
}

export function getWH(state = {width:window.innerWidth,heigiht:window.innerHeight}, action) {
    switch (action.type) {
        case "GETWH":
            return state = {width:action.width,heigiht:action.heigiht};
        default:
            return state;
    }
}

export function menuId(state = 0, action) {
    switch (action.type) {
        case "MENUID":
        return action.payload;

        default:
           return state;
    }
}



export function getMenu(state = [{}], action){
     switch (action.type) {
         case "GETMENU":
             return action.preload;
         default:
            return state;
     }
}

export function getMenuArt(state = [{}], action){
    switch (action.type) {
        case "GETMENUART":
            return action.preload;
        default:
           return state;
    }
}

export function getArticles(state = [{}], action){
    switch (action.type) {
        case "GETARTICLES":
            return action.preload;
        default:
           return state;
    }
}
export function getIcons(state = [{}], action){
    switch (action.type) {
        case "GETICONS":
            return action.preload;
        default:
           return state;
    }
}
export function getTel(state = "", action){
    switch (action.type) {
        case "GETTEL":
            return action.preload;
        default:
           return state;
    }
}
export function getHomeJson(state = [{}], action){
    switch (action.type) {
        case "HOMEJSON":
            return action.preload;
        default:
           return state;
    }
}

export default combineReducers(
    {
        getMoney:money,
        
    }
    )