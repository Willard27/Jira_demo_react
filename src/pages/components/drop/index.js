import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import "../../css/drop.css"
import TaskDrop from "./task_drop"
import { useSelector } from "react-redux"
import { add_kanban, kanban_order, kanban_selector, task_diff_order, task_same_order, update_kanban_async } from "../../../redux/slice/drop"
import { useDispatch } from "react-redux"
import { Button, Input } from "antd"
import { set_task_modal } from "../../../redux/slice/kanban"

// react-beautiful-dnd 生效要关闭 react 严格模式
function DropWrap() {

    const dispatch = useDispatch()
    const kanban_data = useSelector(kanban_selector)

    function onDragEnd(result) {

        if (!result.destination) {
            return
        }


        if (result.type === 'kanban') {
            dispatch(kanban_order({
                source: result.source.index,
                destination: result.destination.index
            }))
            dispatch(update_kanban_async())
        }

        if (result.type === 'task') {
            if (result.source.droppableId === result.destination.droppableId) {
                dispatch(task_same_order({
                    kanban_key: result.source.droppableId,
                    source: result.source.index,
                    destination: result.destination.index
                }))
                dispatch(update_kanban_async())
            } else {
                dispatch(task_diff_order({
                    source_key: result.source.droppableId,
                    destination_key: result.destination.droppableId,
                    source: result.source.index,
                    destination: result.destination.index
                }))
                dispatch(update_kanban_async())
            }

        }
    }

    function input_keydown(e) {
        const value = e.target.value.trim()

        if (!value) {
            return
        }

        dispatch(add_kanban({
            kanban_key: value
        }))
        dispatch(update_kanban_async())

    }

    function new_task_click(kanban_key) {
        dispatch(set_task_modal({
            show: true,
            kanban_key,
            type: 'create'
        }))
    }

    return (
        <div className="drag_container">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    direction="horizontal"
                    droppableId="droppable-kanban"
                    type="kanban">
                    {(provided, snapshot) => (
                        <div
                            className="kanban_drop_wrap"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {kanban_data.map((item, index) => {
                                return (
                                    <Draggable
                                        key={item.kanban_key}
                                        draggableId={item.kanban_key}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                className="kanban_drag_wrap"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <>{item.kanban_key}</>
                                                <TaskDrop task={item} />
                                                <Button
                                                    onClick={() => {
                                                        new_task_click(item.kanban_key)
                                                    }}
                                                    className='new_task_btn'
                                                    type="primary"
                                                    ghost
                                                >新建task</Button>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className='kanban_drag_wrap'>
                    <Input onPressEnter={input_keydown} placeholder="新建看板名称" />
                </div>
            </DragDropContext>
        </div>

    )
}

export default DropWrap