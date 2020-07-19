import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Sort } from '../App';

interface SortProps{
	onSort : (sort : Sort) => void
}

const SortControl: React.FC<SortProps> = (props) => {
	const DESCEND = -1;
	const ASCEND = 1;

	const [toggle, setToggle] = useState<boolean>(false);
	const [sort, setSort] = useState<Sort>({
		by: '',
		value: 0
	});

	function isActive(by : string, value : number) : boolean{
		return (sort.by === by && sort.value === value)
	}

	function onSort(by : string, value : number) : void{
		setSort({
			by,
			value
		});
		
		props.onSort({
			by,
			value
		});
	}

	return (
		<Dropdown 
			isOpen={ toggle }
			toggle={ () => setToggle(!toggle) }
		>
			<DropdownToggle color="primary">
				Sắp xếp <i className="fa fa-sort" aria-hidden="true"></i>
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem
					onClick={ () => onSort('name', ASCEND) }
				>
						<i className="fa fa-sort-alpha-asc" aria-hidden="true"></i> <span className="mr-10">Tên A-Z </span>
						{ isActive('name', ASCEND) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}
				</DropdownItem>
				<DropdownItem
					onClick={ () => onSort('name', DESCEND) }
				>
					<i className="fa fa-sort-alpha-desc" aria-hidden="true"></i> <span className="mr-10">Tên Z-A </span>
					{ isActive('name', DESCEND) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}
				</DropdownItem>
				<DropdownItem divider />
				<DropdownItem
					onClick={ () => onSort('status', ASCEND) }
				>
					<span className="mr-10">Trạng thái kích hoạt </span>
					{ isActive('status', ASCEND) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}
				</DropdownItem>
				<DropdownItem
					onClick={ () => onSort('status', DESCEND) }
				>
					<span className="mr-10" >Trạng thái ẩn </span>
					{ isActive('status', DESCEND) ? <i className="fa fa-check" aria-hidden="true"></i> : ""}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
        // <Button color="primary">Sắp xếp <i className="fa fa-sort" aria-hidden="true"></i></Button>
	);
}

export default SortControl;
