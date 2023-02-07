import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";

const PersistLogin = () => {
    const token = useSelector(selectCurrentToken)
    const effectRef = useRef(false)

    const [trueSuccess,setTrueSuccess] = useState(false)

    const [refresh,{isUninitialized,isLoading,isSuccess,isError,error}] = useRefreshMutation()
    
    useEffect(()=>{
        if(effectRef.current === true || process.env.NODE_ENV !== "development"){
            const verifyRefreshToken = async ()=>{
                console.log("verifying refresh token")
                try{
                    // const response = 
                    await refresh()
                    // const { accessToken } = response.data
                    setTrueSuccess(true)
                }catch(err){
                    console.log(err)
                }
            }
            if(!token) verifyRefreshToken()
        }
        return ()=> effectRef.current = true
        // eslint-disable-next-line
    },[])

    let content
    if(isLoading){
        console.log("loading")
        content = <p>Loading...</p>
    }else if(isError){
        console.log("error")
        content = (
            <Alert variant="danger">
                {`${error?.data?.message} - `}
                <Alert.Link href="/login">Please login again</Alert.Link>
            </Alert>
        )
    }else if(isSuccess && trueSuccess){
        console.log("success")
        content = <Outlet/>
    }else if (token && isUninitialized){
        console.log("token and uninit")
        content = <Outlet/>
}
return content
}
 
export default PersistLogin;