import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// Define the context types
export interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

export interface SocketProviderProps {
    children: ReactNode;
}

// Create context with undefined for safety
export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
};

export const SocketContextProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { authUser } = useAuthContext();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const socketUrl = import.meta.env.VITE_SOCKET_URL;

    useEffect(() => {
        if (!authUser) return;

        const newSocket = io(socketUrl, {
            query: { userId: authUser._id },
        });

        setSocket(newSocket);

        newSocket.on("activeRooms", (users: string[]) => {
            setOnlineUsers(users);
        });

        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [authUser, socketUrl]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};