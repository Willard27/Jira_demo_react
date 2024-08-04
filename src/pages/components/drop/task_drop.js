import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from 'antd';
import classnames from 'classnames'
import { useDispatch } from 'react-redux';
import { set_task_modal } from '../../../redux/slice/kanban';

function TaskDrop(props) {
    const dispatch = useDispatch()
    const task = props.task;
    const list = task.task

    function edit_task(kanban_key, task_id) {
        dispatch(set_task_modal({
            show: true,
            kanban_key,
            task_id,
            type: 'edit'
        }))

    }

    return (
        <Droppable droppableId={task.kanban_key} type="task">
            {(provided, snapshot) => (
                <div
                    className='task_drop_wrap'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {list.map((item, index) => {
                        return (
                            <Draggable
                                key={`${task.kanban_key}_${item.name}`}
                                draggableId={`${task.kanban_key}_${item.name}`}
                                index={index}
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                edit_task(task.kanban_key, item.task_id)
                                            }}
                                            className='task_drag_wrap'
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className='task_card'>
                                                <div className='task_card_top'>
                                                    <p className='task_head-p'>{item.name}</p>
                                                </div>
                                                <div className='task_card_bottom'>
                                                    <div className='task_owner'>{item.owner}</div>
                                                    <div className={classnames({
                                                        new_task_type: true,
                                                        red: item.type === 'bug',
                                                        blue: item.type === 'task'
                                                    })}>
                                                        <span className='task_type-span'>{item.type}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }}
                            </Draggable>
                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default TaskDrop;