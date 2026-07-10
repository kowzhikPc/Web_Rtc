import React from 'react';
import { View, Image, Pressable, StyleSheet, Platform } from 'react-native';

const homeIcon = require('../assets/home_icon.png');
const profileIcon = require('../assets/profile_icon.png');
const heartOutline = require('../assets/heart_outline.png');
const cartIconWhite = require('../assets/cart_icon_white.png');

/**
 * Custom Bottom Navigation Component
 * Features active states and a floating action button on the far right for the Cart.
 */
export default function BottomNavigation({ activeTab = 'home', onTabPress }) {
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <Pressable onPress={() => onTabPress && onTabPress('home')} style={styles.tab}>
        <Image
          source={homeIcon}
          style={[styles.icon, activeTab === 'home' && styles.activeIcon]}
        />
      </Pressable>

      {/* Profile Tab */}
      <Pressable onPress={() => onTabPress && onTabPress('profile')} style={styles.tab}>
        <Image
          source={profileIcon}
          style={[styles.icon, activeTab === 'profile' && styles.activeIcon]}
        />
      </Pressable>

      {/* Favorites Tab */}
      <Pressable onPress={() => onTabPress && onTabPress('favorites')} style={styles.tab}>
        <Image
          source={heartOutline}
          style={[styles.icon, activeTab === 'favorites' && styles.activeIcon]}
        />
      </Pressable>

      {/* Floating Cart Tab */}
      <Pressable onPress={() => onTabPress && onTabPress('cart')} style={styles.cartTab}>
        <View style={styles.cartCircle}>
          <Image source={cartIconWhite} style={styles.cartIcon} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 65,
    borderTopWidth: 1,
    borderTopColor: '#F4F5F9',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Android shadow
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0, // safe area padding
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#868889',
  },
  activeIcon: {
    tintColor: 'black',
  },
  cartTab: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#6CC51D',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15, // float effect
    // Button shadow
    shadowColor: '#6CC51D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cartIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
