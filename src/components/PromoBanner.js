import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const promoBg = require('../assets/promo_bg.png');

/**
 * Reusable PromoBanner Component
 * Renders a full width card showing the current discount promo and slide indicators.
 */
export default function PromoBanner() {
  return (
    <View style={styles.container}>
      <ImageBackground source={promoBg} style={styles.bannerImage} imageStyle={styles.imageRadius}>
        <View style={styles.overlay}>
          <Text style={styles.promoText}>20% off on your</Text>
          <Text style={styles.promoText}>first purchase</Text>
          
          {/* Slider dots indicator */}
          <View style={styles.indicatorContainer}>
            <View style={styles.activeDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
            <View style={styles.inactiveDot} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 180,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  imageRadius: {
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    paddingLeft: 24,
    justifyContent: 'center',
  },
  promoText: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    lineHeight: 26,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  activeDot: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6CC51D',
    marginRight: 6,
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginRight: 6,
  },
});
