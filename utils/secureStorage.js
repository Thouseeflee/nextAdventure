import * as SecureStore from 'expo-secure-store';

export const saveData = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await SecureStore.setItemAsync(key, jsonData);
    console.log('Data saved to SecureStore');
  } catch (error) {
    console.error('Error saving data to SecureStore:', error);
  }
};

export const retrieveData = async (key) => {
  try {
    const jsonData = await SecureStore.getItemAsync(key);
    if (jsonData) {
      const data = JSON.parse(jsonData);
      console.log('Retrieved data from SecureStore:', data);
      return jsonData;
    } else {
      console.log('No data found in SecureStore');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data from SecureStore:', error);
    return null;
  }
};



