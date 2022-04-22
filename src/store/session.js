import AsyncStorage from '@react-native-async-storage/async-storage';

const session = {
    // setting a value to storage
    set: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        }
        catch (e) { }
    },
    // getting a value from storage
    get: async key => {
        try {
            return await AsyncStorage.getItem(key);
        } 
        catch (e) {}
    }
};

export default session;