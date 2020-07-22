import React, { useState, ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Table } from 'reactstrap';
import TaskItem from './TaskItem';
import { State } from '../store/reducers/index';
import { Sort } from '../store/reducers/sort';
import { Task } from '../store/reducers/tasks';
import { Filter } from '../store/reducers/filter';
import Action from '../store/actions/index';

interface StateProps{
    tasks: Task[],
    keyword: string,
    sort: Sort,
    filter: Filter
}

const TaskList: React.FC = () => {
    // List of tasks
    let { tasks, keyword, sort, filter } = useSelector<State, StateProps>(state => (
        { 
            tasks: state.tasks,
            keyword: state.keyword,
            sort: state.sort,
            filter: state.filter
        })
    );

    const [list, setList] = useState<Task[]>(tasks);
    let elmTask = list.map( (task : Task, index : number) => {
        return (
            <TaskItem
                key={ index }
                index={ index }
                task={ task }
            />
        )
    });

    // Sort
    useEffect(() => {
        let { sortBy, sortValue } = sort;
        if (sortBy === "name"){
            tasks = tasks.sort((a, b) => a.name.localeCompare(b.name) * sortValue);
        } else {
            tasks = tasks.sort((a, b) => (b.status - a.status) * sortValue);
        }
        setList([...tasks]);
    }, [sort])

    // Search
    useEffect(() => {
        tasks = tasks.filter( task => {
            return task.name.toLowerCase().includes(keyword.toLowerCase());
        })
        setList([...tasks]);
    }, [keyword])

    // Filter
    const dispatch = useDispatch();
    function onFilter(e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) : void{
        let target = e.target;
        let name = target.name;
        let value = target.value;
        
        filter = {...filter, [name] : (name === "status") ? Number(value) : value };
        dispatch(Action.filter(filter));
    }

    useEffect( () => {
        tasks = tasks.filter( task => {
            let { filterName, filterStatus} = filter;
            
            if (filterName !== '' && !task.name.toLowerCase().includes(filterName.toLowerCase())) 
                return;
            
            if (filterStatus == -1) 
                return task;

            return task.status == filterStatus;
        });

        setList([...tasks]);
    }, [filter]);

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
                            name="filterName"
                            value={ filter.filterName }
                            onChange={ onFilter }
                        />
                    </td>
                    <td>
                        <select 
                            name="filterStatus"
                            className="form-control"
                            value={ filter.filterStatus }
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

export default (TaskList);
