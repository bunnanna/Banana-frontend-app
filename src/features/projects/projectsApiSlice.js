import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const projectsAdapter = createEntityAdapter({})
const initialState = projectsAdapter.getInitialState()

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getProjects:builder.query({
            query:(filter)=>({
                url:`/projects/${JSON.stringify({ ...filter })}`,
                validateStatus:(res,result)=>{
                    return res.status === 200 && !result.isError
                },
            }),
            transformResponse:responseData=>{
                const loadedProjects = responseData.map(project=>{
                    project.id=project._id
                    return project
                });
                return projectsAdapter.setAll(initialState,loadedProjects)

            },
            providesTags:(result,err,arg)=>{
                if(result?.ids){
                    return [
                        {type:"Project",id:"LIST"},...result.ids.map(id=>({type:"Project",id}))
                    ]
                }else return [{type:"Project",id:"LIST"}]
            }
        }),
        addNewProject:builder.mutation({
            query:initialProjectData=>({
                url:"/projects",
                method:"POST",
                body:{...initialProjectData,}
            }),
            invalidatesTags:[{type:"Project",id:"List"}]
        }),
        updateProject:builder.mutation({
            query:initialProjectData=>({
                url:"/projects",
                method:"PATCH",
                body:{...initialProjectData,}
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Project",id:arg.id}
            ]
        }),
        deleteProject:builder.mutation({
            query:({id})=>({
                url:"/projects",
                method:"DELETE",
                body:{id},
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Project",id:arg.id}
            ]
        })
    })
})

export const {useGetProjectsQuery,useAddNewProjectMutation,useUpdateProjectMutation,useDeleteProjectMutation}=projectsApiSlice