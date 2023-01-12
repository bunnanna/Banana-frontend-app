import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const tasksAdapter = createEntityAdapter({})
const initialState = tasksAdapter.getInitialState()

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getTasks:builder.query({
            query:()=>({
                url:"/tasks",
                validateStatus:(res,result)=>{
                    return res.status === 200 && !result.isError
                },
            }),
            transformResponse:responseData=>{
                const loadedTasks = responseData.map(task=>{
                    task.id=task._id
                    return task
                });
                return tasksAdapter.setAll(initialState,loadedTasks)

            },
            providesTags:(result,err,arg)=>{
                if(result?.ids){
                    return [
                        {type:"Task",id:"LIST"},...result.ids.map(id=>({type:"Task",id}))
                    ]
                }else return [{type:"Task",id:"LIST"}]
            }
        }),
    })
})

export const {useGetTasksQuery}=tasksApiSlice