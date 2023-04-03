import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Workbook from '../screens/WorkbookScreen';
import SavingsCalculator from '../screens/SavingsCalculator';
import AudioPlayer from '../screens/AudioPlayerScreen';

function Routes() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Meditate" component={AudioPlayer} />
      <Tab.Screen name="Workbook" component={Workbook} />
      <Tab.Screen name="Savings Calculator" component={SavingsCalculator} />
    </Tab.Navigator>
  );
}

export default Routes;
