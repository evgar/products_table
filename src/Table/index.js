import React, { Component } from 'react';
import Filter from '../Filter';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
class Table extends Component {
	render() {
		return (
			<main className="main">
				<table className="table table-bordered w-auto">
					<TableHeader
						headers={this.props.headers}
						onSortingChange={this.props.onSortingChange}
					/>
					<tbody>
					<TableRow products={this.props.products} />
					</tbody>
				</table>
				<Filter
					filters={this.props.filters}
					onFilteringChange={this.props.onFilteringChange}
					onSortingChange={this.props.onSortingChange}
				/>
			</main>
		);
	}
}

export default Table