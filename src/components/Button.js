import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const Button = (props) => {

    // taking disable property from parent
    let isDisabled = !props.disabled;

    // if disabled
    // render just a View, which will not be clickable and different color
    if(isDisabled) {
        return (
            <View onPress={null}>
                <View style={[styles.btn, {backgroundColor: isDisabled ? "#ddd" : "transparent"}]}>
                    <Text style={styles.bold}>{props.title}</Text>
                </View>
            </View>
        );
    }
    // if not,
    // render touchableopacity to show click feedback
    // and pass the press event to parent
    else {
        return (
            <TouchableOpacity 
                onPress={props.onPress}>
                <View style={[styles.btn, {backgroundColor: isDisabled ? "#ddd" : "transparent"}]}>
                    <Text style={styles.bold}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    btn: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#000",
        width: 270,
		justifyContent: "center",
		alignItems: "center",
        marginBottom: 20
    }, 
    bold: {
        fontWeight: '700'
    },
});

export default Button;
