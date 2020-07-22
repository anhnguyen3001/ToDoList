import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button, Input, Card, CardHeader, CardBody, Form } from 'reactstrap';
import { Task } from '../store/reducers/tasks';
import Action from '../store/actions/index';
import { State } from '../store/reducers/index';

interface PropStates{
    openForm: boolean,
    editItem: Task
}

const TaskForm: React.FC = () => {
    const dispatch = useDispatch();
    let { openForm, editItem } = useSelector<State, PropStates>( state => ({
        openForm: state.openForm,
        editItem: state.editItem
    }));

    var [task, setTask] = useState<Task>(editItem);
    useEffect(()=> {
        setTask(editItem);
    }, [editItem])

    function onChange(e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) : void {
        let target = e.target; 
        let name : string = target.name;
        let value : string = target.value;

        setTask({...task , [name] : name !== 'status' ? value : Number(value)});
    }

    function onSubmit(e : React.FormEvent<HTMLFormElement>) : void {
        e.preventDefault();
        dispatch(Action.saveTask(editItem));
        closeForm();
    }

    function closeForm() : void{
        dispatch(Action.closeForm());
        setTask({
            id: "", 
            name: "", 
            status: 0
        });
    }
    
    if (!openForm) {
        return <span />;
    }

    return (
        <Col md="4">
            <Card>
                <CardHeader>
                    <h6>
                        { editItem.id !== "" ? "Cập nhật công việc" : "Thêm công việc" }
                    </h6>
                    <span><Button onClick={ closeForm } close></Button></span>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={ onSubmit }>
                        <div className="form-group">
                            <label>Tên: </label>
                            <Input 
                                name="name"
                                value={ editItem.name }
                                onChange={ onChange }
                            />
                        </div>
                        <div className="form-group mt-15">
                            <label>Trạng thái: </label>
                            <select 
                                id="input" 
                                className="form-control"
                                name="status" 
                                value={ editItem.status }
                                onChange={ onChange } 
                            >
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <Button className="mr-10" color="danger">
                                <i className="fa fa-plus" aria-hidden="true"></i> Lưu lại
                            </Button> 
                            <Button className="mr-10" color="warning" onClick={ closeForm }>
                                <i className="fa fa-times" aria-hidden="true"></i> Huỷ bỏ
                            </Button>
                        </div>
                    </Form>   
                </CardBody>
            </Card>
        </Col>
	);
}

export default TaskForm;
