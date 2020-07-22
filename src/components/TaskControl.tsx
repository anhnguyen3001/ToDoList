import React from 'react';

import SearchControl from './SearchControl';
import SortControl from './SortControl';
import { Row, Col } from 'reactstrap';

const TaskControl: React.FC = (props) => {
	return (
        <div>
            <Row className="mt-15">
                {/* Search */}
                <Col md="6">
                    <SearchControl />
                </Col>
                {/* Sort */}
                <Col md="6">
                    <SortControl />    
                </Col>
            </Row>
        </div>
	);
}

export default TaskControl;
