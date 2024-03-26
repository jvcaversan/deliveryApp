import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import styles from "./styles";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

// process.env.EXPO_PUBLIC_GOOGLE_API_KEY

const LocationSearch = () => {
  const [location, setLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const navigation = useNavigation();
  return (
    <View style={styles.fullViewMap}>
      <GooglePlacesAutocomplete
        placeholder="Busque ou Marque um local"
        fetchDetails={true}
        onPress={(data, details) => {
          const point = details?.geometry.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.medium} />
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            backgroundColor: "#fff",
            padding: 8,
          },
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "pt-BR",
        }}
      />
      <MapView
        showsUserLocation={true}
        style={styles.map}
        initialRegion={location}
      />
      <View style={styles.absolutBox}></View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSearch;
