import { Ionicons } from "@expo/vector-icons";

// Funkcja do wyświetlania ikonek
export const getAQIIcon = (aqi: number) => {
  if (aqi <= 2) {
    return <Ionicons name="happy-outline" size={40} color="green" />; // Dobre powietrze
  } else if (aqi <= 3) {
    return <Ionicons name="heart-outline" size={40} color="orange" />; // Średnia jakość
  } else if (aqi <= 4) {
    return <Ionicons name="sad-outline" size={40} color="red" />; // Zła jakość
  } else {
    return <Ionicons name="alert-circle-outline" size={40} color="darkred" />; // Bardzo zła jakość
  }
};
