import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

const heartOutline = require('../assets/heart_outline.png');
const heartSolid = require('../assets/heart_solid.png');
const cartIconGreen = require('../assets/cart_icon_green.png');

/**
 * Reusable Product Card Component
 * Includes product image, name, weight, price, favorite button, and add-to-cart or quantity selector.
 */
export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [quantity, setQuantity] = useState(product.initialQuantity || 0);

  // Background color map for the image circle background
  const bgColors = {
    peach: '#FFECE8',
    avocado: '#EEF7E8',
    pineapple: '#FFF6E3',
    grapes: '#FCEEF5',
    pomegranate: '#FFECE8',
    broccoli: '#EEF7E8',
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      setQuantity(0);
    }
  };

  return (
    <View style={styles.card}>
      {/* Product Tag (NEW or Discount) */}
      {product.tag ? (
        <View style={[styles.tagContainer, product.tagType === 'discount' ? styles.tagDiscount : styles.tagNew]}>
          <Text style={[styles.tagText, product.tagType === 'discount' ? styles.tagTextDiscount : styles.tagTextNew]}>
            {product.tag}
          </Text>
        </View>
      ) : null}

      {/* Favorite Button */}
      <Pressable onPress={() => setIsFavorite(!isFavorite)} style={styles.favoriteButton}>
        <Image
          source={isFavorite ? heartSolid : heartOutline}
          style={[styles.favoriteIcon, isFavorite && styles.favoriteIconSolid]}
        />
      </Pressable>

      {/* Product Image Section with round background */}
      <View style={styles.imageWrapper}>
        <View style={[styles.imageBgCircle, { backgroundColor: bgColors[product.id] || '#F4F5F9' }]} />
        <Image source={product.image} style={styles.productImage} />
      </View>

      {/* Price */}
      <Text style={styles.price}>{product.price}</Text>

      {/* Name */}
      <Text style={styles.name} numberOfLines={1}>{product.name}</Text>

      {/* Weight / Unit */}
      <Text style={styles.weight}>{product.weight}</Text>

      {/* Bottom Selector or Add to Cart button */}
      <View style={styles.actionContainer}>
        {quantity > 0 ? (
          <View style={styles.quantitySelector}>
            <Pressable onPress={handleDecrement} style={styles.quantityBtn}>
              <Text style={styles.quantityBtnText}>—</Text>
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable onPress={handleIncrement} style={styles.quantityBtn}>
              <Text style={[styles.quantityBtnText, styles.plusText]}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={handleIncrement} style={styles.addToCartButton}>
            <Image source={cartIconGreen} style={styles.cartIcon} />
            <Text style={styles.addToCartText}>Add to cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 6,
    marginBottom: 12,
    alignItems: 'center',
    position: 'relative',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Android shadow
    elevation: 2,
  },
  tagContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 2,
  },
  tagNew: {
    backgroundColor: '#FFEFD4',
  },
  tagDiscount: {
    backgroundColor: '#FEECEB',
  },
  tagText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  tagTextNew: {
    color: '#FF9C00',
  },
  tagTextDiscount: {
    color: '#F96960',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 2,
  },
  favoriteIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#868889',
  },
  favoriteIconSolid: {
    tintColor: null, // use original red colors
  },
  imageWrapper: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  imageBgCircle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  productImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    zIndex: 1,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#6CC51D',
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: 2,
    textAlign: 'center',
  },
  weight: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#868889',
    marginBottom: 12,
  },
  actionContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#F4F5F9',
    paddingTop: 10,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  cartIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    resizeMode: 'contain',
  },
  addToCartText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
    paddingHorizontal: 10,
  },
  quantityBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#868889',
  },
  plusText: {
    color: '#6CC51D',
    fontSize: 16,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'black',
  },
});
