import React from 'react';
import { Button, Badge } from 'reactstrap';
import { Task } from '../store/reducers/tasks';
import Action from '../store/actions/index'
import { useDispatch } from 'react-redux';

interface TaskItemProps{
    index : number,
    task : Task,
}

interface StateProps{
    
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const dispatch = useDispatch();
    let task : Task = props.task;
    let index : number = props.index;

    let openForm = ( () => {
        dispatch(Action.openForm());
        dispatch(Action.editItem(task));
    });

    let onUpdateStatus = () => {
        task.status = 1 - task.status;
		dispatch(Action.saveTask(task));
    }

    let onDeleteTask = () => {
		dispatch(Action.deleteTask(task));
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{ task.name }</td>
            <td className="text-center">
                <Badge 
                    key={index}
                    color={ task.status === 0 ? "danger" : "success" }
                    onClick={ onUpdateStatus }
                    className="status"
                    pill
                >
                    { task.status === 0 ? "Ẩn" : "Kích hoạt"}
                </Badge>
            </td>
            <td className="text-center">
                <Button 
                    className="mr-10 edit-btn" 
                    color="danger"
                    onClick={ openForm }
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i> Sửa
                </Button> 
                <Button 
                    className="mr-10 edit-btn" 
                    color="warning"
                    onClick={ onDeleteTask }
                >
                    <i className="fa fa-trash" aria-hidden="true"></i> Xoá
                </Button>
            </td>
        </tr>
	);
}

export default TaskItem;
