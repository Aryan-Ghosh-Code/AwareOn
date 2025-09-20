import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	AuthContextType,
	AuthContextProviderProps,
	AuthUser,
} from "@/interfaces/interfaces";

const defaultAuthContext: AuthContextType = {
	authUser: null,
	setAuthUser: () => { },
	loading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [authUser, setAuthUser] = useState<AuthUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getStoredUser = async () => {
			try {
				const expiry = await AsyncStorage.getItem("UN-expiry");
				const now = Date.now();

				if (!expiry || now > parseInt(expiry, 10)) {
					await AsyncStorage.multiRemove(["UN-user", "UN-token", "UN-expiry"]);
					setAuthUser(null);
				} else {
					const storedUser = await AsyncStorage.getItem("UN-user");
					if (storedUser) {
						setAuthUser(JSON.parse(storedUser));
					}
				}
			} catch (error) {
				console.error("Error fetching user from storage:", error);
			} finally {
				setLoading(false);
			}
		};

		getStoredUser();
	}, []);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
