import ProjectTable from "./components/project_table"
import ProjectSearch from "./components/project_search"
import CreateProjectModal from "./components/create_project_modal"
import { useDispatch } from "react-redux"
import { set_project_modal } from "../redux/slice/project"

function Project() {

    const dispatch = useDispatch()

    function create_project_click() {
        dispatch(set_project_modal({
            show: true,
            type: 'create'
        }))
    }

    return (
        <div className="project_body_wrap">
            <div className="project_title_wrap">
                <h1>项目列表</h1>
                <button onClick={create_project_click}>创建项目</button>
            </div>
            <div className="project_search_wrap">
                <ProjectSearch />
            </div>
            <div className="project_table_wrap">
                <ProjectTable />
            </div>
            <CreateProjectModal />
        </div>
    )
}

export default Project