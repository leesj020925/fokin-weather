import React from 'react';
import { Alert } from "react-native";
import Loading from "./loading";
import * as Location from "expo-location";
import axios from 'axios';
import Weather from "./Weather";

const API_KEY = "df0e52851a999f532601b4c538f11288";

export default class App extends React.Component {
  state = {
    isLoading: true,
    condition: "Clear",
  };
  getWeather = async(latitude, longitude) => {
    const { 
      data: {
        main: {temp},
        weather
      } 
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    console.log("weather : ", weather);
    this.setState({
      isLoading:false,
      condition: weather[0].main,
      temp
    });
  }
  getLocation = async() => {
    try{
      await Location.requestPermissionsAsync();
      const { 
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    }catch(error){
      Alert.alert("Can't find you.", "So sad");
    }
  }
  componentDidMount(){
    this.getLocation();
  }

  _changePicker = (title) => {
    this.setState({condition: title});
  }

  render(){
    const {
      isLoading,
      temp,
      condition
    } = this.state;
    const {
      _changePicker
    } = this;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} _changePicker={_changePicker} />;
  }
}
