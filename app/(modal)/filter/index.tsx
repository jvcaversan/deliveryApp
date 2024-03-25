import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Filter = () => {
  const sortedList = categories;

  sortedList.sort((a, b) => {
    const nomeA = a.name.toLowerCase();
    const nomeB = b.name.toLowerCase();

    if (nomeA < nomeB) {
      return -1;
    }
    if (nomeA > nomeB) {
      return 1;
    }
    return 0;
  });

  interface Category {
    name: string;
    count: number;
    checked?: boolean;
  }

  const ItemBox = () => (
    <>
      <View style={styles.fullItemContainer}>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="arrow-down-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Filtrar</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="fast-food-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Avaliações</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item}>
            <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
            <Text style={{ flex: 1 }}>Promoções</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.item}>
            <Ionicons
              name="nutrition-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Dieta</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.header}>Categorias</Text>
    </>
  );

  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;

      return item;
    });
    setItems(updatedItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });
  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        isChecked={items[index].checked}
        fillColor={Colors.primary}
        unfillColor="#fff"
        disableBuiltInState
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        onPress={() => {
          const isChecked = items[index].checked;

          const updatedItems = items.map((item) => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }
            return item;
          });
          setItems(updatedItems);
        }}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ height: 76 }} />

      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.outlineButton, animatedStyles]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[animatedText, styles.outlineButtonText]}>
                Limpar Tudo
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;
