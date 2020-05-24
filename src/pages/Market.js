import React,{useState,useCallback,useEffect} from  'react'
import{useDispatch,useSelector} from 'react-redux'
import {searchMarket} from '../actions/market'
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_API_KEY);

function Market(){
    const dispatch = useDispatch();
    const markets = useSelector((state)=>(state.market))

    const [market,setMarket] = useState({
        name:null,
        category:null,
        latitude:null,
        longitude:null,
        address:null
    })

    const [add, setAdd] = useState([]);

    const handleChange = (e) => {
        setMarket({
            ...market,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = useCallback((e)=>{   
        e.preventDefault();
        dispatch(searchMarket(market));
     },[dispatch,market])

    const showPosition = () => {
           if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude)
                setMarket({
                    ...market,
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                })   
            });
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }
     const getLocation = async (e) => {
         const address = e.target.value 
         const location = await Geocode.fromAddress(address);
         const { lat, lng } = location.results[0].geometry.location;
         setMarket({
             ...market,
             latitude:lat,
             longitude:lng
         })
      }
      
     const convert = useCallback(
        async () => {
            let address = [];
            const myMarkets = markets.market;
            console.log("market.market",markets.market)
            console.log('mu market', myMarkets);
            if (Array.isArray(myMarkets)){
                for(let market of myMarkets)
                    {
                        const [latitude, longitude] = market.address;
                        let address1 =  await Geocode.fromLatLng(`${latitude}`, `${longitude}`)
                        let githubUser = await address1;
                        address.push(githubUser.results[0].formatted_address);
                        console.log('indide address', address)
                        console.log('other', address1.results[0].formatted_address)
                    }
                    setAdd(address);
            }
        }     
     ,[markets.market])  
     console.log('add2', add);
   useEffect(()=>{
       convert()
   },[markets.market])
    return(
        <div>
            <div className="card-header">
                Search by any field 
            </div>
            <div className="card-body">
                <form className="form-inline">
                    <div className="form-group">
                        <label className="sr-only" for="exampleInputEmail3">Market Name</label>
                        <input type="text"
                         name="name" 
                         className="form-control"
                         onChange={(e)=>handleChange(e)} id="" 
                         placeholder="market name"/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" for="exampleInputPassword3">Category</label>
                        <input type="text"
                        name="category" 
                        className="form-control" id=""
                         onChange={(e)=>handleChange(e)} 
                         placeholder="Category"/>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" for="exampleInputPassword3">Address</label>
                        <input type="text"
                         name="address"
                         className="form-control"
                         
                         onChange={(e)=>e.target.value !=='' ? getLocation(e):''} 
                         id="" placeholder="Address"/>
                    </div>
                    <div className="checkbox">
                        <label>
                        <input type="checkbox"
                        onClick={()=>showPosition()}
                        />click to use location
                        </label>
                    </div>
                    <button type="submit" onClick={(e)=>handleSubmit(e)}  className="btn btn-default">Search</button>
                </form>
            </div>
           
            {
             markets.message !==null ?   markets.message : ''
            }
         {
            markets.market !==null ? markets.market.map((result, index)=>{
                 return(
                    <div className="row">
                        <div className="col-sm-6">
                            <ol className="list-unstyled" key={result.name}>
                                <li>
                                    {result.name}
                                </li>
                                <li>
                                    {result.category}
                                </li>
                                <li> 
                                     <label>{add[index]}</label>
                                </li>
                                <li>
                                    {result.image.map(tee =>{
                                        return(
                                            <div key={tee}> 
                                                <p>image:<img src={`data:image/jpeg;base64,${tee}`} alt="img" style={{width:42}} className="rounded-circle" /> </p>
                                            </div>
                                    )
                                })}
                            </li>
                           </ol>
                        </div>
                           
                      </div>

                 ) 
            }) : ''   
        }        
       
      </div>
    )
}
export default Market