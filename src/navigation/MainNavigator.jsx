import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import AudioPlayer from '../screens/AudioPlayerScreen';
// import SavingsCalculator from '../screens/SavingsCalculator';
import UsageScreen from '../screens/UsageScreen';
import Profile from '../screens/Profile';
import CustomTabBar from './customTabBar';
import AudioPlayer from '../screens/AudioScreen/AudioPlayer';
import AudioLibrary from '../screens/AudioScreen/AudioLibrary';

//Workbook
import Workbook from '../screens/Workbook/WorkbookScreen';
import PledgeScreen from '../screens/Workbook/PledgeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AudioScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="AudioLibrary">
      <Stack.Screen name="AudioLibrary" component={AudioLibrary} />
      <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
    </Stack.Navigator>
  );
};

const WorkbookStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Workbook">
      <Stack.Screen name="Workbook" component={Workbook} />
      <Stack.Screen name="PledgeScreen" component={PledgeScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      tab
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{header: () => null}}>
      <Tab.Screen name="UsageScreen" component={UsageScreen} />
      <Tab.Screen name="AudioScreenStack" component={AudioScreenStack} />
      <Tab.Screen name="WorkbookStack" component={WorkbookStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
