import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, Input, Form } from 'reactstrap';
import { useDispatch } from 'react-redux';
import Action from '../store/actions/index';

const SearchControl: React.FC = () => {
    const [keyword, setKeyword] = useState<string>('');
    function onChange(e : ChangeEvent<HTMLInputElement>) : void{
        let target = e.target;
        let value = target.value;

        setKeyword(value);
    }

    const dispatch = useDispatch();
    function onSubmit(e : FormEvent) : void{
        e.preventDefault();
        dispatch(Action.search(keyword));
    }

	return (
        <Form
            id="search-form" 
            onSubmit={ onSubmit }
        >
            <InputGroup>
                <Input 
                    placeholder= { keyword !== '' ? '' : "Nhập từ khoá..." }
                    name="keyword"
                    value={ keyword }
                    onChange={ onChange }
                />
                <InputGroupAddon addonType="append">
                    <Button 
                        color="primary"
                    >
                        <i className="fa fa-search" aria-hidden="true"></i> Tìm kiếm
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>	
	);
}

export default SearchControl;
