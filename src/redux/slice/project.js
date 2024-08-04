import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../util/http'
import { set_kanban_data } from "./drop";
import { set_current_project } from "./kanban";


const initialState = {
    list: [],
    loading: false,
    users: [],
    organizations: [],
    task_types: [],
    project_modal: {
        show: false,
        type: 'create',
        id: ''
    }
}

export const getProjectListAsync = createAsyncThunk(
    'project/get_project_list',
    async () => {
        const response = await axios.get('/api/projects')
        return response.data
    }
)

export const getUsersAsync = createAsyncThunk(
    'project/get_users',
    async () => {
        const response = await axios.get('/api/users');
        return response.data;
    }
)

export const getOrgsAsync = createAsyncThunk(
    'project/get_orgs',
    async () => {
        const response = await axios.get('/api/organization');
        // console.log('response',response)
        return response.data;
    }
)

export const get_project_async = createAsyncThunk(
    // 获取某个 project 信息
    'project/get_one_project',
    async (action, state) => {
        const res = await axios.get(`/api/project/${action}`)
        const kanban = res.data.data.kanban
        state.dispatch(set_kanban_data(kanban))
        state.dispatch(set_current_project(res.data.data))
    }
)

export const getTaskTypesAsync = createAsyncThunk(
    'project/get_task_types',
    async () => {
        const response = await axios.get('/api/task/type_list');
        return response.data;
    }
)

export const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        set_project_modal: (state, action) => {
            state.project_modal = {
                ...state.project_modal,
                ...action.payload
            }
        },
        change_list: (state, action) => {
            const { _id, data } = action.payload;
            const index = state.list.findIndex((item) => {
                return item._id === _id
            })
            state.list[index] = data;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectListAsync.pending, (state, res) => {
                state.loading = true
            })
            .addCase(getProjectListAsync.fulfilled, (state, res) => {
                const data = res.payload.data.data
                data.forEach(element => {
                    if (typeof (element.collect === 'undefined')) {
                        element.collect = false
                    }
                });
                state.list = data
                state.loading = false
            })
            .addCase(getOrgsAsync.fulfilled, (state, res) => {
                const data = res.payload.data;
                state.organizations = data;
            })
            .addCase(getUsersAsync.fulfilled, (state, res) => {
                const data = res.payload.data;
                state.users = data;
            })
            .addCase(getTaskTypesAsync.fulfilled, (state, res) => {
                const data = res.payload.data;
                state.task_types = data;
            })
    }
})

export const select_project_list = (state) => {
    return state.project.list
}

export const select_project_users = (state) => {
    return state.project.users
}

export const select_project_orgs = (state) => {
    return state.project.organizations
}
export const select_project_types = (state) => {
    return state.project.task_types
}

export const select_project_modal = (state) => {
    return state.project.project_modal
}

export const { set_project_modal, change_list } = ProjectSlice.actions

export default ProjectSlice.reducer