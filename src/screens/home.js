import React from 'react';
import { View, ImageBackground, Image, Pressable, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';

const imgbg = require('../../src/assets/MaskGroup.png');
const body = require('../../src/assets/body.png');
const googleicon = require("../../src/assets/googleicon.png")
const accountlogo = require("../../src/assets/account.png")
const statbar = require("../../src/assets/statbar.png")

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 44;

const App = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
            <ImageBackground
                source={imgbg}
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <View>
                    <ImageBackground
                        source={body}
                        resizeMode="stretch"
                        style={{
                            width: '100%',
                            height: 320,
                        }}>

                        <View style={{ marginLeft: 16, marginTop: 17, marginBottom: 2 }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 25, width: 126, height: 38 }}>Welcome</Text>
                        </View>
                        <View style={{ marginLeft: 16, marginRight: 28 }}>
                            <Text numberOfLines={2} style={{ color: "#868889", fontFamily: 'Poppins-Medium', fontSize: 14, width: "100%", height: 46 }}>Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy</Text>
                        </View>
                        <Pressable onPress={() => { console.log("hello"); alert("pressed") }} style={{ width: "100%", height: 60, backgroundColor: "white", position: "absolute", bottom: 154, justifyContent: "center", borderRadius: 8, elevation: 5 }}>
                            <Image source={googleicon} style={{ position: "absolute", marginLeft: 35, width: 22, height: 22 }} />
                            <View style={{ marginLeft: 115, marginBottom: 1 }}>
                                <Text style={{ fontFamily: "Poppins-Medium" }}>Continue with google</Text>
                            </View>
                        </Pressable>

                        <LinearGradient colors={["#AEDC81", "#6CC51D"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{
                            width: '100%',
                            height: 60,
                            position: 'absolute',
                            bottom: 82,
                            justifyContent: 'center',
                            borderRadius: 8,
                            elevation: 5
                        }}>
                            <Pressable onPress={() => navigation.navigate('createaccount')} style={{ width: "100%", height: 60, position: "absolute", justifyContent: "center" }}>
                                <Image source={accountlogo} style={{ position: "absolute", marginLeft: 33, width: 26, height: 26 }} />
                                <View style={{ marginLeft: 20, marginBottom: 1 }}>
                                    <Text style={{ fontFamily: "Poppins-Medium", color: "white", alignSelf: "center" }}>Create an account</Text>
                                </View>
                            </Pressable>
                        </LinearGradient>
                    </ImageBackground>
                </View>

            </ImageBackground>
            <Image
                source={statbar}
                style={[styles.statusBarGradient, { height: statusBarHeight * 2.5 }]}
                resizeMode="stretch"
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    statusBarGradient: {
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    },
});

export default App;