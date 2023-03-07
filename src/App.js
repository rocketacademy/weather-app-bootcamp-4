import React from "react";

import "./App.css";
import axios from "axios";

const OPEN_WEATHER_API_KEY = "45651fd897bc1b78c7e02316c234053c";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCity: "",
      currWeatherDescription: "",
      currCity: "",
      currTemp: 0,
      error: false,
    };
  }
  handleChange = (event) => {
    let currUserInput = event.target.value;
    this.setState({
      inputCity: currUserInput,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    let currTemp = "";
    let currCity = "";
    let currTempKelvin = "";
    let currWeatherDescription = "";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        currTempKelvin = response.data.main.temp - 273.15;
        currTemp = Math.round(currTempKelvin * 100) / 100;
        currWeatherDescription =
          response.data.weather[0].main +
          "," +
          response.data.weather[0].description;
        currCity = response.data.name;

        this.setState({
          inputCity: "",
          currCity: currCity,
          currTemp: currTemp,
          currWeatherDescription: currWeatherDescription,
          eroor: false,
        });
      })
      .catch((error) => {
        this.setState({
          inputCity: "",
          error: true,
        });
      });
  };
  render() {
    let outputMessage = "";
    if (this.state.error === true) {
      outputMessage = "please enter city name.";
    } else {
      outputMessage =
        "please enter a city name to find the weather description!";
    }
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            City:
            <input
              type="name"
              name="City"
              value={this.state.inputCity}
              onChange={this.handleChange}
            />
            <input type="submit" value="submit" />
          </form>
          {this.state.currTemp !== "" && this.state.error !== true ? (
            <div>
              <p>currCity: {this.state.currCity}</p>
              <p>currTemperature: {this.state.currTemp} °C</p>
              <p>currWeatherDescription: {this.state.currWeatherDescription}</p>
            </div>
          ) : (
            <p>{outputMessage}</p>
          )}
        </header>
      </div>
    );
  }
}
export default App;
