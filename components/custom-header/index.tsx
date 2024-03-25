import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import styles from "@/components/custom-header/styles";
import SearchBar from "../search-bar";
import BottomSheet from "../bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            style={styles.icon}
            source={require("@/assets/images/favicon.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Entregar Agora</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>Vitoria, ES</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.medium} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

export default CustomHeader;
