import { configureStore } from "@reduxjs/toolkit";
import dropReducer from "./slice/drop"
import projectReducer from "./slice/project"
import kanbanReducer from "./slice/kanban";

export const store = configureStore({
    reducer: {
        drop: dropReducer,
        project: projectReducer,
        kanban: kanbanReducer
    }
})