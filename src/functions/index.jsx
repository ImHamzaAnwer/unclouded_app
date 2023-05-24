import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export const userId = auth().currentUser.uid;
export const userCreationTime = auth().currentUser.metadata.creationTime;

export const fetchUsageData = async () => {
  let response = await firestore()
    .collection('usageData')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  if (!response.empty) {
    let array = [];
    response.docs.forEach(doc => {
      array.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return array;
  }
};

export const createNotification = async ({notification, type}) => {
  let response = await firestore().collection('notifications').add({
    notification,
    type,
    createdAt: firestore.Timestamp.now().toDate(),
    userId,
  });

  if (!response.empty) {
    let array = [];
    response.docs.forEach(doc => {
      array.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return array;
  }
};

export const formatFirebaseTimestamp = timestamp => {
  const currentTimestamp = Date.now();
  const timestampMilliseconds = timestamp.toMillis();

  const timeDifference = currentTimestamp - timestampMilliseconds;

  if (timeDifference >= 24 * 60 * 60 * 1000) {
    // More than 24 hours ago
    const daysAgo = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    return daysAgo + ' days ago';
  } else if (timeDifference >= 60 * 60 * 1000) {
    // More than 1 hour ago
    const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
    return hoursAgo + ' hours ago';
  } else if (timeDifference >= 60 * 1000) {
    // More than 1 minute ago
    const minutesAgo = Math.floor(timeDifference / (60 * 1000));
    return minutesAgo + ' minutes ago';
  } else {
    // Less than 1 minute ago
    const secondsAgo = Math.floor(timeDifference / 1000);
    return secondsAgo + ' seconds ago';
  }
};

export const groupByDate = array => {
  return array.reduce((result, notification) => {
    const date = notification.date;
    const formattedDate = moment(date, 'DD-MM-YYYY').format('DD MMM, YYYY');
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    let groupKey;
    if (date === today) {
      groupKey = 'Today';
    } else if (date === yesterday) {
      groupKey = 'Yesterday';
    } else {
      groupKey = formattedDate;
    }
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(notification);
    return result;
  }, {});
};
