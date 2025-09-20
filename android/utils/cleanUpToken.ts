import AsyncStorage from "@react-native-async-storage/async-storage";

const cleanUpToken = async (): Promise<string> => {
    const token = await AsyncStorage.getItem("UN-token");
    const cleanedToken = token?.replace(/['"]+/g, '');

    if (cleanedToken) {
        return cleanedToken;
    } else {
        return "";
    }
}

export default cleanUpToken;