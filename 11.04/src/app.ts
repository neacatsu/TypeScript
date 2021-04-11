class WeatherApp{
    cityArray: string[] = []
    city: string
    key: string="90a9b5280a6424dc8d91244921ae291e"

    constructor(){
        this.startApp()
    }

    startApp(){
        this.getWeather("Kraków",this.key)

    }

    async getWeather(cityName: string, APIKey: string) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
            .then(res => res.json())
            .then(data => this.handleWeatherData(data))
            .catch(err => console.error(err))
    }

    handleWeatherData(data){
        this.showWeather(data)
    }

    showWeather(data){
        const root= document.querySelector(".root");
        const div= document.createElement("div");
        const h2= document.createElement("h2");
        const temp= document.createElement("span");
        const pressure= document.createElement("span");
        const humidity= document.createElement("span");

        h2.innerText=data.name;
        temp.innerText=data.main.temp;
        pressure.innerText=data.main.pressure;
        humidity.innerText=data.main.humidity;

        div.appendChild(h2);
        div.appendChild(temp);
        div.appendChild(pressure);
        div.appendChild(humidity);
        root.appendChild(div);
    }


}
const weatherApp= new WeatherApp()