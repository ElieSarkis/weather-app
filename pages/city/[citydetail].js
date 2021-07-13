import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function City() {
    const router = useRouter()
    const cityDetail = router.query.citydetail
    const[cityData, setCityData]=useState([]);
    const[unitUsed, setUnitUsed]=useState("");
    const[nextDaysWeather, setNextDaysWeather]=useState([]);
    
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
        setNextDaysWeatherData();
    },[cityData])

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
    )
  }
  