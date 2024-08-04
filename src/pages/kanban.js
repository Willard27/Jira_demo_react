import { useEffect } from "react"
import DropWrap from "./components/drop"
import SearchForm from "./components/search_form"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { select_current_project } from "../redux/slice/kanban"
import { useDispatch } from "react-redux"
import { get_project_async } from "../redux/slice/project"
import { set_project_id } from "../redux/slice/drop"
import CreateTaskModal from "./components/create_task_modal"

function Kanban() {

    const dispatch = useDispatch()
    const params = useParams()
    const project_id = params.id
    const current_project = useSelector(select_current_project)

    useEffect(() => {

        dispatch(get_project_async(project_id))
        dispatch(set_project_id(project_id))
    }, [project_id])

    return (
        <div className="kanban_body">
            <div className="kanban_title">
                <h1>{current_project.name}项目看板</h1>
            </div>
            <div className="kanban_search_wrap">
                <SearchForm />
            </div>
            <div className="drop_wrap">
                <DropWrap />
            </div>
            <CreateTaskModal />
        </div>
    )
}

export default Kanban