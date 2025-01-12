import { Button, Text, TextInput, View, Alert } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAQIIcon } from "./utils/aqiIcons";
import { fetchAirData } from "./utils/fetchAirData";
import { DeviceMotion } from "expo-sensors";

export default function Index() {
  const [cityName, setCityName] = useState<string | null>(null);
  const [inputCityName, setInputCityName] = useState<string>("");
  console.log(`DEVICE MOTION: ${DeviceMotion}`);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["airData", cityName],
    queryFn: () => fetchAirData(cityName),
    retry: false,
  });

  const [shakeDetected, setShakeDetected] = useState(false);
  const [rotationRate, setRotationRate] = useState<any>(null);

  useEffect(() => {
    const shakeThreshold = 2.2;

    const rotationRateListener = DeviceMotion.addListener((motionData) => {
      const { rotation } = motionData;

      if (rotation) {
        setRotationRate(rotation);

        if (
          Math.abs(rotation.alpha) > shakeThreshold ||
          Math.abs(rotation.beta) > shakeThreshold ||
          Math.abs(rotation.gamma) > shakeThreshold
        ) {
          setCityName(null);
          setShakeDetected(true);
        } else {
          setShakeDetected(false);
        }
      }
    });

    DeviceMotion.setUpdateInterval(100);

    return () => {
      rotationRateListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text>Error: {(error as Error).message}</Text>
      </View>
    );
  }

  const { airData, locationData } = data || {};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Text>{shakeDetected ? "SHAKE WYKRYTY" : "shake niewykryty"}</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 8,
          width: "80%",
        }}
        placeholder="Wpisz nazwę miasta"
        value={inputCityName || ""}
        onChangeText={(text) => setInputCityName(text)}
      />
      <Button
        title="Szukaj"
        onPress={() => {
          setCityName(inputCityName);
          refetch();
        }}
      />

      <Text>AQI: {airData?.list[0]?.main?.aqi || "No data"}</Text>

      <View>
        {airData?.list[0]?.main?.aqi && getAQIIcon(airData.list[0].main.aqi)}
      </View>

      <Text>
        Miasto: {locationData ? locationData[0]?.name : "Brak danych"}
      </Text>
      <Text>
        Kraj: {locationData ? locationData[0]?.country : "Brak danych"}
      </Text>
      <Text>
        Województwo: {locationData ? locationData[0]?.state : "Brak danych"}
      </Text>
    </View>
  );
}
