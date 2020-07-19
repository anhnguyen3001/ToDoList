import React from 'react';
import { Input, Table } from 'reactstrap';
import { Task } from '../App';
import TaskItem from './TaskItem';

interface TaskListProps{
    tasks : Task[],
    onUpdateStatus(id : string) : void,
    onDeleteTask : (id : string) => void,
    onToggleEdit : (id : string) => void
}

const TaskList: React.SFC<TaskListProps> = (props) => {
    let tasks : Task[] = props.tasks;
    let elmTask = tasks.map((task : Task, index : number) => {
        return (
            <TaskItem
                key={ index }
                index={ index }
                task={ task }
                onUpdateStatus={ props.onUpdateStatus }
                onDeleteTask={ props.onDeleteTask }
                onToggleEdit={ props.onToggleEdit }
            />
        )
    })

    return (
        <Table bordered className="mt-15">
            <thead className="text-center">
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td><Input /></td>
                    <td>
                        <select className="form-control">
                            <option value={-1}>Tất cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích hoat</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                { elmTask }
            </tbody>
        </Table>
	);
}

export default TaskList;
