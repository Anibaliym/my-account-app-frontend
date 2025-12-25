import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"

export const UserContext = createContext();

export const UserProvider = ({ chldren }) => {
    const [userData, setUserData] = useState({}); 
    
    return (
        <UserContext.Provider value={{ userData }}>
            { chldren }
        </UserContext.Provider>
        
        
    )
}
