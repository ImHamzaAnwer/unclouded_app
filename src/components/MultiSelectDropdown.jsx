import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AppText from './AppText';
import {APP_COLORS} from '../config/colors';

const MultiSelectDropdown = ({
  data,
  showDropdown,
  setShowDropdown,
  selectedItems,
  setSelectedItems,
}) => {
  const toggleCheckbox = value => {
    const currentIndex = selectedItems.indexOf(value);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(value);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const removeSelectedItem = value => {
    const newSelectedItems = selectedItems.filter(item => item !== value);
    setSelectedItems(newSelectedItems);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setShowDropdown(!showDropdown)}>
        <AppText>
          {selectedItems.length
            ? `${selectedItems.length} item selected`
            : 'Select items'}
        </AppText>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.itemContainer}>
          {data.map(option => (
            <TouchableOpacity
              style={styles.item}
              key={option.value}
              onPress={() => toggleCheckbox(option.value)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 8,
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: APP_COLORS.secondaryText,
                  }}>
                  {selectedItems.indexOf(option.value) !== -1 && (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: APP_COLORS.secondaryText,
                        borderRadius: 4,
                      }}
                    />
                  )}
                </View>

                <AppText style={styles.itemLabel}>{option.label}</AppText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedItems && (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {selectedItems.map(item => (
            <View key={item} style={styles.chip}>
              <AppText style={styles.chipText}>
                {data.find(option => option.value === item)?.label}
              </AppText>

              <TouchableOpacity
                onPress={() => removeSelectedItem(item)}
                style={{marginLeft: 4}}>
                <AppText>X</AppText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: APP_COLORS.primary,
    marginBottom: 10,
  },
  itemContainer: {
    // position: 'absolute',
    // top: 30,
    width: '100%',
    // zIndex: 99,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: APP_COLORS.primaryText,
  },
  item: {
    marginVertical: 5,
  },
  itemLabel: {
    color: APP_COLORS.primary,
  },
  chip: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    paddingVertical: 2,
    paddingHorizontal: 15,
    // backgroundColor: '#eee',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: APP_COLORS.primary,
    marginRight: 5,
  },
  chipText: {
    color: '#fff',
    marginRight: 10,
  },
});

export default MultiSelectDropdown;
