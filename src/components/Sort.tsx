import React from 'react';
import { Button } from 'reactstrap';

interface SortProps{

}

const TaskControl: React.FC<SortProps> = () => {
	return (
        <Button color="primary">Sắp xếp <i className="fa fa-sort" aria-hidden="true"></i></Button>
	);
}

export default TaskControl;
