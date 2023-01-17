import { useState } from "react";

const useCurrentUser = () => {
    const[currentUser,setCurrentUser]=useState(null)
    return[currentUser,setCurrentUser]
}
 
export default useCurrentUser;