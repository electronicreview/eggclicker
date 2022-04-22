import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import src from "../assets/egg.png";
import Button from './Button'; // button is custom component, built-in component was not much configurable according to mockups
import session from '../store/session';
import utils from "../utils/utils";
import keys from '../store/keys';

const Egg = () => {
    const [total, setTotal] = useState(0); // state value to keep track of clicks
    const [increment, setIncrement] = useState(1); // state value to keep track of speed/increment

    // async function to load previously saved values
    // this will be used when user close the app, and opens in later point of time
    const getValues = async () => {
        // getting total count, and setting on local state
        session.get(keys.total).then(v => {
            setTotal(v ? 0 : parseInt(v));
        });
        // getting increment value, and setting on local state
        session.get(keys.increment).then(v => {
            setIncrement(v ? 1 : parseInt(v));
        });
    }

    // async method to save a value in storage
    // saving a value is important so that we don't loose count when user closes the app
    const setKey = async (key, value) => {
        await session.set(key, value);
    }

    // will run when application loads
    useEffect(() => {
        getValues();
    }, []);

    // each time total value changes, this method will run and save new value in storage
    useEffect(() => {
        setKey(keys.total, `${total}`);
    }, [total]);

    // each time increment value changes, this method will run and save new value in storage
    useEffect(() => {
        setKey(keys.increment, `${increment}`);
    }, [increment]);

    // this method will run when user clicks the egg
    const handleEggPress = () => {
        // take current value of clicks
        let t = parseInt(total) || 0;
        // add increment in it
        t += parseInt(increment);
        // save it back
        setTotal(t);
    }

    // this method runs when boost buttons are clicked
    // we are taking increment and cost as input
    const handleButtonPress = (inc, cost) => {
        // take current clicks count
        let t = parseInt(total) || 0;
        // take current increment or speed
        let i = parseInt(increment) || 1;
        // if user has more clicks then the cost
        if (t > cost) {
            // decrement the clicks by cost
            t -= cost;
            // increase the speed by increment
            i += inc;
            // save both values in state, which will also save it in local storage
            setTotal(t);
            setIncrement(i);
        }
    }

    // when user reaches the end, he can re-set the game to start over again
    const handleResetGame = () => {
        setTotal(0);
        setIncrement(1);
    }

    return (
        <View style={styles.container}>
            {
                // conditionally renderting the Alert for winners
                parseInt(total) >= 1000000000000000 &&
                Alert.alert(
                    "Congratulations 🎉",
                    "You won the game! You've made 1,000,000,000,000,000 clicks.✨",
                    [
                        { text: "Awesome", onPress: () => {} },
                        { text: "Start again", onPress: () => handleResetGame() }
                    ]
                )
            }
            {/* total click count */}
            <Text style={[styles.bigger, { marginBottom: 20, fontSize: 24 }]}>{utils.formatToNumber(total)} Clicks</Text>

            {/* egg button */}
            <TouchableOpacity onPress={handleEggPress}>
                <Image
                    style={styles.egg}
                    source={src}
                />
            </TouchableOpacity>

            {/* displaying current speed */}
            <Text style={[styles.bigger, { marginBottom: 20 }]}>+{utils.formatToNumber(increment)} Clicks / sec</Text>
            <Text style={styles.bigger}>Click Boosts:</Text>
            <Text style={styles.smaller}>Click boosts are non refundable</Text>

            {/* rendering boost buttons */}
            <Button
                title="+1 Clicks / sec (Cost: 100 Clicks)"
                onPress={() => handleButtonPress(1, 100)}
                disabled={total > 100}
            ></Button>
            <Button
                title="+10 Clicks / sec (Cost: 10K Clicks)"
                onPress={() => handleButtonPress(10, 10000)}
                disabled={total > 10000}
            ></Button>
            <Button
                title="+20 Clicks / sec (Cost: 1M Clicks)"
                onPress={() => handleButtonPress(20, 1000000)}
                disabled={total > 1000000}
            ></Button>
            <Button
                title="+30 Clicks / sec (Cost: 100M Clicks)"
                onPress={() => handleButtonPress(30, 100000000)}
                disabled={total > 100000000}
            ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    egg: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
        marginBottom: 20
    },
    bold: {
        fontWeight: '700',
        marginVertical: 10
    },
    bigger: {
        fontWeight: '700',
        fontSize: 18
    },
    smaller: {
        fontSize: 12,
        marginBottom: 20
    },
    btn: {
        padding: 10
    },
    margin: {
        marginBottom: 10
    }
});

export default Egg;
