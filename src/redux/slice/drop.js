import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../util/http"

const initialState = {
    kanban_data: [],
    project_id: ''
}

function reorderList(list, startIndex, endIndex) {
    const result = list;
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const update_kanban_async = createAsyncThunk(
    'drop/update',
    async (action, state) => {
        const store = state.getState()
        const kanban_data = store.drop.kanban_data
        const project_id = store.drop.project_id
        const res = await axios.put(`/api/projects/${project_id}/kanban`, kanban_data)
        console.log(res)
    }
)

export const DropSlice = createSlice({

    // 在内部，调用了 useReducer 和 useAction 方法
    name: 'drop',
    initialState,
    reducers: {

        // 在原本的 ruducer 中，(state = initialState, action) => { }, initialState 作为默认参数
        set_project_id: (state, action) => {
            state.project_id = action.payload
        },
        set_kanban_data: (state, action) => {
            state.kanban_data = action.payload
        },
        kanban_order: (state, action) => {
            reorderList(
                state.kanban_data,
                action.payload.source,
                action.payload.destination
            )
        },
        task_same_order: (state, action) => {
            const kanban_data = state.kanban_data

            const kanban = kanban_data.find((item) => {
                return item.kanban_key === action.payload.kanban_key
            })
            let list_arr = kanban.task
            list_arr = reorderList(
                list_arr,
                action.payload.source,
                action.payload.destination
            )

            kanban.task = list_arr
        },
        task_diff_order: (state, action) => {
            const kanban_data = state.kanban_data

            const source_kanban = kanban_data.find((item) => {
                return item.kanban_key === action.payload.source_key
            })

            const destination_kanban = kanban_data.find((item) => {
                return item.kanban_key === action.payload.destination_key
            })

            const result_task = source_kanban.task[action.payload.source]
            source_kanban.task.splice(action.payload.source, 1)
            destination_kanban.task.splice(action.payload.destination, 0, result_task)
        },
        add_kanban: (state, action) => {
            const kanban_data = state.kanban_data

            // kanban_key 不能重复
            const flag = state.kanban_data.find((item) => {
                return item.kanban_key === action.payload.kanban_key
            })
            if (flag) {
                return
            }
            kanban_data.push({
                kanban_key: action.payload.kanban_key,
                task: []
            })
        },
        add_task: (state, action) => {
            const kanban = state.kanban_data.find((item) => {
                return item.kanban_key === action.payload.kanban_key
            })
            const task_data = action.payload.task

            kanban.task.push(task_data)
        },
        update_task: (state, action) => {
            const kanban_key = action.payload.kanban_key
            const task_id = action.payload.task_id
            let task_data = action.payload.task

            const kanban = state.kanban_data.find((item) => {
                return item.kanban_key === kanban_key
            })

            const index = kanban.task.findIndex((item) => {
                return item.task_id === task_id
            })

            task_data.task_id = kanban.task.task_id
            kanban.task[index] = task_data
        }
    }
})

export const kanban_selector = (state) => {
    return state.drop.kanban_data
}

export const { kanban_order, task_same_order, task_diff_order, add_kanban, add_task, set_project_id, set_kanban_data, update_task } = DropSlice.actions;
export default DropSlice.reducer