import React, { useState, useEffect } from 'react';
import './App.css';
import { Row, Col, Button } from 'reactstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskControl from './components/TaskControl';

export interface Task{
	id: string,
    name: string,
    status: number // 0 - ẩn, 1 - kích hoạt
}

export interface Filter{
	name : string,
	status? : number
}

export interface Sort{
	by: string,
	value: number 	// 1 - tăng, -1 - giảm
}

const App: React.FC = () => {
	const TASK_DEFAULT : Task = {
		id : '',
		name : '',
		status : 0
	};

	const DEFAULT_FILTER : Filter = {
        name : '',
        status : -1
	};

	const [collapse, setCollapse] = useState<boolean>(true);
	const [tasks, setTasks] = useState<Array<Task>>([]);
	const [editTask, setEditTask] = useState<Task>(TASK_DEFAULT);
	const [keyword, setKeyword] = useState<string>('');
	const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

	// Get task list from local storage
	useEffect(() => {
		if (localStorage){
			let task = localStorage.getItem('tasks');

			if (task) {
				setTasks(JSON.parse(task));
			}
		}
	}, []);

	function isEditing() : boolean {
		return JSON.stringify(editTask) !== JSON.stringify(TASK_DEFAULT);
	}

	function isFilter() : boolean{
		return JSON.stringify(filter) !== JSON.stringify(DEFAULT_FILTER);
	}

	// Toggle task form
	function onToggleForm(){
		if (!collapse && isEditing()){		// form edit - open, add btn - click
			setEditTask(TASK_DEFAULT);
		} else {
			if(collapse) {
				onOpenForm();
			} else onCloseForm();
		}
	}
	
	function onOpenForm() : void{
		setCollapse(false);
	}

	function onCloseForm() : void{
		setCollapse(true);
		setEditTask(TASK_DEFAULT);
	}

	function onSubmitForm(task : Task) : void{
		var newTasks : Task[] = [...tasks];

		if (!isEditing()){
			newTasks.push(task);
		} else {
			let i : number = findIndex(task.id);
			newTasks[i] = { ...task};
		}
		
		setTasks(newTasks);
		localStorage.setItem('tasks', JSON.stringify(newTasks));
		
		setKeyword('');

		onCloseForm();
	}

	function onUpdateStatus(id : string) : void{
		let i : number = findIndex(id);
		if (i !== -1){
			let newTasks : Task[] = [...tasks];
			newTasks[i].status = 1 - newTasks[i].status;
			
			setTasks(newTasks);
			localStorage.setItem('tasks', JSON.stringify(newTasks));
		}
	}

	function onDeleteTask(id : string) : void{
		let i : number = findIndex(id);

		if (i !== -1){
			let newTasks : Task[] = [...tasks];
			newTasks.splice(i, 1);

			setTasks(newTasks);
			localStorage.setItem('tasks', JSON.stringify(newTasks));
		}
	}

	function onSearch(word : string) : void{	
		setKeyword(word);
	}

	function onToggleEdit(id : string) : void{
		if (id !== editTask.id){
			let i : number = findIndex(id);
		
			if (i !== -1){
				setEditTask(tasks[i]);
				if (collapse) setCollapse(!collapse);
				return;
			}
		}
	}
	
	function findIndex(id : string) : number{
		let result : number = -1;
		tasks.forEach( (task, index) => {
			if (task.id === id) {
				result = index;
			}	
		});

		return result;
	}

	function onFilter(filter : Filter) : void{
		if (filter.status === undefined) filter.status = -1;
		setFilter(filter);
	}

	var filterTask : Task[] = (keyword === '' && !isFilter()) ? [] :
					tasks.filter( task => {
						let newFilter = {...filter};
						if (keyword !== '') newFilter.name = keyword;
				
						let { name, status } = newFilter;
				
						if (name !== '' && !task.name.toLowerCase().includes(name.toLowerCase())) 
							return;
						
						if (status == -1) 
							return task;

						return task.status == status;
					});

	function onSort(sort : Sort) : void{
		let {by, value} = sort;

		let newTasks = [...tasks];
		if (by === "name"){
			newTasks = newTasks.sort((a, b) => a.name.localeCompare(b.name) * value);

			setTasks(newTasks);
		} else {
			newTasks = newTasks.sort((a, b) => (b.status - a.status) * value);

			setTasks(newTasks);
		}
	}

	var elmForm = collapse ? '' : <TaskForm 
									onCloseForm={ onCloseForm } 
									onSubmitForm = { onSubmitForm }
									editTask={ editTask }
								/>;

	return (
		<div className="container mt-15">
			<header><h1>Quản lí công việc</h1></header>
			<hr />
			<Row className="mt-15">
				{ elmForm }
				{/* Content */}
				<Col className="content" md={collapse ? 12 : 8}>
					{/* Content */}
					<Button  
						color="primary"
						onClick={ onToggleForm }
					>
						<i className="fa fa-plus" aria-hidden="true"></i> Thêm
					</Button>
					<TaskControl 
						onSearch={ onSearch }
						isSearch={ keyword }
						onSort= { onSort }
					/>
					<TaskList 
						tasks={ (keyword !== '' || JSON.stringify(filter) !== JSON.stringify(DEFAULT_FILTER)) ? filterTask : tasks }
						keyword={ keyword }
						onUpdateStatus={ onUpdateStatus }
						onDeleteTask={ onDeleteTask }
						onToggleEdit={ onToggleEdit }
						onFilter={ onFilter }
					/>
				</Col>
			</Row>
		</div>
	);
}

export default App;
