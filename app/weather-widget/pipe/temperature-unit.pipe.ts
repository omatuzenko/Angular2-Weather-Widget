import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'temperatureUnit'
})

export class TemperaturePipe implements PipeTransform {
    transform(temperature: number, unitType: string) {
        switch (unitType) {
            case 'celsius':
                const celsius: number = (temperature - 32) * 0.556;
                return celsius;
            default:
                return temperature;
        }
    }
}