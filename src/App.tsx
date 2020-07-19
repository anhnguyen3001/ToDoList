import React, { useState, useEffect } from 'react';
import './App.css';
import {Row, Col, Button} from 'reactstrap';
import $ from 'jquery';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskControl from './components/TaskControl';

export interface Task{
	id: string,
    name: string,
    status: number // 0 - ẩn, 1 - kích hoạt
}

const App: React.FC = () => {
	const TASK_DEFAULT : Task = {
		id : '',
		name : '',
		status : 0
	};

	const [collapse, setCollapse] = useState<boolean>(true);
	const [tasks, setTasks] = useState<Array<Task>>([]);
	const [editTask, setEditTask] = useState<Task>(TASK_DEFAULT);
	const [searchTask, setSearchTask] = useState<Task[]>([]);
	const [isSearch, setIsSearch] = useState<boolean>(false);

	var elmForm = collapse ? '' : <TaskForm 
										onCloseForm={ onCloseForm } 
										onSubmitForm = { onSubmitForm }
										editTask={ editTask }
									/>;

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
		
		setSearchTask([]);
		
		if ($('#search-form')) console.log ($('#search-form').children());

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

			if(searchTask.length !== 0) {
				searchTask.forEach( (task, index) => {
					if (task.id === id){
						searchTask.splice(index, 1);
						setSearchTask(searchTask);
						return;
					} 
				})
			}
		}
	}

	function onSearch(word : string) : void{
		let searchTasks : Task[] = [];
		
		// Build regex
		let pattern = new RegExp(/\w*/.source + word + /\w*/.source, 'i');
		
		tasks.forEach( task => {
			if (pattern.test(task.name)){
				searchTasks.push(task);
			}
		});
		
		setSearchTask(searchTasks);
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
						isSearch={ isSearch }
					/>
					<TaskList 
						tasks={ searchTask.length == 0 ? tasks : searchTask }
						onUpdateStatus={ onUpdateStatus }
						onDeleteTask={ onDeleteTask }
						onToggleEdit={ onToggleEdit }
					/>
				</Col>
			</Row>
		</div>
	);
}

export default App;
