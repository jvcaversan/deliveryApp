import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.searchField}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.medium}
          />
          <TextInput
            style={styles.input}
            placeholder="Buscar Restaurante"
          ></TextInput>
        </View>
        <Link href={"/"} asChild />
        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="options-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
