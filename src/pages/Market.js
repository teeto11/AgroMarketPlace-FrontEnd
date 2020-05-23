import React,{useState,useCallback} from  'react'
import{useDispatch,useSelector} from 'react-redux'
import {searchMarket} from '../actions/market'
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBK4hX4LTjsPB4E8-XYBt3HFcOqzRGKb4Q");
function Market(){
    const dispatch = useDispatch();
    const markets = useSelector((state)=>(state.market))
    console.log(markets)
    const [market,setMarket] = useState({
        name:null,
        category:null,
        latitude:null,
        longitude:null
    })
    
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
    // const handleSubmit = (e) => {
    //     console.log(market)
    //     e.preventDefault();
    //     dispatch(searchMarket(market));
    //}
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
         console.log(`adddddreesss ${address}`)
         const location = await Geocode.fromAddress(address);
         const { lat, lng } = location.results[0].geometry.location;
         console.log(`${lat} ${lng}`)
         setMarket({
             ...market,
             latitude:lat,
             longitude:lng
         })
        // const address1 = await Geocode.fromLatLng(`${lat}`, `${lng}`)
        // const theaddress = address1.results[0].formatted_address;
        // console.log(`the address is ${theaddress}`)
    //     var geocoder = new google.maps.Geocoder();
    //     geocoder.geocode( { 'address': address}, function(results, status) {
      
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         var latitude = results[0].geometry.location.lat();
    //         var longitude = results[0].geometry.location.lng();
    //         console.log(latitude, longitude);
    //         } 
    //     }); 
      }
  //console.log(market)
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
                         
                         onChange={(e)=>e.target.value !='' ? getLocation(e):''} 
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
      </div>
    )
}
export default Market