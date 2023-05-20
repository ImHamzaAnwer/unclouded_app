import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import AudioPlayer from '../screens/AudioPlayerScreen';
// import SavingsCalculator from '../screens/SavingsCalculator';
import UsageScreen from '../screens/UsageScreen';
import Profile from '../screens/Profile';
import CustomTabBar from './customTabBar';
import AudioPlayer from '../screens/AudioScreen/AudioPlayer';
import AudioLibrary from '../screens/AudioScreen/AudioLibrary';
import AudioListSeeAll from '../screens/AudioScreen/AudioListSeeAll';

//Workbook
import Workbook from '../screens/Workbook/WorkbookScreen';
import PledgeScreen from '../screens/Workbook/PledgeScreen';
import HistoryScreen from '../screens/Workbook/HistoryScreen';
import Home from '../screens/Home/HomeScreen';
import SymptomsCountdown from '../screens/SymptomsTracker';
import Notifiactions from '../screens/Notifications';
import Favorites from '../screens/Favorites';

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
      <Stack.Screen name="AudioListSeeAll" component={AudioListSeeAll} />
      <Stack.Screen name="AudioPlayer" component={AudioPlayer} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PledgeScreen" component={PledgeScreen} />
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
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      tab
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{header: () => null}}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="AudioScreenStack" component={AudioScreenStack} />
      <Tab.Screen name="WorkbookStack" component={WorkbookStack} />
      <Tab.Screen name="SymptomsStack" component={SymptomsCountdown} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        header: () => null,
      }}
      initialRouteName="UsageScreen">
      <Stack.Screen name="UsageScreen" component={UsageScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Notifications" component={Notifiactions} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
