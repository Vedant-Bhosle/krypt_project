
import React, { useEffect,useState} from 'react';
const API_KEY=process.env.GIPHY_API;

const useFetch=({keyword})=>{
    const [gifUrl, setgifUrl] = useState("")
    const fetchgifs=async()=>{
        try {
            const response =await fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);

            const {data}=await response.json();

            setgifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            setgifUrl('https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif')
        }
    }


useEffect(()=>{
if(keyword)fetchgifs();
},[keyword])


return gifUrl;


}

export default useFetch;