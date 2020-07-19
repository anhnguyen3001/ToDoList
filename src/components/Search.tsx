import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, Input, Form } from 'reactstrap';

interface SearchProps{
    onSearch : (word : string) => void,
    isSearch : string
}

const Search: React.FC<SearchProps> = (props) => {
    const [keyword, setKeyword] = useState<string>('');

    useEffect(() => {
        setKeyword(props.isSearch);
    }, [props.isSearch])

    function onChange(e : ChangeEvent<HTMLInputElement>) : void{
        let target = e.target;
        let value = target.value;

        setKeyword(value);
    }

    function onSubmit(e : FormEvent) : void{
        e.preventDefault();

        props.onSearch(keyword);
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

export default Search;
