import React from 'react';
import { View, Image, TextInput, StyleSheet, Pressable } from 'react-native';
import VideoCallIcon from './VideoCallIcon';

const searchIcon = require('../assets/search_icon.png');

/**
 * Reusable SearchBar Component
 * Includes input field with a search magnifying glass and filter settings icon.
 */
export default function SearchBar({ value, onChangeText, onVideoCallPress }) {
  return (
    <View style={styles.container}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search keywords.."
        placeholderTextColor="#868889"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
      <Pressable onPress={onVideoCallPress} style={styles.videoButtonContainer}>
        <VideoCallIcon size={24} color="#6CC51D" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5F9',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'black',
    paddingVertical: 0,
  },
  videoButtonContainer: {
    padding: 6,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
