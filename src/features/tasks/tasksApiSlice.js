import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const tasksAdapter = createEntityAdapter({})
const initialState = tasksAdapter.getInitialState()

export const tasksApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: ( filter ) => {
                return {
                    url: `/tasks/${JSON.stringify({ ...filter })}`,
                    validateStatus: (res, result) => {
                        return res.status === 200 && !result.isError
                    },
                }
            },
            transformResponse: responseData => {
                const loadedTasks = responseData.map(task => {
                    task.id = task._id
                    return task
                });
                return tasksAdapter.setAll(initialState, loadedTasks)

            },
            providesTags: (result, err, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Task", id: "LIST" }, ...result.ids.map(id => ({ type: "Task", id }))
                    ]
                } else return [{ type: "Task", id: "LIST" }]
            }
        }),
        addNewTask: builder.mutation({
            query: initialTaskData => ({
                url: "/tasks",
                method: "POST",
                body: { ...initialTaskData, }
            }),
            invalidatesTags: [{ type: "Task", id: "List" }]
        }),
        updateTask: builder.mutation({
            query: initialTaskData => ({
                url: "/tasks",
                method: "PATCH",
                body: { ...initialTaskData, }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Task", id: arg.id }
            ]
        }),
        updatecheckTask: builder.mutation({
            query: checklist => ({
                url: "/tasks/checklists",
                method: "PATCH",
                body: checklist
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Task", id: arg.id }
            ]
        }),
        deleteTask: builder.mutation({
            query: ({ id }) => ({
                url: "/tasks",
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Task", id: arg.id }
            ]
        })
    })
})

export const { useGetTasksQuery, useAddNewTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation, useUpdatecheckTaskMutation } = tasksApiSlice