import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const skillsAdapter = createEntityAdapter({})
const initialState = skillsAdapter.getInitialState()

export const skillsApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getSkills:builder.query({
            query:(filter)=>({
                url:`/skills/${JSON.stringify({ ...filter })}`,
                validateStatus:(res,result)=>{
                    return res.status === 200 && !result.isError
                },
            }),
            transformResponse:responseData=>{
                const loadedSkills = responseData.map(skill=>{
                    skill.id=skill._id
                    return skill
                });
                return skillsAdapter.setAll(initialState,loadedSkills)

            },
            providesTags:(result,err,arg)=>{
                if(result?.ids){
                    return [
                        {type:"Skill",id:"LIST"},...result.ids.map(id=>({type:"Skill",id}))
                    ]
                }else return [{type:"Skill",id:"LIST"}]
            }
        }),
        addNewSkill:builder.mutation({
            query:initialSkillData=>({
                url:"/skills",
                method:"POST",
                body:{...initialSkillData,}
            }),
            invalidatesTags:[{type:"Skill",id:"List"}]
        }),
        updateSkill:builder.mutation({
            query:initialSkillData=>({
                url:"/skills",
                method:"PATCH",
                body:{...initialSkillData,}
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Skill",id:arg.id}
            ]
        }),
        deleteSkill:builder.mutation({
            query:({id})=>({
                url:"/skills",
                method:"DELETE",
                body:{id},
            }),
            invalidatesTags:(result,error,arg)=>[
                {type:"Skill",id:arg.id}
            ]
        })
    })
})

export const {useGetSkillsQuery,useAddNewSkillMutation,useUpdateSkillMutation,useDeleteSkillMutation}=skillsApiSlice