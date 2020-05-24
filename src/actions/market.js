import {MARKET_SUCCESS,RESULT_EMPTY} from '../config';
import axios from 'axios';
import { toast } from "react-toastify";
export const searchMarket = ({name,category,latitude,longitude}) => {
     return async (dispatch) =>{
         try{
            const market =  await axios.get(`https://agromarketplace.herokuapp.com/all-markets`,{
                                        params:{
                                            name,
                                            category,
                                            latitude,
                                            longitude,
                                        }
                               })
                               if(market.data.response.length === 0){
                                  return dispatch({
                                    type: RESULT_EMPTY,
                                    payload:'No result found'
                                  })
                               }
                               toast.success("success")
                               return dispatch({
                                type: MARKET_SUCCESS,
                                payload:market.data
                             })
                            }catch(e){
                                console.log(`${e}`)
                                toast.error(`${e}`);
                            }
        }
}