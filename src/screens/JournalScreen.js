import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Journaling() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [entryText, setEntryText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('journalEntries').then(data => {
      if (data !== null) {
        setJournalEntries(JSON.parse(data));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  function handlePromptChange(value) {
    setPrompt(value);
  }

  function handleEntryTextChange(value) {
    setEntryText(value);
  }

  function handleAddEntry() {
    const newEntry = {prompt: prompt, text: entryText};
    setJournalEntries([...journalEntries, newEntry]);
    setPrompt('');
    setEntryText('');
  }

  function handleRemoveEntry(index) {
    const newJournalEntries = [...journalEntries];
    newJournalEntries.splice(index, 1);
    setJournalEntries(newJournalEntries);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Journaling</Text>
      <Text style={styles.description}>
        Make journal entries with prompts to reflect on your quitting journey of
        cannabis, emotions, and progress.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Prompt:</Text>
        <TextInput
          style={styles.input}
          value={prompt}
          onChangeText={handlePromptChange}
          placeholder="Choose a prompt..."
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Journal Entry:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={entryText}
          onChangeText={handleEntryTextChange}
          placeholder="Write your journal entry..."
          multiline
        />
      </View>
      <Button title="Add Entry" onPress={handleAddEntry} />
      {journalEntries.length > 0 && (
        <View>
          <Text style={styles.subheader}>Journal Entries</Text>
          {journalEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <Text style={styles.prompt}>{entry.prompt}</Text>
              <Text style={styles.text}>{entry.text}</Text>
              <Button title="Remove" onPress={() => handleRemoveEntry(index)} />
            </View>
          ))}
        </View>
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  subheader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  entry: {
    marginBottom: 20,
  },
  prompt: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default Journaling;
