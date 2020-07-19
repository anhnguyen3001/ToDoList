import React from 'react';

import Search from './Search';
import Sort from './Sort';

import { Row, Col } from 'reactstrap';

interface TaskControlProps{
    onSearch : (word : string) => void,
    isSearch : string
}

const TaskControl: React.FC<TaskControlProps> = (props) => {
	return (
        <div>
            <Row className="mt-15">
                {/* Search */}
                <Col md="6">
                    <Search 
                        onSearch={ props.onSearch }
                        isSearch={ props.isSearch }
                    />
                </Col>
                {/* Sort */}
                <Col md="6">
                    <Sort />    
                </Col>
            </Row>
        </div>
	);
}

export default TaskControl;
