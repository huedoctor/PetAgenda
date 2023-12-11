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
                const userId = await AsyncStorage.getItem("userId");
                if (userId == null) {
                    resolve(null);
                }

                const userName = await AsyncStorage.getItem("userName");
                resolve({
                    userName: userName,
                    userId: userId,
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    removeUser: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                await AsyncStorage.removeItem("userName");
                await AsyncStorage.removeItem("userId");
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    }
}