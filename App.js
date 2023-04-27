import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [showWeather, setShowWeather] = useState(false);
  const [weatherLocal, setWeatherLocal] = useState(false);
  const apiKey = "cebd7f8b4047d62a6f31812081e933de";

  const [meteo, setMeteo] = useState([]);
  const [description, setDescription] = useState([]);
  const [icon, setIcon] = useState([]);
  const [temp, setTemp] = useState([]);
  const [feelTemp, setFeelTemp] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [windDeg, setWindDeg] = useState([]);
  const [windGust, setWindGust] = useState([]);
  const [windSpeed, setWindSpeed] = useState([]);
  const [visibility, setVisibility] = useState([]);

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");

  const handleFormSubmit = () => {
    setIsLoading(true);
    setShowWeather(!showWeather);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // délai de 2 secondes avant la réinitialisation du bouton
    getCity();
    console.log(city); // envoyer la ville saisie à l'application météo
  };

  useEffect(() => {
    getLocation();
  }, []); // Sans les crochets ça tourne en boucle

  useEffect(() => {
    getGeoLocation();
  }, [location]); // Sans les crochets ça tourne en boucle

  const getCity = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}&lang=fr`
        // `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=6&units=metric&lang=fr&appid=${apiKey}&lang=fr`
        // name country et state a afficher pour sélectionner
      )
      .then((res) => {
        setMeteo(res.data);
        setDescription(res.data.weather[0].description);
        setIcon(res.data.weather[0].icon);
        setTemp(res.data.main.temp);
        setFeelTemp(res.data.main.feels_like);
        setTempMax(res.data.main.temp_max);
        setTempMin(res.data.main.temp_min);
        setPressure(res.data.main.pressure);
        setHumidity(res.data.main.humidity);
        setWindDeg(res.data.wind.deg);
        setWindGust(res.data.wind.gust);
        setWindSpeed(res.data.wind.speed);
        setVisibility(res.data.visibility);
      });
  };
  // console.log(meteo);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  console.log(location);

  const getGeoLocation = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&lang=fr&appid=${apiKey}&lang=fr`
      )
      .then((res) => {
        setMeteo(res.data);
        setDescription(res.data.weather[0].description);
        setIcon(res.data.weather[0].icon);
        setTemp(res.data.main.temp);
        setFeelTemp(res.data.main.feels_like);
        setTempMax(res.data.main.temp_max);
        setTempMin(res.data.main.temp_min);
        setPressure(res.data.main.pressure);
        setHumidity(res.data.main.humidity);
        setWindDeg(res.data.wind.deg);
        setWindGust(res.data.wind.gust);
        setWindSpeed(res.data.wind.speed);
        setVisibility(res.data.visibility);
      });
  };
  console.log(meteo);

  return (
    <View style={styles.container}>
      {/*      ======================= HEADER ============================== */}
      <View style={styles.header}></View>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: 130, aspectRatio: 1 }}
          source={require("./assets/ville.png")}
        />
        <Text style={styles.titre}>Appli météo</Text>
      </View>
      <View style={styles.trait}></View>
      {/*      ======================= Formulaire ============================== */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          value={city}
          onChangeText={setCity}
          placeholder="Entrez un nom de ville"
        />
        <TouchableOpacity
          style={isLoading ? styles.buttonLoading : styles.button}
          title="Envoyer"
          onPress={handleFormSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
      {/*      ======================= Météo G ============================== */}
      <View style={styles.presContainer}>
        <Text style={styles.titre2}>Voici la météo sur {meteo.name}</Text>
      </View>
      {/* <View style={styles.presContainer}> */}
      <View style={styles.weatherContainer}>
        <Image
          source={{
            uri: `http://openweathermap.org/img/w/${icon}.png`,
          }}
          style={{ height: 100, aspectRatio: 1 }}
        />
        <Text style={styles.text}>{description}</Text>
      </View>
      {/* </View> */}
      <View style={styles.trait}></View>

      {/*  ======================= Météo Det ============================== */}
      <View>
        <View style={styles.weatherContainerDet}>
          <Image
            style={{ height: 45, aspectRatio: 1 }}
            source={require("./assets/T=.png")}
          />

          <Text style={styles.text}>
            {temp}°C ressentie : {feelTemp}°C
          </Text>
        </View>
        <View style={styles.weatherContainerDet}>
          <Image
            style={{ height: 40, aspectRatio: 1 }}
            source={require("./assets/T+.png")}
          />
          <Text style={styles.text}>{tempMax}°C max</Text>
          <Image
            style={{ height: 40, aspectRatio: 1 }}
            source={require("./assets/T-.png")}
          />
          <Text style={styles.text}>{tempMin}°C min</Text>
        </View>
        <View style={styles.weatherContainerDet}>
          <Image
            style={{ height: 40, aspectRatio: 1 }}
            source={require("./assets/H.png")}
          />
          <Text style={styles.text}>{humidity}% d'humidité. </Text>
        </View>
        <View style={styles.weatherContainerDet}>
          <Image
            style={{ height: 40, aspectRatio: 1 }}
            source={require("./assets/P.png")}
          />
          <Text>{pressure} hPa</Text>
        </View>
        <View style={styles.weatherContainerDet}>
          <Image
            style={{ height: 40, aspectRatio: 1 }}
            source={require("./assets/V.png")}
          />
          <Text style={styles.text}>
            {" "}
            {windSpeed}m/s, direction {windDeg}°, rafale à {windGust}m/s
          </Text>
        </View>
        <View style={styles.weatherContainerDet}>
          <Image
            style={{ height: 40, aspectRatio: 1 }}
            source={require("./assets/VI.png")}
          />
          <Text style={styles.text}>{visibility}m de visibilité</Text>
        </View>
      </View>
      {/*      ======================= Footer ============================== */}
      <View style={styles.footer}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    height: 20,
    backgroundColor: "#00193d",
    justifyContent: "center",
    alignItems: "center",
  },
  trait: {
    height: 1,
    backgroundColor: "#525252",
    justifyContent: "center",
    alignItems: "center",
  },

  titre: {
    fontFamily: "Roboto-Black.ttf",
    fontSize: 30,
    fontWeight: "600",
    color: "#2f5a94",
    marginStart: 25,
  },
  titre2: {
    fontFamily: "Roboto-Black.ttf",
    fontSize: 20,
    fontWeight: "600",
    color: "#00193d",
    marginStart: 25,
  },

  text: {
    fontFamily: "Roboto.ttf",
    fontSize: 16,
    color: "#00193d",
    marginStart: 10,
  },

  textInput: {
    height: 40,
    borderColor: "#00193d",
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#00193d",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 30,
    justifyContent: "center",
  },
  buttonLoading: {
    backgroundColor: "#2f5a94",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 30,
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  presContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // marginTop: 20,
    justifyContent: "flex-end",
  },

  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherContainerDet: {
    marginStart: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    marginVertical: 5,
  },

  formContainer: {
    // marginStart: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },

  logoContainer: {
    marginStart: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: -10,
    justifyContent: "flex-start",
  },
  footer: {
    height: 10,
    backgroundColor: "#00193d",
    justifyContent: "center",
    alignItems: "center",
  },
});
