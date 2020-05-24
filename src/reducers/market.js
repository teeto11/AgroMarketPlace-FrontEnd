import {MARKET_SUCCESS,RESULT_EMPTY} from '../config'
const initalState = {
   market:null,
  message:null
}

export default function market (state=initalState,action){
    const{type,payload} = action
    
    switch(type){
        case MARKET_SUCCESS:
        return{
            ...state,
            market:payload.response,
            message:payload.message
        };
        case RESULT_EMPTY:
        return{
            ...state,
            message:payload
        }
        default:
        return state;
    }
}