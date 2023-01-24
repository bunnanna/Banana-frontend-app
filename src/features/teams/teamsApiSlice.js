import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const teamsAdapter = createEntityAdapter({})
const initialState = teamsAdapter.getInitialState()

export const teamsApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getTeams:builder.query({
            query:()=>({
                url:"/teams",
                validateStatus:(res,result)=>{
                    return res.status === 200 && !result.isError
                },
            }),
            transformResponse:responseData=>{
                const loadedTeams = responseData.map(team=>{
                    team.id=team._id
                    return team
                });
                return teamsAdapter.setAll(initialState,loadedTeams)

            },
            providesTags:(result,err,arg)=>{
                if(result?.ids){
                    return [
                        {type:"Team",id:"LIST"},...result.ids.map(id=>({type:"Team",id}))
                    ]
                }else return [{type:"Team",id:"LIST"}]
            }
        }),
        addNewTeam:builder.mutation({
            query:initialTeamData=>({
                url:"/teams",
                method:"POST",
                body:{...initialTeamData,}
            }),
            invalidatesTags:[{type:"Team",id:"List"}]
        }),
        updateTeam:builder.mutation({
            query:initialTeamData=>({
                url:"/teams",
                method:"PATCH",
                body:{...initialTeamData,}
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Team",id:arg.id}
            ]
        }),
        deleteTeam:builder.mutation({
            query:({id})=>({
                url:"/teams",
                method:"DELETE",
                body:{id},
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Team",id:arg.id}
            ]
        })
    })
})

export const {useGetTeamsQuery,useAddNewTeamMutation,useUpdateTeamMutation,useDeleteTeamMutation}=teamsApiSlice