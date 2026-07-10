import React from 'react';
import { View } from 'react-native';

/**
 * Reusable VideoCallIcon drawn using React Native Views
 */
export default function VideoCallIcon({ size = 20, color = '#6CC51D' }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Main Camera Body */}
        <View style={{
          width: size * 0.52,
          height: size * 0.38,
          backgroundColor: color,
          borderRadius: size * 0.08,
        }} />
        {/* Spacer */}
        <View style={{ width: size * 0.05 }} />
        {/* Camera Lens */}
        <View style={{
          width: 0,
          height: 0,
          borderTopWidth: size * 0.14,
          borderTopColor: 'transparent',
          borderBottomWidth: size * 0.14,
          borderBottomColor: 'transparent',
          borderLeftWidth: size * 0.20,
          borderLeftColor: color,
        }} />
      </View>
    </View>
  );
}
