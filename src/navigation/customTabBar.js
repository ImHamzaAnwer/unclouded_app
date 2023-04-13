import React from 'react';

import {View, Pressable, Dimensions, StyleSheet, Image} from 'react-native';
import {APP_COLORS} from '../config/colors';

const {width} = Dimensions.get('window');

// const  NavigationIcon = ({route, isFocused}) => {
//     const renderIcon = (route, isFocues) =>{
//       let height = 20;
//       let width = 20;

//       switch (route) {
//         case "home":
//           return isFocues?<HomeSvg2 height={height} width={width} />: <HomeSvg height={height} width={width} />
//         case "analytics":
//           return isFocues?<ActivitySvg2 height={height} width={width} />: <ActivitySvg height={height} width={width} />
//         case "notes":
//           return isFocues?<EditSvg2 height={height} width={width} />: <EditSvg height={height} width={width} />
//         case "settings":
//           return isFocues?<SettingsSvg2 height={height} width={width} />:<SettingsSvg height={height} width={width} />
//         default:
//           break;
//       }
//     }

//     return (
//       <View>
//         {renderIcon(route, isFocused)}
//       </View>

//     )
//   }

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
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? APP_COLORS.primary : 'transparent',
                borderRadius: 50,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 15,
                }}>
                <Image
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
                  source={require('../assets/images/logo.png')}
                />
              </View>
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
