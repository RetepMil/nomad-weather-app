import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "1e25c8d10db166fd0c24d45b84a9c007";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (lat, long) => {
    const { data } = await axios.get(
      `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  };
  getLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
    } catch (error) {
      Alert.alert("Can't find you", "So sad");
    }
    this.getWeather(lat, long);
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
  }
}
