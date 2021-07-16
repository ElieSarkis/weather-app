import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));
export default function Main({ unitValue, setUnitValue, chosenCity, setChosenCity, cityChanged, setCityChanged, isCityAvailable }) {
  const classes = useStyles();
  const router = useRouter()

  useEffect(()=>{
  
  })

  const pickCity = (event) =>{
    setChosenCity(event.target.value);
  }

  const handleChange = (event) => {
    setUnitValue(event.target.value);
    localStorage.setItem('unit', JSON.stringify(event.target.value));
  };
  
  const searchCity = () => {
    setCityChanged(!cityChanged);
      router.push({pathname: `city/${chosenCity}`})
  }

    return (
      <div>
<div className={styles.select_container}>
<form className={classes.root} noValidate autoComplete="off">
<input type="text" name="name"  value={chosenCity} onChange={pickCity} />
    </form>
    <div className={classes.button}>
    <button onClick={searchCity}>
    Pick City
</button>
    </div>
      </div>
<div className={styles.select_container}>
        <FormControl className={styles.form_container}>
        <InputLabel>Units</InputLabel>
        <Select
          value={unitValue}
          onChange={handleChange}
        >
          <MenuItem value={"kelvin"}>kelvin</MenuItem>
          <MenuItem value={"imperial"}>imperial</MenuItem>
          <MenuItem value={"metric"}>metric</MenuItem>
        </Select>
      </FormControl>
</div>
      </div>
    )
  }


  