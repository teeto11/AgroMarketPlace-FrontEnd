import {MARKER_SUCCESS, MARKET_SUCCESS} from '../config'
const initalState = {
   market:[]

}

export default function market (state=initalState,action){
    const{type,payload} = action
    
    switch(type){
        case MARKET_SUCCESS:
        return{
            ...state,market:payload
        };
        default:
        return state;
    }
}