import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Animated,
} from 'react-native';

//importing the app context for the shared data list states
import { useAppContext } from '../AppContext';

import { Picker } from '@react-native-picker/picker';

const Form = () => {

  //The shared states
  const {
    foodDataList,
    setFoodDataList,
    transportList,
    setTransportList,
    budgetList,
    setBudgetList,
  } = useAppContext();

  //Set the states
  const scrollY = useRef(new Animated.Value(0)).current;
  const [foodChoice, setFoodChoice] = React.useState('');
  const [foodPrice, setFoodPrice] = React.useState('');
  const [transportCost, setTransportCost] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState('');
  const [budget, setBudget] = React.useState('');


  //For handling event of food
  const handleFoodPress = () => {

    //Validation to check if all fields are filled
    if (!foodChoice || !selectedOption || !foodPrice) {
    Alert.alert('Error', 'Please fill in all food fields before submitting!');
    return;
    }

    //to insert a new food entry
    const newEntry = {
    food: foodChoice || 'N/A',
    rating: parseInt(selectedOption) || 0,
    price: parseInt(foodPrice) || 0,
    };

    //Update the list of foods
    setFoodDataList(prevList => {
      const updatedList = [...prevList, newEntry];
      console.log('Food Data List:', updatedList);
      return updatedList;
    });

    //To reset the fields
    setFoodChoice('');
    setFoodPrice('');
    setSelectedOption('');

    //Echo back the data that the user entered
    Alert.alert('Food Entry', `Food: ${foodChoice || 'N/A'}\nRating: ${selectedOption || 'N/A'}\nPrice: ${foodPrice || 'N/A'}`);
  };

  //For handling event of transport
  const handleTransportPress = () => {

    //To check if all transport field
    if (!transportCost) {
      Alert.alert('Error', 'Please enter a transport cost before submitting!');
      return;
    }

    //To insert a new transport entry
    const newEntry = {
      transportCost: parseFloat(transportCost),
    };

    //Update the transport list 
    setTransportList(prevList => {
      const updatedList = [newEntry];
      console.log('Transport Data List:', updatedList);
      return updatedList;
    });

    //Reset the transport fields
    setTransportCost('');

    //Echo back the transport data that the user entered
    Alert.alert('Transport Cost Entry', `Cost: ${transportCost}`);
  };

  //For handling event of budget button
  const handleBudgetPress = () => {
    if (!budget) {
      Alert.alert('Error', 'Please enter a budget before submitting!');
      return;
    }

    //To insert a new budget
    const newEntry = {
      budget: parseFloat(budget),
    };

    //To update the budget
    setBudgetList(prevList => {
      const updatedList = [newEntry];
      console.log('Budget List:', updatedList);
      return updatedList;
    });

    // Reset the input field
    setBudget('');

    //To echo back the budget that the user entered
    Alert.alert('Budget Entry', `Budget: ${budget}`);
  };

  //Resize form when scrolling
  const scaleAnim = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.95], // Normal to slightly smaller
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView contentContainerStyle={styles.scrollContainer}
      onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>cashia</Text>

          {/* First input-button group in a container - Entering a budget */}
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter budget"
              placeholderTextColor="#9c9ba0"
              value={budget}
              onChangeText={setBudget}
              keyboardType="numeric"
            />

            {/* submit button */}
            <TouchableOpacity style={styles.button} onPress={handleBudgetPress}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Second input-button group in a container - Entering Food choices */}
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter food choices"
              placeholderTextColor="#9c9ba0"
              value={foodChoice}
              onChangeText={setFoodChoice}
            />

            {/* Dropdown Picker */}
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => setSelectedOption(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Satisfaction Rating" value="" color="#FFF" />
                <Picker.Item label="10" value="10"color="#FFF" />
                <Picker.Item label="9" value="9" color="#FFF" />
                <Picker.Item label="8" value="8" color="#FFF" />
                <Picker.Item label="7" value="7" color="#FFF" />
                <Picker.Item label="6" value="6" color="#FFF" />
                <Picker.Item label="5" value="5" color="#FFF" />
                <Picker.Item label="4" value="4" color="#FFF" />
                <Picker.Item label="3" value="3" color="#FFF" />
                <Picker.Item label="2" value="2" color="#FFF" />
                <Picker.Item label="1" value="1" color="#FFF" />
                <Picker.Item label="0" value="0" color="#FFF" />
              </Picker>
            </View>

            {/* Input Price of Food */}
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              placeholderTextColor="#9c9ba0"
              value={foodPrice}
              onChangeText={setFoodPrice}
            />
            
            {/* Submit button for Food */}
            <TouchableOpacity style={styles.button} onPress={handleFoodPress}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Third input-button group in a container - To input transport cost*/}
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <TextInput
              style={styles.input}
              placeholder="Enter Transport Cost"
              placeholderTextColor="#9c9ba0"
              value={transportCost}
              onChangeText={setTransportCost}
              keyboardType="numeric"
            />

            {/* Submit button for transport cost */}
            <TouchableOpacity style={styles.button} onPress={handleTransportPress}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </Animated.ScrollView>

    </SafeAreaView>
  );
};

//For styling the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 25,
  },
  innerContainer: {
    width: '100%',
    backgroundColor: '#216C53',
    borderRadius: 25,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Cocogoose-Pro-Bold-trial', 
    color: '#fff',
  },
  card: {
    backgroundColor: '#33866A',
    padding: 20,
    borderRadius: 25,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    borderWidth: 0,
    borderColor: '#CCC',
    borderRadius: 25,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#343434',
    color: '#000',
  },
  button: {
    backgroundColor: '#216C53',
    borderWidth: 0,
    borderColor: '#216C53',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outputButton: {
    backgroundColor: '#33866A',
    borderWidth: 0,
    borderColor: '#33866A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    width: '50%',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  dropdownContainer: {
    borderWidth: 0,
    borderColor: '#216C53',
    borderRadius: 25,
    marginTop: 12,
    width: 'auto',
    backgroundColor: '#33866A',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default Form;
