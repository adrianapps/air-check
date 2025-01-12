import * as Location from "expo-location";
import { getCoordinates } from "../data-access/air";
import { getAir } from "../data-access/air";
import { getLocation } from "../data-access/air";

export const fetchAirData = async (cityName: string | null) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access location was denied");
  }

  let gpsLocation;

  if (cityName) {
    const coordinates = await getCoordinates(cityName);
    gpsLocation = {
      coords: {
        latitude: coordinates.coord.lat,
        longitude: coordinates.coord.lon,
      },
    };
  } else {
    gpsLocation = await Location.getCurrentPositionAsync({});
  }

  const airData = await getAir(
    gpsLocation.coords.latitude,
    gpsLocation.coords.longitude
  );

  const locationData = await getLocation(airData.coord.lat, airData.coord.lon);

  return { airData, locationData };
};
