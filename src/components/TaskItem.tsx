import React from 'react';
import { Button, Badge } from 'reactstrap';
import { Task } from '../App';

interface TaskItemProps{
    index : number,
    task : Task,
    onUpdateStatus : (id : string) => void,
    onDeleteTask : (id : string) => void,
    onToggleEdit : (id : string) => void
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
    let task : Task = props.task;
    let index : number = props.index;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{ task.name }</td>
            <td className="text-center">
                <Badge 
                    key={index}
                    color={ task.status === 0 ? "danger" : "success" }
                    onClick={ () => props.onUpdateStatus( task.id )}
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
                    onClick={ () => props.onToggleEdit(task.id) }
                >
                    <i className="fa fa-pencil" aria-hidden="true"></i> Sửa
                </Button> 
                <Button 
                    className="mr-10 edit-btn" 
                    color="warning"
                    onClick={ () => props.onDeleteTask(task.id) }
                >
                    <i className="fa fa-trash" aria-hidden="true"></i> Xoá
                </Button>
            </td>
        </tr>
	);
}

export default TaskItem;
