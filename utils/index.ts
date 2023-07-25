export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "ae58396096msh616f131bc38a6d5p16f919jsnd1710f5e636d",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    { headers: headers }
  );

  const result = await response.json();

  return result;
}

export const calculateCarRent = (city_mpg: number, year: number): string => {
  // Define a base rental rate per mile per gallon
  const baseRate: number = 0.15;

  // Calculate a depreciation factor based on the car's age (assuming older cars have a higher depreciation)
  const currentYear: number = new Date().getFullYear();
  const ageFactor: number = 1 + 0.03 * (currentYear - year);

  // Calculate the rent based on city_mpg and depreciation
  const rent: number = baseRate * city_mpg * ageFactor;

  // Return the calculated rent rounded to 2 decimal places
  return rent.toFixed(2);
}
