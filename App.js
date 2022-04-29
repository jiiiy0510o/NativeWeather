import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].street);
  };
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27도</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCD00",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 42,
  },
  weather: {
    fontSize: 27,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 66,
    fontSize: 98,
    fontWeight: "900",
  },
  description: {
    marginTop: -20,
    fontSize: 40,
  },
});
