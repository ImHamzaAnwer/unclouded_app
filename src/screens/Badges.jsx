import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Badges = () => {
  const [daysQuit, setDaysQuit] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    getDaysQuit();
    getBadges();
  }, []);

  const getDaysQuit = async () => {
    try {
      const startDate = await AsyncStorage.getItem('startDate');
      if (startDate !== null) {
        const today = new Date().getTime();
        const difference = today - new Date(startDate).getTime();
        const daysQuit = Math.floor(difference / (1000 * 3600 * 24));
        setDaysQuit(daysQuit);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getBadges = async () => {
    try {
      const badges = await AsyncStorage.getItem('badges');
      if (badges !== null) {
        setBadges(JSON.parse(badges));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBadge = async () => {
    let newBadges = [];
    if (daysQuit >= 1) {
      newBadges.push('Day 1');
    }
    if (daysQuit >= 7) {
      newBadges.push('Week 1');
    }
    if (daysQuit >= 30) {
      newBadges.push('Month 1');
    }
    if (daysQuit >= 90) {
      newBadges.push('3 Months');
    }
    if (daysQuit >= 180) {
      newBadges.push('6 Months');
    }
    if (daysQuit >= 365) {
      newBadges.push('1 Year');
    }
    try {
      await AsyncStorage.setItem('badges', JSON.stringify(newBadges));
      setBadges(newBadges);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleBadge();
  }, [daysQuit]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Badges</Text>
      {badges.length === 0 ? (
        <Text style={styles.noBadgeText}>You don't have any badges yet.</Text>
      ) : (
        <FlatList
          data={badges}
          keyExtractor={item => item}
          renderItem={({item}) => <Text style={styles.badge}>{item}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noBadgeText: {
    fontSize: 16,
    color: '#666',
  },
  badge: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
});

export default Badges;

// import React from 'react';
// import {View, Text, Image} from 'react-native';

// function Badges(props) {
//   const daysWithoutSmoking = 12;

//   let badge = null;

//   if (daysWithoutSmoking >= 7 && daysWithoutSmoking < 30) {
//     badge = <Image source={require("bronze_badge.png")} alt="Bronze badge" />;
//   } else if (daysWithoutSmoking >= 30 && daysWithoutSmoking < 365) {
//     badge = <Image source={require("silver_badge.png")} alt="Silver badge" />;
//   } else if (daysWithoutSmoking >= 365) {
//     badge = <Image source={require("gold_badge.png")} alt="Gold badge" />;
//   }

//   return (
//     <View>
//       <Text>Badges</Text>
//       <Text>{badge}</Text>
//     </View>
//   );
// }

// export default Badges;
