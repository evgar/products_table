import React, { Component } from 'react';

class TableHeader extends Component {

	render() {
		return (
			<thead className="thead">
			<tr>
				{this.props.headers.map((tHeader, i) => {
					if (i === 0) {
						return (
							<th key={tHeader}>
								<i className="fa fa-check-square fa-lg" aria-hidden="true" />
							</th>
						)
					}
					return (
						<th
							className="thead__header"
							key={tHeader}
							onClick={() => this.handleClick(tHeader)}
						>
							{tHeader}
						</th>
					);
				})}
			</tr>
			</thead>
		);
	}

	handleClick(event) {
		this.props.onSortingChange(event);
	}
}

export default TableHeader
