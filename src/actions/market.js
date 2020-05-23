import {MARKET_SUCCESS} from '../config';
import axios from 'axios';
import { toast } from "react-toastify";
export const searchMarket = ({name,category,latitude,longitude}) => {
    console.log(name)
    const obj = {
        name,
        category,
        latitude,
        longitude,
    }
   console.log(obj)
   //name=${obj.name}&&category=${obj.category}
     return async (dispatch) =>{
         try{
            const market = await axios.get(`http://localhost:3000/all-markets`,{
                                        params:{
                                            name,
                                            category,
                                            latitude,
                                            longitude,
                                        }
                               })
                            console.log(market);
                            toast.success("yay");
                            return dispatch({
                                type: MARKET_SUCCESS,
                                payload:market.data.response
                            })
                           
                            }catch(e){
                                console.log(`${e}`)
                                toast.error(`${e}`);
                            }
       //  const market = await axios.post(`https://agromarketplace.herokuapp.com/all-markets/${obj}`)

        }
}