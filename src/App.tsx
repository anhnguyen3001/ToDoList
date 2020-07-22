import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Row, Col, Button } from 'reactstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskControl from './components/TaskControl';
import Action from './store/actions/index';
import { State } from './store/reducers/index';
import { Task } from './store/reducers/tasks';

export interface PropStates{
	openForm: boolean,
	editItem: Task
}

const App: React.FC = () => {
	let { openForm, editItem } = useSelector<State, PropStates>(state => ({
		openForm: state.openForm,
		editItem: state.editItem
	}));

	// Toggle task form
	const dispatch = useDispatch();
	let onToggleForm = () => {
		if(editItem.id === ''){
			dispatch(Action.toggleForm());	
		}

		// To clear form
		dispatch(Action.editItem());
	}

	return (
		<div className="container mt-15">
			<header><h1>Quản lí công việc</h1></header>
			<hr />
			<Row className="mt-15">
				<TaskForm />
				{/* Content */}
				<Col className="content" md={ openForm ? 8 : 12 }>
					{/* Content */}
					<Button  
						color="primary"
						onClick={ onToggleForm }
					>
						<i className="fa fa-plus" aria-hidden="true"></i> Thêm
					</Button>
					<TaskControl />
					<TaskList />
				</Col>
			</Row>
		</div>
	);
}

export default App;
