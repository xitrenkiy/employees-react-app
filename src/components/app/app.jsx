import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{name: 'John W.', salary: 500, increase: true, rise: true, id: 1},
				{name: 'Johnatan S.', salary: 1000, increase: true, rise: false, id: 2},
				{name: 'William G.', salary: 5000, increase: false, rise: false, id: 3}
			],
			term: '',
			btn: 'all'
		}
		this.maxId = 4;
	}

	deleteItem = (id) => {
		this.setState(({data}) => {
			return {
				data: data.filter(item => item.id !== id)
			}
		})
	}

    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
			rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

	onToggleProp = (id, prop) => {
		this.setState(({data}) => ({
			data: data.map(item => {
				if (item.id === id) {
					return {...item, [prop]: !item[prop]}
				}
				return item;
			})
		}))
	}

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term});
	}

	onBtnClick = (items) => {
		return items.filter(item => {
			return item.rise === true;
		});
	}

	majorEmployee = (items) => {
		return items.filter(items => items.salary > 999);
	}

	onFilterClick = (btn) => {
		this.setState({btn});
	}

	render() {
		const { data, term, btn } = this.state;
		const employees = data.length;
		const increased = data.filter(item => item.increase).length;
		const visibleData = this.searchEmp(data, term);
		const riseFilter = this.onBtnClick(data);
		const majorFilter = this.majorEmployee(data);

		return (
			<div className="app">
				<AppInfo employees={employees}
						 increased={increased}
				/>
	
				<div className="search-panel">
					<SearchPanel onUpdateSearch={this.onUpdateSearch}/>
					<AppFilter onFilterClick={this.onFilterClick}/>
				</div>
	
				<EmployeesList 
						data={btn === 'increase' ? riseFilter : btn === 'major' ? majorFilter : visibleData}
						onDelete={this.deleteItem}
						onToggleProp={this.onToggleProp}
						/>
				<EmployeesAddForm 
						onAdd={this.addItem}/>
			</div>
		)
	}
}

export default App;