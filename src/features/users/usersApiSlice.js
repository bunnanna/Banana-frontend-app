import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>({
                url:"/users",
                validateStatus:(res,result)=>{
                    return res.status === 200 && !result.isError
                },
            }),
            transformResponse:responseData=>{
                const loadedUsers = responseData.map(user=>{
                    user.id=user._id
                    return user
                });
                return usersAdapter.setAll(initialState,loadedUsers)

            },
            providesTags:(result,err,arg)=>{
                if(result?.ids){
                    return [
                        {type:"User",id:"LIST"},...result.ids.map(id=>({type:"User",id}))
                    ]
                }else return [{type:"User",id:"LIST"}]
            }
        }),
        addNewUser:builder.mutation({
            query:initialUserData=>({
                url:"/users",
                method:"POST",
                body:{...initialUserData,}
            }),
            invalidatesTags:[{type:"User",id:"List"}]
        }),
        updateUser:builder.mutation({
            query:initialUserData=>({
                url:"/users",
                method:"PATCH",
                body:{...initialUserData,}
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"User",id:arg.id}
            ]
        }),
        deleteUser:builder.mutation({
            query:({id})=>({
                url:"/users",
                method:"DELETE",
                body:{id},
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"User",id:arg.id}
            ]
        })
    })
})

export const {useGetUsersQuery,useAddNewUserMutation,useUpdateUserMutation,useDeleteUserMutation}=usersApiSlice