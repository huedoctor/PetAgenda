import AsyncStorage from '@react-native-async-storage/async-storage';
export default UserData = {
    setUser: async (userName, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userNameResult = await AsyncStorage.setItem("userName", userName);
                const userIdResult = await AsyncStorage.setItem("userId", `${userId}`);
                resolve({
                    userName: userNameResult,
                    userId: userIdResult,
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