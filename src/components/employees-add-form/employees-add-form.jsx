import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			salary: '',
			error: false
		}
	}

	onValueChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

    onSubmit = (e) => {
        e.preventDefault();
		if (this.state.name.length < 3 || this.state.salary === '') {
			this.setState({
				error: true
			})
		} else {
			this.props.onAdd(this.state.name, this.state.salary);
			this.setState({
				name: '',
				salary: '',
				error: false
			})
		}
    }

	render() {
		const { name, salary, error } = this.state;

		let classNames = 'form-control new-post-label'
		if (error) {
			classNames += ' is-invalid'
		}

		return (
			<div className="app-add-form">
				<h3>Добавьте нового сотрудника</h3>
				<form
					className="add-form d-flex"
					onSubmit={this.onSubmit}>
					<input type="text"
						className={classNames}
						placeholder="Как его зовут?" 
						name='name'
						value={name}
						onChange={this.onValueChange}/>
					<input type="number"
						className={classNames}
						placeholder="З/П в $?"
						name='salary'
						value={salary}
						onChange={this.onValueChange}/>
	
					<button type="submit"
							className="btn btn-outline-light">Добавить</button>
				</form>
			</div>
		)
	}
}

export default EmployeesAddForm;