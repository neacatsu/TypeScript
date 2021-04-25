class WeatherApp {
    cityArray: string[] = [];
    storageArray: string[] = [];
    city: string;
    key: string = "75f816acc7b275d8f6708a1c05f5a959";

    constructor() {
        this.startApp();
    }

    startApp(): void {
        this.takeStorage();
        window.setInterval(() => this.takeStorage(), 120000);
        this.takeCity();
    }

    getWeather = async (cityName: string): Promise<void> => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${this.key}`)
            .then(res => res.json())
            .then(data => this.showWeather(data, cityName))
            .catch(err => console.error(err));
    }
    
    takeStorage(): void {
        if(window.localStorage.getItem("cities")) {
            const storagedItem: string = window.localStorage.getItem("cities");
            window.localStorage.removeItem("cities");
            this.storageArray = JSON.parse(storagedItem);
            const root: HTMLDivElement = document.querySelector(".root");
            root.innerHTML = "";
            this.storageArray.forEach((element: string) => {
                this.getWeather(element);
            })
        }
    }

    takeCity(): void {
        const button: HTMLButtonElement = document.querySelector("button");
        button.addEventListener("click", (e: Event) => this.takeCityInput(e));
    }

    takeCityInput(e: Event): void{
        e.preventDefault();

        const input: HTMLInputElement = document.querySelector("input");
        const boxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box");
        let setData: boolean = true;
        boxes.forEach((element: HTMLDivElement) => {
            if(element.firstChild.firstChild.nodeValue == input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) setData = false;
        })
        setData && this.getWeather(input.value);
    }

    showWeather(data: any, cityName: string){
        const singleCity: string = this.cityArray.find(element => element === cityName);
        singleCity === undefined && this.cityArray.push(data.name);
        window.localStorage.setItem("cities", JSON.stringify(this.cityArray));

        const root: HTMLDivElement = document.querySelector(".root");
        const div: HTMLDivElement = document.createElement("div");
        const h2: HTMLElement = document.createElement("h2");
        const temp: HTMLSpanElement = document.createElement("span");
        const pressure: HTMLSpanElement = document.createElement("span");
        const humidity: HTMLSpanElement = document.createElement("span");
        const innerDiv: HTMLDivElement = document.createElement("div");
        const rightSide: HTMLDivElement = document.createElement("div");
        const icon: HTMLDivElement = document.createElement("img");

        temp.setAttribute("class", "temp");
        pressure.setAttribute("class", "pressure");
        innerDiv.setAttribute("class", "innerDiv");
        humidity.setAttribute("class", "humidity");
        rightSide.setAttribute("class", "rightSide");
        div.setAttribute("class","box");
        icon.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        icon.setAttribute("class","img");

        h2.innerText = data.name;
        temp.innerText = `${Math.round(data.main.temp)} °C`;
        pressure.innerText = `Ciśnienie ${data.main.pressure}hPa`;
        humidity.innerText = `Wilgotność ${data.main.humidity}%`;
        
        rightSide.appendChild(pressure);
        rightSide.appendChild(humidity);
        innerDiv.appendChild(temp);
        innerDiv.appendChild(rightSide);

        div.appendChild(h2);
        div.appendChild(icon);
        div.appendChild(innerDiv);

        root.appendChild(div);
    }
}
const weatherApp= new WeatherApp();