import AsyncStorage from '@react-native-async-storage/async-storage';
export default UserData = {
    setUser: async (userId, userName) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userName = await AsyncStorage.setItem("userName", userName);
                const userId = await AsyncStorage.setItem("userId", userId);
                resolve({
                    userName: userName,
                    userId: userId,
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    getuser: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const userName = await AsyncStorage.getItem("userName");
                const userId = await AsyncStorage.getItem("userId");
                resolve({
                    userName: userName,
                    userId: userId,
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}