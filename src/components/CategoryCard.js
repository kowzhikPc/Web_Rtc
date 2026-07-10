import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

/**
 * Reusable Category Card Component
 * Displays a circle with a customized background and a category icon, with the title beneath.
 */
export default function CategoryCard({ category, onPress }) {
  const bgColors = {
    veg: '#E2F5ED',
    fruit: '#FCEEEF',
    bev: '#FFF8E5',
    grocery: '#F3ECFC',
    oil: '#E7F5FC',
    house: '#FCEEF5',
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.circle, { backgroundColor: bgColors[category.id] || '#F4F5F9' }]}>
        <Image source={category.icon} style={styles.icon} />
      </View>
      <Text style={styles.title} numberOfLines={1}>{category.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 18,
    width: 68,
  },
  circle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#868889',
    textAlign: 'center',
  },
});
