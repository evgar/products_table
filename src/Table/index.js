import React, { Component } from 'react';
import Filter from '../Filter';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';

const headers = ["", "Product Name", "Rating", "Price"];

const Table = ({ onSortingChange, products, onFilteringChange, filters }) => (
	<main className="main">
		<table className="table table-bordered w-auto">
			<TableHeader
				headers={headers}
				onSortingChange={onSortingChange}
			/>
			<tbody>
			<TableRow products={products} />
			</tbody>
		</table>
		<Filter
			filters={filters}
			onFilteringChange={onFilteringChange}
			onSortingChange={onSortingChange}
		/>
	</main>
);

export default Table
