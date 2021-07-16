import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function City() {
    const router = useRouter()
    const cityDetail = router.query.citydetail
    const[cityData, setCityData]=useState([]);
    const[unitUsed, setUnitUsed]=useState("");
    const[nextDaysWeather, setNextDaysWeather]=useState([]);
    const[doesCityExist, setDoesCityExist]=useState();
    
    useEffect(()=>{
        setTimeout(() => {
            setCityData(JSON.parse(localStorage.getItem("city-data")));
            setUnitUsed(JSON.parse(localStorage.getItem("unit")));
        }, 2000);
      
    }, [])

    const setNextDaysWeatherData = () => {
        setNextDaysWeather(cityData.list);
    }

    useEffect(()=>{
      const apiKey = '7b3650e804488da60201c155f7feadeb';
      const count = 7;
      const parts = window.location.href.split("/");
      const result = parts[parts.length - 1]
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${result}&units=${JSON.parse(localStorage.getItem("unit"))}&cnt=${count}&APPID=${apiKey}`)
      .then((res) => {if(res.data.city.name.length>0){localStorage.setItem("city-exist", true)}; localStorage.setItem('city-data', JSON.stringify(res.data)); setCityData(res.data);})
      .catch((err) =>  {setDoesCityExist(false); localStorage.setItem("city-exist", false)});
    }, [])

    useEffect(()=>{
        setNextDaysWeatherData();
    },[cityData])

    if(doesCityExist==false){
      return (<div>Wrong city name</div>)
    }
    else  { 
      return (
      
        <div>
          <h3>City details inside {cityDetail}</h3>
          <div>The temperature in {cityData.city?.name} is {cityData.list && cityData.list[0].main?.temp} ({unitUsed})</div>
          <div>The temperature for the next 7 days is respectively:</div>
          <div>
              {nextDaysWeather && nextDaysWeather.map((day)=>{
                      return day.main.temp + ", "        
          })}
          </div>
        </div>
      )}
    }
  