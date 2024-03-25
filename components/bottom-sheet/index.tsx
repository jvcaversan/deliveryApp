import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import styles from "./styles";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.grey }}
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Entregar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Sua Localização</Text>
        <Link href={"/"} asChild />
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons name="location-outline" size={20} color={Colors.medium} />
            <Text style={{ flex: 1 }}>Localização Atual</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.subheader}>Tempo de Entrega</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Agora</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;
