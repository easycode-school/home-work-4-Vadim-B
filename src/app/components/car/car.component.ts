import { Component } from '@angular/core';
import { CarServices } from './car.services';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  public car;
  public carServices;

  public initCarServices():void {
    let initCarForm = document.forms["car_init_form"];
    let car = {
      carName: initCarForm["carName_init"].value || "неведомый драндулет",
      mileage: +initCarForm["mileage_init"].value,
      fuelTankCapacity: +initCarForm["fuelTankCapacity_init"].value,
      fuel: +initCarForm["fuel_init"].value,
      fuelConsumptionRate: +initCarForm["fuelConsumptionRate_init"].value,
      specifications: initCarForm["specifications_init"].value.split("; ")
    }

    if (!car.mileage || !car.fuelTankCapacity || !car.fuel) {
      alert("Заполните все обязательные поля");
    } else {
      if (car.fuel > car.fuelTankCapacity) {
        car.fuel = car.fuelTankCapacity;
        console.log("Нельзя залить топлива в бак больше его объема")
      }
      this.carServices = new CarServices(car);
      this.car = car;
    }
  }

  public drive():void {
    let distance = +document.querySelector(".distance_init_input").value;

    let carInfo = this.carServices.drive(distance);

    this.car.mileage = carInfo.mileage;
    this.car.fuel = carInfo.fuel;
  }

  public refuel():void {
    let fueling = +document.querySelector(".fuel_init_input").value;

    let fuel = this.carServices.refuel(fueling);

    this.car.fuel = fuel;
  }
}