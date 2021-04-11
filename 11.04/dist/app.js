var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WeatherApp {
    constructor() {
        this.cityArray = [];
        this.key = "90a9b5280a6424dc8d91244921ae291e";
        this.startApp();
    }
    startApp() {
        this.getWeather("Kraków", this.key);
    }
    getWeather(cityName, APIKey) {
        return __awaiter(this, void 0, void 0, function* () {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
                .then(res => res.json())
                .then(data => this.handleWeatherData(data))
                .catch(err => console.error(err));
        });
    }
    handleWeatherData(data) {
        this.showWeather(data);
    }
    showWeather(data) {
        const root = document.querySelector(".root");
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const temp = document.createElement("span");
        const pressure = document.createElement("span");
        const humidity = document.createElement("span");
        h2.innerText = data.name;
        temp.innerText = data.main.temp;
        pressure.innerText = data.main.pressure;
        humidity.innerText = data.main.humidity;
        div.appendChild(h2);
        div.appendChild(temp);
        div.appendChild(pressure);
        div.appendChild(humidity);
        root.appendChild(div);
    }
}
const weatherApp = new WeatherApp();
