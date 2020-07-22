import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Sort } from '../store/reducers/sort';
import Action from '../store/actions/index';
import { State } from '../store/reducers/index';

const SortControl: React.FC = () => {
	const DESCEND = -1;
	const ASCEND = 1;

	const [toggle, setToggle] = useState<boolean>(false);
	const { sortBy, sortValue } = useSelector<State, Sort>(state => (state.sort));

	function isActive(by : string, value : number) : boolean{
		return (sortBy === by && sortValue === value)
	}

	const dispatch = useDispatch();
	function onSort(by : string, value : number) : void{
		dispatch(Action.sort(by, value));
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
	);
}

export default SortControl;
