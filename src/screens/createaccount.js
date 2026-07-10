import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    TextInput,
    Pressable,
    StatusBar,
    Platform,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const imgbg = require('../../src/assets/crateaccountbg.png');
const backArrow = require('../../src/assets/back_arrow.png');
const emailIcon = require('../../src/assets/email.png');
const phoneIcon = require('../../src/assets/phone.png');
const lockIcon = require('../../src/assets/lock.png');
const eyeIcon = require('../../src/assets/eye.png');
const statbar = require('../../src/assets/statbar.png');

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 44;

export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSignup = async () => {
        console.log("Button pressed");

        try {
            navigation.navigate("main");
            console.log("Sending request...");

            //const response = await axios.post(
            //    'http://192.168.1.34:5000/login',
            //    {
            //       email,
            //        password,
            //    }
           // );

            console.log("Success", response.data);
            navigation.navigate("main");
        } catch (error) {
            console.log("===== CATCH =====");
            console.log(error.response?.status);
            console.log(error.response?.data);

            //Alert.alert(
            //    "Login Failed",
            //    "Invalid email or password"
            //);
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground source={imgbg} style={styles.headerImage}>
                    <View style={styles.headerRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Image source={backArrow} style={styles.backIcon} />
                        </Pressable>
                        <Text style={styles.headerTitle}>Welcome</Text>
                        <View style={styles.emptyRight} />
                    </View>
                </ImageBackground>

                <View style={styles.bottomSheet}>
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>Quickly create account</Text>

                    {/* Email Field */}
                    <View style={styles.inputContainer}>
                        <Image source={emailIcon} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email address"
                            placeholderTextColor="#868889"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Phone Field */}
                    <View style={styles.inputContainer}>
                        <Image source={phoneIcon} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Phone number"
                            placeholderTextColor="#868889"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password Field */}
                    <View style={styles.inputContainer}>
                        <Image source={lockIcon} style={styles.inputIcon} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            placeholderTextColor="#868889"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureTextEntry}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)} style={styles.eyeButton}>
                            <Image source={eyeIcon} style={styles.eyeIcon} />
                        </Pressable>
                    </View>

                    {/* Signup Button */}
                    <LinearGradient
                        colors={["#AEDC81", "#6CC51D"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.signupButtonGradient}
                    >
                        <Pressable
                            onPress={handleSignup}
                            style={styles.signupButton}
                        >
                            <Text style={styles.signupButtonText}>Signup</Text>
                        </Pressable>
                    </LinearGradient>

                    {/* Footer Link */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Already have an account?{' '}
                            <Text onPress={() => navigation.goBack()} style={styles.loginLink}>
                                Login
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Status Bar Gradient Overlay */}
            <Image
                source={statbar}
                style={[styles.statusBarGradient, { height: statusBarHeight * 2.5 }]}
                resizeMode="stretch"
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F9',
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#F4F5F9',
    },
    headerImage: {
        flex: 1,
        width: '100%',
        height: 420,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: Platform.OS === 'android' ? statusBarHeight + 15 : 50,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    headerTitle: {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        textAlign: 'center',
    },
    emptyRight: {
        width: 40,
    },
    bottomSheet: {
        backgroundColor: '#F4F5F9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -55,
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 40,
        marginBottom: -10,
        flex: 1,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        color: 'black',
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#868889',
        marginBottom: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        height: 60,
        paddingHorizontal: 16,
        marginBottom: 5,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // Android elevation
        elevation: 0,
    },
    inputIcon: {
        width: 22,
        height: 22,
        marginRight: 12,
        resizeMode: 'contain',
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: 'black',
        paddingVertical: 0,
    },
    eyeButton: {
        padding: 8,
    },
    eyeIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    signupButtonGradient: {
        borderRadius: 8,
        height: 60,
        marginTop: 10,
        marginBottom: 24,
        // iOS shadow
        shadowColor: '#6CC51D',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        // Android elevation
        elevation: 4,
    },
    signupButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupButtonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: 'white',
    },
    footer: {
        position: 'relative',
        bottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
    },
    footerText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: '#868889',
    },
    loginLink: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
    },
    statusBarGradient: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
});