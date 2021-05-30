"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class App {
    constructor() {
        this.cityArray = [];
        this.storageArray = [];
        this.key = "75f816acc7b275d8f6708a1c05f5a959";
        this.getWeather = (cityName) => __awaiter(this, void 0, void 0, function* () {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${this.key}`)
                .then(res => res.json())
                .then(data => this.showWeather(data, cityName))
                .catch(err => console.error(err));
        });
        this.startApp();
        console.log("działa");
    }
    startApp() {
        this.takeStorage();
        window.setInterval(() => this.takeStorage(), 120000);
        this.takeCity();
    }
    takeStorage() {
        if (window.localStorage.getItem("cities")) {
            const storagedItem = window.localStorage.getItem("cities");
            window.localStorage.removeItem("cities");
            this.storageArray = JSON.parse(storagedItem);
            const root = document.querySelector(".root");
            root.innerHTML = "";
            this.storageArray.forEach((element) => {
                this.getWeather(element);
            });
        }
    }
    takeCity() {
        const button = document.querySelector("button");
        button.addEventListener("click", (e) => this.takeCityInput(e));
    }
    takeCityInput(e) {
        e.preventDefault();
        const input = document.querySelector("input");
        const boxes = document.querySelectorAll(".box");
        let setData = true;
        boxes.forEach((element) => {
            if (element.firstChild.firstChild.nodeValue == input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                setData = false;
        });
        setData && this.getWeather(input.value);
    }
    showWeather(data, cityName) {
        const singleCity = this.cityArray.find(element => element === cityName);
        singleCity === undefined && this.cityArray.push(data.name);
        window.localStorage.setItem("cities", JSON.stringify(this.cityArray));
        const root = document.querySelector(".root");
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const temp = document.createElement("span");
        const pressure = document.createElement("span");
        const humidity = document.createElement("span");
        const innerDiv = document.createElement("div");
        const rightSide = document.createElement("div");
        const icon = document.createElement("img");
        temp.setAttribute("class", "temp");
        pressure.setAttribute("class", "pressure");
        innerDiv.setAttribute("class", "innerDiv");
        humidity.setAttribute("class", "humidity");
        rightSide.setAttribute("class", "rightSide");
        div.setAttribute("class", "box");
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        icon.setAttribute("class", "img");
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
exports.default = App;
//# sourceMappingURL=app.js.map