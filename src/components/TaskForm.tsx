import React, { useState, ChangeEvent, useEffect } from 'react';
import { Col, Button, Input, Card, CardHeader, CardBody, Form } from 'reactstrap';
import { Task } from '../App';

interface FormProps{
    onCloseForm : () => void,
    editTask : Task,
    onSubmitForm : (task : Task) => void
}

function generateID(){
	let id : number = Math.floor((Math.random() + 1) * 100);
	let reverseID = id.toString().split('').join('');
	return id + '-' + reverseID + '-' + id + '-' + reverseID;
}

const TaskForm: React.SFC<FormProps> = (props) => {
    var [task, setTask] = useState<Task>(props.editTask);

    useEffect(()=> {
        setTask(props.editTask);
    }, [props.editTask])

    function onChange(e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) : void {
        let target = e.target; 
        let name : string = target.name;
        let value : string = target.value;

        setTask({...task ,[name] : name !== 'status' ? value : Number(value)});
    }

    function onSubmit(e : React.FormEvent<HTMLFormElement>) : void {
        e.preventDefault();

        task.id = task.id !== '' ? task.id : generateID();

        props.onSubmitForm(task);
        onClear();
    }

    function closeForm() : void{
        onClear();
        props.onCloseForm();
    }

    function onClear() : void{
        setTask({
                id: "", 
                name: "", 
                status: 0
            });
    }

    return (
        <Col md="4">
            <Card>
                <CardHeader>
                    <h6>
                        { props.editTask.id !== "" ? "Cập nhật công việc" : "Thêm công việc" }
                    </h6>
                    <span><Button onClick={ closeForm } close></Button></span>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={ onSubmit }>
                        <div className="form-group">
                            <label>Tên: </label>
                            <Input 
                                name="name"
                                value={ task.name || ''}
                                onChange={ onChange }
                            />
                        </div>
                        <div className="form-group mt-15">
                            <label>Trạng thái: </label>
                            <select 
                                id="input" 
                                className="form-control"
                                name="status" 
                                value={ task.status || 0}
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
