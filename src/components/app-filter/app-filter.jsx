import { Component } from 'react';

import './app-filter.css';

class AppFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			btn: 'all'
		}
	}

	onBtnClick = (e) => {
		const target = e.currentTarget.getAttribute('data-btn');

		this.setState({
			btn: target
		})
		this.props.onFilterClick(target);
	}

	render() {
		return (
			<div className="btn-group">
				<button 
				className="btn btn-light"
				type="button"
				data-btn='all'
				onClick={this.onBtnClick}>
					Все сотрудники
				</button>
				<button 
				className="btn btn-outline-light"
				type="button"
				data-btn='increase'
				onClick={this.onBtnClick}>
					Сотрудники на повышение
				</button>
				<button 
				className="btn btn-outline-light"
				type="button"
				data-btn='major'
				onClick={this.onBtnClick}>
					З/П больше 1000$
				</button>
			</div>
		)
	}
}

export default AppFilter;