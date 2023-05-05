import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from "react-native";
import tw from "twrnc";
import {GOOGLE_MAPS_APIKEY} from '@env'
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {setDestination} from "../slices/navSlice";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";

const NavigateCard = () => {
    const dispatch =  useDispatch();
    const navigation = useNavigation();

    return (
            <SafeAreaView style={tw`bg-white flex-1`}>
                {/*<KeyboardAwareScrollView*/}
                {/*    style={tw`flex-1`}*/}
                {/*    keyboardVerticalOffset={100}*/}
                {/*    behavior={"position"}*/}
                {/*>*/}
                {/*<Text style={tw`text-center py-5 text-xl`}>Good morning, Daniel!</Text>*/}
                <View style={tw`border-t border-gray-200 flex-shrink`}>
                    <GooglePlacesAutocomplete
                        placeholder='Where to?'
                        styles={inPutBoxStyles}
                        fetchDetails={true}
                        returnKeyType={'search'}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            );
                            navigation.navigate('RideOptionsCard');
                        }}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'ru'
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                    />
                </View>
                {/*</KeyboardAwareScrollView>*/}
            </SafeAreaView>
    );
};

export default NavigateCard;

const ScrollViewStyles = StyleSheet.create({
    container: {
        backgroundColor: '#4c69a5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    }
})

const inPutBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})
