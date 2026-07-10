import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
  Image
} from 'react-native';

// Import Reusable Components
import SearchBar from '../components/SearchBar';
import PromoBanner from '../components/PromoBanner';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';

// Import Assets
const chevronRight = require('../assets/chevron_right.png');
const statbar = require('../assets/statbar.png');

// Category Icons
const catVeg = require('../assets/cat_veg.png');
const catFruit = require('../assets/cat_fruit.png');
const catBev = require('../assets/cat_bev.png');
const catGrocery = require('../assets/cat_grocery.png');
const catOil = require('../assets/cat_oil.png');
const catHouse = require('../assets/cat_house.png');

// Product Images (locally generated)
const imgPeach = require('../assets/peach.png');
const imgAvocado = require('../assets/avocado.png');
const imgPineapple = require('../assets/pineapple.png');
const imgGrapes = require('../assets/grapes.png');
const imgPomegranate = require('../assets/pomegranate.png');
const imgBroccoli = require('../assets/broccoli.png');

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 44;

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  // Categories Data
  const categories = [
    { id: 'veg', title: 'Vegetables', icon: catVeg },
    { id: 'fruit', title: 'Fruits', icon: catFruit },
    { id: 'bev', title: 'Beverages', icon: catBev },
    { id: 'grocery', title: 'Grocery', icon: catGrocery },
    { id: 'oil', title: 'Edible oil', icon: catOil },
    { id: 'house', title: 'Household', icon: catHouse },
  ];

  // Products Data
  const products = [
    {
      id: 'peach',
      name: 'Fresh Peach',
      price: '$8.00',
      weight: 'dozen',
      image: imgPeach,
      isFavorite: false,
      initialQuantity: 0,
    },
    {
      id: 'avocado',
      name: 'Avacoda',
      price: '$7.00',
      weight: '2.0 lbs',
      image: imgAvocado,
      isFavorite: false,
      tag: 'NEW',
      tagType: 'new',
      initialQuantity: 1,
    },
    {
      id: 'pineapple',
      name: 'Pineapple',
      price: '$9.90',
      weight: '1.50 lbs',
      image: imgPineapple,
      isFavorite: true,
      initialQuantity: 0,
    },
    {
      id: 'grapes',
      name: 'Black Grapes',
      price: '$7.05',
      weight: '5.0 lbs',
      image: imgGrapes,
      isFavorite: false,
      tag: '-16%',
      tagType: 'discount',
      initialQuantity: 0,
    },
    {
      id: 'pomegranate',
      name: 'Pomegranate',
      price: '$2.09',
      weight: '1.50 lbs',
      image: imgPomegranate,
      isFavorite: false,
      tag: 'NEW',
      tagType: 'new',
      initialQuantity: 1,
    },
    {
      id: 'broccoli',
      name: 'Fresh Broccoli',
      price: '$3.00',
      weight: '1 kg',
      image: imgBroccoli,
      isFavorite: true,
      initialQuantity: 0,
    },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group products into rows of 2 for custom 2-column grid in ScrollView
  const productRows = [];
  for (let i = 0; i < filteredProducts.length; i += 2) {
    productRows.push(filteredProducts.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

      {/* Main Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar section */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onVideoCallPress={() => navigation.navigate('videocall')}
          />
        </View>

        {/* Promo Banner */}
        <PromoBanner />

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Image source={chevronRight} style={styles.chevron} />
        </View>

        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => console.log('Category pressed:', item.title)}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        {/* Featured Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured products</Text>
          <Image source={chevronRight} style={styles.chevron} />
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {productRows.map((row, index) => (
            <View key={index} style={styles.productRow}>
              <ProductCard product={row[0]} />
              {row[1] ? (
                <ProductCard product={row[1]} />
              ) : (
                <View style={styles.emptyCard} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabPress={setActiveTab} />

      {/* Status Bar Gradient Overlay */}
      <Image
        source={statbar}
        style={[styles.statusBarGradient, { height: statusBarHeight * 1.5 }]}
        resizeMode="stretch"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollContent: {
    paddingTop: statusBarHeight + 10,
    paddingBottom: 85, // Space to avoid bottom navigation overlap
  },
  searchSection: {
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
  chevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#868889',
  },
  categoriesList: {
    paddingLeft: 16,
    paddingRight: 6,
    marginBottom: 24,
    height: 95,
  },
  productsGrid: {
    paddingHorizontal: 10,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCard: {
    flex: 1,
    marginHorizontal: 6,
  },
  statusBarGradient: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    tintColor: '#FFFFFF', // White tint to blend status bar on white dashboard
    opacity: 0.8,
  },
});
