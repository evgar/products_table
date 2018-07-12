import React, { Component } from 'react';

class Filter extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		props.filters.forEach(filter => {
			this.state[filter] = true;
		});
	}

	render() {
		return (
			<div className="filter">
				{this.props.filters.map(item => (
					<div
						key={item}
						className="filter__block custom-control custom-checkbox"
					>
						<input
							type="checkbox"
							className="custom-control-input"
							name={item}
							id={item}
							checked={this.state[item]}
							onChange={() => this.handleChange(item)}
						/>

						<label
							className="filter__label custom-control-label"
							htmlFor={item}
						>
							{item}
						</label>
					</div>
				))}
			</div>
		);
	}

	handleChange(item) {
		this.setState({ [item]: !this.state[item] }, () =>
			this.props.onFilteringChange(this.state)
		);
	}
}

export default Filter;
