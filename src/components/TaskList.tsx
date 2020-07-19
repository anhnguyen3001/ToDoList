import React, { useState, ChangeEvent } from 'react';
import { Input, Table } from 'reactstrap';
import { Task, Filter } from '../App';
import TaskItem from './TaskItem';

interface TaskListProps{
    tasks : Task[],
    keyword : string,
    onUpdateStatus(id : string) : void,
    onDeleteTask : (id : string) => void,
    onToggleEdit : (id : string) => void,
    onFilter : (filter : Filter) => void
}

const TaskList: React.SFC<TaskListProps> = (props) => {
    const DEFAULT_FILTER : Filter = {
        name : '',
        status : -1
    };

    const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);
    
    function onFilter(e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) : void{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        
        let newFilter : Filter = {...filter, [name] : (name === "status") ? Number(value) : value };

        setFilter({...filter, [name] : (name === "status") ? Number(value) : value});
        props.onFilter(newFilter);
    }

    let elmTask = props.tasks.map( (task : Task, index : number) => {
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
                    <td>
                        <Input
                            name="name"
                            value={ filter.name }
                            onChange={ onFilter }
                        />
                    </td>
                    <td>
                        <select 
                            name="status"
                            className="form-control"
                            value={ filter.status }
                            onChange={ onFilter }
                        >
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
