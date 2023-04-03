import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

function SavingsCalculator() {
  const [pricePerPack, setPricePerPack] = useState(0);
  const [cannabisPerDay, setCannabisPerDay] = useState(0);
  const [daysWithoutSmoking, setDaysWithoutSmoking] = useState(0);
  const [savings, setSavings] = useState(0);

  function calculateSavings() {
    const totalSavings = pricePerPack * cannabisPerDay * daysWithoutSmoking;

    setSavings(totalSavings);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Savings Calculator</Text>
      <Text style={styles.description}>
        Enter your smoking habits and expenses to see how much money you could
        save by quitting smoking.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Price of cannabis per gram:</Text>
        <TextInput
          style={styles.input}
          value={pricePerPack?.toString()}
          onChangeText={setPricePerPack}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>grams of cannabis taken per day:</Text>
        <TextInput
          style={styles.input}
          value={cannabisPerDay?.toString()}
          onChangeText={setCannabisPerDay}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Days without taking:</Text>
        <TextInput
          style={styles.input}
          value={daysWithoutSmoking?.toString()}
          onChangeText={text =>
            setDaysWithoutSmoking(text.replace(/[^0-9]/g, ''))
          }
          keyboardType="numeric"
        />
      </View>
      <Button title="Calculate Savings" onPress={calculateSavings} />
      {savings > 0 && (
        <Text style={styles.savings}>
          You have saved ${savings.toFixed(2)} by not smoking.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  savings: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default SavingsCalculator;
