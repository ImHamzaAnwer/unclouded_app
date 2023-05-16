import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
    console.log(array, 'usage data array');
    return array;
  }
};

export const createNotification = async notification => {
  let response = await firestore().collection('notifications').add({
    notification,
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
    console.log(array, 'usage data array');
    return array;
  }
};
