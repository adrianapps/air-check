const baseUrl = "http://api.openweathermap.org";
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export async function getAir(latitude: number, longitude: number) {
  const response = await fetch(
    `${baseUrl}/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getLocation(latitude: number, longitude: number) {
  const response = await fetch(
    `${baseUrl}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getCoordinates(cityName: string) {
  const response = await fetch(
    `${baseUrl}/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}
