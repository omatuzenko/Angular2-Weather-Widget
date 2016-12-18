import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

import { WEATHER_COLORS } from '../constants/constants'

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {
    public pos: Position;
    public weatherData = new Weather(null, null, null, null, null);
    public currentSpeedUnit = "kph";
    public currentTemperatureUnit = "celsius";
    public currentLocation = "";
    public icons = new Skycons({ "color": "#FFF" });
    public dataReceived = false;

    constructor(private service: WeatherService) { }

    public ngOnInit() {
        this.getCurrentLocation();
    }

    public toggleUnits() {
        this.toggleTempUnits();
        this.toggleSpeedUnits();
    }

    private getCurrentLocation() {
        this.service.getCurrentLocation()
            .subscribe(position => {
                this.pos = position;
                this.getCurrentWeather();
                this.getLocationName();
            },
            err => console.error(err));
    }

    private getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(weather => {
                this.weatherData.temp = weather["currently"]["temperature"],
                this.weatherData.summary = weather["currently"]["summary"],
                this.weatherData.wind = weather["currently"]["windSpeed"],
                this.weatherData.humidity = weather["currently"]["humidity"],
                this.weatherData.icon = weather["currently"]["icon"];
                console.log("Weather: ", this.weatherData); // TODO: REMOVE
                this.setIcon();
                this.dataReceived = true;
            },
            err => console.error(err));
    }

    private getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                console.log(location);
                this.currentLocation = location["results"][1]["formatted_address"];
            })
    }

    private toggleTempUnits() {
        if (this.currentTemperatureUnit == "fahrenheit") {
            this.currentTemperatureUnit = "celsius";
        } else {
            this.currentTemperatureUnit = "fahrenheit";
        }
    }

    private toggleSpeedUnits() {
        if (this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
    }

    private setIcon() {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }

    private setStyles(): Object {
        if(this.weatherData.icon) {
            this.icons.color = WEATHER_COLORS[this.weatherData.icon]["color"];
            return WEATHER_COLORS[this.weatherData.icon];
        } else {
            return WEATHER_COLORS["default"];
        }
    }
}