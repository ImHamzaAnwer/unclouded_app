import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioPlayer from '../screens/AudioPlayerScreen';
import Workbook from '../screens/WorkbookScreen';
import SavingsCalculator from '../screens/SavingsCalculator';
import UsageScreen from '../screens/UsageScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{header: () => null}}>
      <Tab.Screen name="UsageScreen" component={UsageScreen} />
      <Tab.Screen name="Meditate" component={AudioPlayer} />
      <Tab.Screen name="Workbook" component={Workbook} />
      <Tab.Screen name="Savings Calculator" component={SavingsCalculator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
