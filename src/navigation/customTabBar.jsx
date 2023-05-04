import React from 'react';

import {View, Pressable, Dimensions, StyleSheet, Image} from 'react-native';
import {APP_COLORS} from '../config/colors';
import {IMAGES} from '../config/images';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const NavigationIcon = ({route, isFocused}) => {
  const renderIcon = (route, isFocues) => {
    let height = 28;
    let width = 28;
    switch (route) {
      case 'HomeStack':
        return (
          <Image
            source={isFocues ? IMAGES.SelectedHomeIcon : IMAGES.HomeIcon}
            style={{width, height}}
          />
        );

      case 'AudioScreenStack':
        return (
          <Image
            source={isFocues ? IMAGES.SelectedAudioIcon : IMAGES.AudioIcon}
            style={{width, height}}
          />
        );

      case 'WorkbookStack':
        return (
          <Image
            source={
              isFocues ? IMAGES.SelectedWorkbookIcon : IMAGES.WorkbookIcon
            }
            style={{width, height}}
          />
        );

      case 'Profile':
        return (
          <Image
            source={
              isFocues ? IMAGES.SelectedSymptomsIcon : IMAGES.SymptomsIcon
            }
            style={{width, height}}
          />
        );

      default:
        break;
    }
  };

  return <View>{renderIcon(route.name, isFocused)}</View>;
};

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              {borderRightWidth: label == 'notes' ? 3 : 0},
            ]}>
            <Pressable onPress={onPress}>
              <LinearGradient
                style={{
                  borderRadius: 50,
                }}
                colors={
                  isFocused
                    ? APP_COLORS.buttonGradient
                    : ['transparent', 'transparent']
                }>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    padding: 10,
                  }}>
                  <NavigationIcon isFocused={isFocused} route={route} />
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
    backgroundColor: APP_COLORS.itemBackground,
    borderRadius: 50,
    marginHorizontal: width * 0.07,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});

export default CustomTabBar;
