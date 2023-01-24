import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const rolesAdapter = createEntityAdapter({})
const initialState = rolesAdapter.getInitialState()

export const rolesApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getRoles:builder.query({
            query:()=>({
                url:"/roles",
                validateStatus:(res,result)=>{
                    return res.status === 200 && !result.isError
                },
            }),
            transformResponse:responseData=>{
                const loadedRoles = responseData.map(role=>{
                    role.id=role._id
                    return role
                });
                return rolesAdapter.setAll(initialState,loadedRoles)

            },
            providesTags:(result,err,arg)=>{
                if(result?.ids){
                    return [
                        {type:"Role",id:"LIST"},...result.ids.map(id=>({type:"Role",id}))
                    ]
                }else return [{type:"Role",id:"LIST"}]
            }
        }),
        addNewRole:builder.mutation({
            query:initialRoleData=>({
                url:"/roles",
                method:"POST",
                body:{...initialRoleData,}
            }),
            invalidatesTags:[{type:"Role",id:"List"}]
        }),
        updateRole:builder.mutation({
            query:initialRoleData=>({
                url:"/roles",
                method:"PATCH",
                body:{...initialRoleData,}
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Role",id:arg.id}
            ]
        }),
        deleteRole:builder.mutation({
            query:({id})=>({
                url:"/roles",
                method:"DELETE",
                body:{id},
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Role",id:arg.id}
            ]
        })
    })
})

export const {useGetRolesQuery,useAddNewRoleMutation,useUpdateRoleMutation,useDeleteRoleMutation}=rolesApiSlice