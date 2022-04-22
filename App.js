import React from 'react';
import {
	SafeAreaView,
	StyleSheet
} from 'react-native';
import Egg from './src/components/Egg';

const App = () => {
	return (
		// SafeAreaView is needed to avoid hitting the device notches on iPhone and Android
		<SafeAreaView style={styles.container}>
			{/* Calling our Egg component here. */}
			<Egg />
		</SafeAreaView>
	);
};

// some custom styles for the safe are view
const styles = StyleSheet.create({
	container: {
		flex: 1, // take full screen
		justifyContent: "center", // keep everything center
		alignItems: "center", // keep everything center
		backgroundColor: '#F6F6F6', // background color
		padding: 20 // padding from edges
	},
});

export default App;
