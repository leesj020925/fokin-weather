import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const weatherOptions = {
    Haze: {
        iconName: "weather-fog",
        gradient: ["#4DA0B0", "#D39D38"],
        title: "Haze",
        subtitle: "Just Don't Go Outside."
    },
    ThunderStorm: {
        iconName: "weather-lightning",
        gradient: ["#333333", "#e9d362"],
        title: "ThunderStorm",
        subtitle: "The % of being struck by lightning is 1 in 280,000."
    },
    Drizzle: {
        iconName: "weather-rainy",
        gradient: ["#928dab", "#00d2ff"],
        title: "Drizzle",
        subtitle: "One of a Korean Proverb says 'Clothes get wet from drizzle'. It's like 'Many drops make a flood'."
    },
    Rain: {
        iconName: "weather-pouring",
        gradient: ["#373b44", "#4286f4"],
        title: "Rain",
        subtitle: "Snow's better? nah... I don't think so."
    },
    Snow: {
        iconName: "weather-snowy",
        gradient: ["#d4d3dd", "#efefbb"],
        title: "Snow",
        subtitle: "Sleigh bells ring, are you listening?"
    },
    Atmosphere: {
        iconName: "weather-sunny",
        gradient: ["#c6ffdd", "#fbd786", "#f7797d"],
        title: "Atmosphere",
        subtitle: "How are you Today?"
    },
    Clear: {
        iconName: "weather-sunny",
        //gradient: ["#c6ffdd", "#fbd786", "#f7797d"],
        gradient: ["#db36a4", "#f7ff00"],
        title: "Clear",
        subtitle: "Lovely Weather! Let's go picnic!"
    },
    Clouds: {
        iconName: "weather-cloudy",
        gradient: ["#c9d6ff", "#e2e2e2"],
        title: "Clouds",
        subtitle: "When you wake up you could be already tired or feel blue..."
    },
    Mist: {
        iconName: "weather-fog",
        gradient: ["#4DA0B0", "#D39D38"],
        title: "Mist",
        subtitle: "Take care when you drive."
    },
    Dust: {
        iconName: "weather-tornado",
        gradient: ["#f09819", "#edde5d"],
        title: "Dust",
        subtitle: "Don't take off your mask."
    }
}

export default function Weather({temp, condition, _changePicker}){
    return (
            <LinearGradient
                colors={!!weatherOptions[condition] ? weatherOptions[condition].gradient : ["#f5af19", "#f12711"]}
                style={ styles.container }
            >
                <StatusBar barStyle="light-content" />
                <View style={styles.halfContainer}>
                    <MaterialCommunityIcons
                        name={!!weatherOptions[condition] ? weatherOptions[condition].iconName : "weather-sunset"}
                        size={96}
                        color="white"
                    />
                    <Text style={styles.temp}>{temp}°</Text>
                </View>
                <View style={{ ...styles.halfContainer, ...styles.textContainer }} >
                    <Text style={styles.title}>{!!weatherOptions[condition] ? weatherOptions[condition].title : "Good Day!"}</Text>
                    <Text style={styles.subtitle}>{!!weatherOptions[condition] ? weatherOptions[condition].subtitle : "How Are You?"}</Text>
                    <Picker
                        selectedValue={!!condition ? condition : "Clear"}
                        style={{height: 50, width: 200}}
                        onValueChange={ 
                            (itemValue, itemIndex) => {
                                //console.log(itemValue);
                                _changePicker(itemValue);
                            }
                        }
                    >
                        {
                            Object.keys(weatherOptions).map( (v, idx) => {
                                return <Picker.Item key={idx+1} label={v} value={v} />
                            })
                        }
                        
                    </Picker>
                </View>
            </LinearGradient>
    );
}
Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(["ThunderStorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds", "Haze","Mist","Dust"]).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        fontSize: 42,
        color: "white"
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10
    },
    subtitle: {
        color: "white",
        fontWeight: "600",
        fontSize: 24
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: "flex-start"
    }
})