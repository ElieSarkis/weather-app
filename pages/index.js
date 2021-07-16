import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import Main from './components/main'
import axios from 'axios';

export default function Home() {
  const [unitValue, setUnitValue] = useState("kelvin");
  const [chosenCity, setChosenCity] = useState("Beirut");
  const [cityChanged, setCityChanged] = useState(false)
  const [isCityAvailable, setIsCityAvailable] = useState(false)
  const [cityData, setCityData] = useState([])

  useEffect(()=>{
    const savedUnitValue = localStorage.getItem('unit');
    setUnitValue(JSON.parse(savedUnitValue));
    const apiKey = '7b3650e804488da60201c155f7feadeb';
    const count = 7;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&units=${unitValue}&cnt=${count}&APPID=${apiKey}`)
    .then((res) => {if(res.data.city.name.length>0){localStorage.setItem("city-exist", true)}; localStorage.setItem('city-data', JSON.stringify(res.data)); setCityData(res.data);})
    .catch((err) =>  localStorage.setItem("city-exist", false));
  }, [cityChanged, unitValue])


  return (
    <div className={styles.container}>
     <Main unitValue={unitValue} chosenCity={chosenCity} setUnitValue={setUnitValue} setChosenCity={setChosenCity} cityChanged={cityChanged} setCityChanged={setCityChanged} isCityAvailable={isCityAvailable} cityData={cityData} />
    </div>
  )
}
