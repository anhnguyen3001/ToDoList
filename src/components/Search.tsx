import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Button, InputGroup, InputGroupAddon, Input, Form } from 'reactstrap';

interface SearchProps{
    onSearch : (word : string) => void,
    isSearch : boolean
}

const Search: React.FC<SearchProps> = (props) => {
    const [searchWord, setSearchWord] = useState<string>('');

    useEffect(() => {
        setSearchWord('');
        console.log(props.isSearch);
    }, [props.isSearch])

    function onChange(e : ChangeEvent<HTMLInputElement>) : void{
        let target = e.target;
        let value = target.value;

        setSearchWord(value);
    }

    function onSubmit(e : FormEvent) : void{
        e.preventDefault();

        props.onSearch(searchWord);
    }

	return (
        <Form
            id="search-form" 
            onSubmit={ onSubmit }
        >
            <InputGroup>
                <Input 
                    placeholder= { searchWord !== '' ? '' : "Nhập từ khoá..." }
                    name="searchWord"
                    value={ searchWord !== '' ? searchWord : "" }
                    onChange={ onChange }
                />
                <InputGroupAddon addonType="append">
                    <Button 
                        color="success"
                    >
                        <i className="fa fa-search" aria-hidden="true"></i> Tìm kiếm
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>	
	);
}

export default Search;
