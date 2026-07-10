import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  Platform,
  ActivityIndicator,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- Custom Vector Icons drawn using React Native Views ---

const VideoIcon = ({ size = 20, color = 'white', off = false }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: size * 0.52,
          height: size * 0.38,
          backgroundColor: color,
          borderRadius: size * 0.08,
        }} />
        <View style={{ width: size * 0.05 }} />
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
      {off && (
        <View style={{
          position: 'absolute',
          width: size * 0.9,
          height: 2,
          backgroundColor: '#FF3B30',
          transform: [{ rotate: '45deg' }],
        }} />
      )}
    </View>
  );
};

const MicIcon = ({ size = 20, color = 'white', muted = false }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        {/* Mic Capsule */}
        <View style={{
          width: size * 0.35,
          height: size * 0.6,
          borderRadius: size * 0.18,
          backgroundColor: color,
        }} />
        {/* Mic Stand U-shape */}
        <View style={{
          width: size * 0.6,
          height: size * 0.3,
          borderBottomLeftRadius: size * 0.3,
          borderBottomRightRadius: size * 0.3,
          borderWidth: size * 0.08,
          borderColor: color,
          borderTopWidth: 0,
          marginTop: -size * 0.15,
        }} />
        {/* Mic Base Stem */}
        <View style={{
          width: size * 0.08,
          height: size * 0.15,
          backgroundColor: color,
        }} />
        {/* Mic Base Plate */}
        <View style={{
          width: size * 0.35,
          height: size * 0.08,
          backgroundColor: color,
        }} />
      </View>
      {muted && (
        <View style={{
          position: 'absolute',
          width: size * 0.9,
          height: 2,
          backgroundColor: '#FF3B30',
          transform: [{ rotate: '45deg' }],
        }} />
      )}
    </View>
  );
};

const EndCallIcon = ({ size = 24, color = 'white' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '135deg' }] }}>
      <View style={{
        width: size * 0.8,
        height: size * 0.3,
        borderBottomLeftRadius: size * 0.4,
        borderBottomRightRadius: size * 0.4,
        borderWidth: size * 0.12,
        borderColor: color,
        borderTopWidth: 0,
        position: 'relative',
      }}>
        <View style={{
          position: 'absolute',
          left: -size * 0.08,
          top: -size * 0.05,
          width: size * 0.18,
          height: size * 0.18,
          borderRadius: size * 0.09,
          backgroundColor: color,
        }} />
        <View style={{
          position: 'absolute',
          right: -size * 0.08,
          top: -size * 0.05,
          width: size * 0.18,
          height: size * 0.18,
          borderRadius: size * 0.09,
          backgroundColor: color,
        }} />
      </View>
    </View>
  );
};

const FlipIcon = ({ size = 20, color = 'white' }) => {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        width: size * 0.7,
        height: size * 0.7,
        borderRadius: (size * 0.7) / 2,
        borderWidth: 2,
        borderColor: color,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          position: 'absolute',
          top: -2,
          right: size * 0.05,
          width: 0,
          height: 0,
          borderTopWidth: 3,
          borderTopColor: 'transparent',
          borderBottomWidth: 3,
          borderBottomColor: 'transparent',
          borderLeftWidth: 4,
          borderLeftColor: color,
          transform: [{ rotate: '45deg' }],
        }} />
        <View style={{
          position: 'absolute',
          bottom: -2,
          left: size * 0.05,
          width: 0,
          height: 0,
          borderTopWidth: 3,
          borderTopColor: 'transparent',
          borderBottomWidth: 3,
          borderBottomColor: 'transparent',
          borderRightWidth: 4,
          borderRightColor: color,
          transform: [{ rotate: '45deg' }],
        }} />
      </View>
    </View>
  );
};

export default function VideoCallScreen({ navigation }) {
  const [callStatus, setCallStatus] = useState('calling'); // 'calling' | 'connected'
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for 'calling' avatar
  useEffect(() => {
    let animation;
    if (callStatus === 'calling') {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1.0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      pulseAnim.setValue(1);
    }
    return () => animation && animation.stop();
  }, [callStatus]);

  // Simulate call connection after 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Call timer increment
  useEffect(() => {
    let interval;
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  // Format call duration timer (mm:ss)
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle camera flip simulation
  const handleFlipCamera = () => {
    if (isVideoOff || isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setIsFrontCamera((prev) => !prev);
      setIsFlipping(false);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#151718" />

      {/* --- Remote Video/Avatar View --- */}
      <View style={styles.remoteView}>
        {callStatus === 'calling' ? (
          // Calling Mode
          <View style={styles.callingContainer}>
            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]} />
            <View style={styles.avatarBig}>
              <Text style={styles.avatarLetter}>F</Text>
            </View>
            <Text style={styles.callerName}>FreshCart Support</Text>
            <View style={styles.callingRow}>
              <ActivityIndicator size="small" color="#6CC51D" style={{ marginRight: 8 }} />
              <Text style={styles.callStateText}>Calling...</Text>
            </View>
          </View>
        ) : (
          // Connected Mode (Simulated Remote Video)
          <View style={styles.connectedContainer}>
            {/* Mock Remote video feed */}
            <View style={styles.remoteMockFeed}>
              <View style={[styles.gradientOrb, styles.orb1]} />
              <View style={[styles.gradientOrb, styles.orb2]} />
              <View style={styles.remoteUserCard}>
                <View style={styles.avatarMedium}>
                  <Text style={styles.avatarLetter}>F</Text>
                </View>
                <Text style={styles.remoteName}>Support Agent: Sarah</Text>
                <Text style={styles.remoteStatus}>Connected (Live Video Feed)</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* --- Floating Local Video Preview --- */}
      {callStatus === 'connected' && (
        <View style={styles.localPreviewContainer}>
          <View style={styles.localPreviewCard}>
            {isVideoOff ? (
              <View style={styles.localOffContainer}>
                <VideoIcon size={20} color="#868889" off={true} />
                <Text style={styles.localOffText}>Camera Off</Text>
              </View>
            ) : isFlipping ? (
              <View style={styles.localOffContainer}>
                <ActivityIndicator size="small" color="#6CC51D" />
                <Text style={styles.localOffText}>Flipping...</Text>
              </View>
            ) : (
              // Simulated active local feed
              <View style={styles.localFeedActive}>
                <View style={[styles.localOrb, isFrontCamera ? styles.localFrontOrb : styles.localBackOrb]} />
                <Text style={styles.localFeedLabel}>
                  {isFrontCamera ? 'Front Cam' : 'Back Cam'}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* --- Call Info Overlay (Top) --- */}
      <View style={styles.topInfoOverlay}>
        <View style={styles.secureBadge}>
          <Text style={styles.secureLock}>🔒</Text>
          <Text style={styles.secureText}>End-to-End Encrypted</Text>
        </View>
        {callStatus === 'connected' && (
          <Text style={styles.durationText}>{formatTime(callSeconds)}</Text>
        )}
      </View>

      {/* --- Controls Panel (Bottom) --- */}
      <View style={styles.bottomControls}>
        {/* Toggle Audio */}
        <Pressable
          onPress={() => setIsMuted(!isMuted)}
          style={[styles.controlBtn, isMuted && styles.controlBtnActive]}
        >
          <MicIcon size={22} color={isMuted ? 'white' : '#FFFFFF'} muted={isMuted} />
        </Pressable>

        {/* End Call Button */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.endCallBtn}
        >
          <EndCallIcon size={28} color="white" />
        </Pressable>

        {/* Toggle Video */}
        <Pressable
          onPress={() => setIsVideoOff(!isVideoOff)}
          style={[styles.controlBtn, isVideoOff && styles.controlBtnActive]}
        >
          <VideoIcon size={22} color={isVideoOff ? 'white' : '#FFFFFF'} off={isVideoOff} />
        </Pressable>

        {/* Flip Camera */}
        <Pressable
          onPress={handleFlipCamera}
          style={[
            styles.controlBtn,
            isVideoOff && styles.controlBtnDisabled,
          ]}
          disabled={isVideoOff}
        >
          <FlipIcon size={22} color={isVideoOff ? '#868889' : 'white'} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151718',
  },
  remoteView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  callingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(108, 197, 29, 0.15)',
  },
  avatarBig: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6CC51D',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#6CC51D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  avatarLetter: {
    fontSize: 52,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  callerName: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    marginTop: 24,
    marginBottom: 8,
  },
  callingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callStateText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#868889',
  },
  connectedContainer: {
    flex: 1,
  },
  remoteMockFeed: {
    flex: 1,
    backgroundColor: '#1C1E20',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradientOrb: {
    position: 'absolute',
    borderRadius: 150,
    filter: Platform.OS === 'ios' ? 'blur(50px)' : undefined,
    opacity: 0.15,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: '#6CC51D',
    top: -50,
    left: -50,
  },
  orb2: {
    width: 260,
    height: 260,
    backgroundColor: '#AEDC81',
    bottom: 100,
    right: -30,
  },
  remoteUserCard: {
    alignItems: 'center',
  },
  avatarMedium: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6CC51D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  remoteName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  remoteStatus: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#6CC51D',
    marginTop: 4,
  },
  // Floating Local Camera Preview
  localPreviewContainer: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 110,
    height: 150,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    backgroundColor: '#26292B',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  localPreviewCard: {
    flex: 1,
  },
  localOffContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localOffText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#868889',
    marginTop: 6,
  },
  localFeedActive: {
    flex: 1,
    backgroundColor: '#3E4246',
    justifyContent: 'center',
    alignItems: 'center',
  },
  localOrb: {
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.3,
  },
  localFrontOrb: {
    backgroundColor: '#AEDC81',
  },
  localBackOrb: {
    backgroundColor: '#3b82f6',
  },
  localFeedLabel: {
    position: 'absolute',
    bottom: 8,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  // Overlays
  topInfoOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  secureLock: {
    fontSize: 11,
    marginRight: 6,
  },
  secureText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#C4C4C4',
  },
  durationText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    letterSpacing: 0.8,
  },
  // Controls
  bottomControls: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlBtnActive: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderColor: 'rgba(255, 59, 48, 0.9)',
  },
  controlBtnDisabled: {
    opacity: 0.4,
  },
  endCallBtn: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
