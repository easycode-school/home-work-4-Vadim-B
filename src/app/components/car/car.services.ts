export class CarServices {
  _mileage: number; // текущий пробег
  _FuelTankCapacity: number; // объем топливного бака
  _fuel: number; // текущее количество бензина в баке
  _fuelConsumptionRate: number; // расход топлива на 100 км
  constructor(
    {mileage, fuelTankCapacity, fuel, fuelConsumptionRate}
  ) {
    this._mileage = mileage;
    this._FuelTankCapacity = fuelTankCapacity;
    this._fuel = fuel;
    this._fuelConsumptionRate = (fuelConsumptionRate || 10) / 100;
  }

  /**
 * Поездка
 * @param mileageDrive заданное расстояние поездки
 */
  public drive(mileageDrive: number) {
    // Узнаем максимальное растояние поездки, исходя из объема топлива и потребления
    const maxMileageDrive: number = this._fuel / this._fuelConsumptionRate;

    // Ставим условие максимального растояния поездки и в путь!
    if (mileageDrive > maxMileageDrive) {
      mileageDrive = maxMileageDrive;
    }
    this._mileage += mileageDrive;

    // При этом затратим топливо
    this._fuel -= mileageDrive * this._fuelConsumptionRate;

    return {
      mileage: this._mileage,
      fuel: this._fuel
    };
  }

  /**
   * Заправка бака
   * @param fuel - объем заправляемого топлива
   */
  public refuel(fuel: number) {
    // Заправляем бак на указанный объем, но следим за вместимостью бака
    this._fuel += fuel;
    if (this._fuel > this._FuelTankCapacity) {
      this._fuel = this._FuelTankCapacity;
      alert("Бак полон");
    }

    return this._fuel;
  }
}