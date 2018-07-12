import React, { Component } from "react";
import data from "./data";
import Table from './Table';
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.items = data;

		const uniqueTypes = new Set(data.map(item => item.type));
		this.filteredTypes = Array.from(uniqueTypes);

		this.state = {
			activeFilters: ["phone", "tablet", "notebook"],
			sortingType: "ASC",
			sortColumn: ""
		};

		this.tableHeaders = ["", "Product Name", "Rating", "Price"];
	}

	prepareData() {
		const { activeFilters, sortColumn, sortingType } = this.state;
		let preparedData = this.items;

		if (activeFilters.length) {
			preparedData = this.items.filter(item =>
				activeFilters.includes(item.type)
			);
		} else {
			preparedData = [];
		}

		if (sortColumn) {
			if (sortColumn === "Product Name") {
				preparedData.sort((item1, item2) =>
					item1.name.localeCompare(item2.name)
				);
			}
			if (sortColumn === "Rating") {
				preparedData.sort((item1, item2) => item2.rating - item1.rating);
			}
			if (sortColumn === "Price") {
				const validatePrice = price => {
					return price.replace(/[^0-9]/, "");
				};
				preparedData.sort(
					(item1, item2) =>
						validatePrice(item2.price) - validatePrice(item1.price)
				);
			}
		}
		if (sortingType === "DESC") {
			preparedData.reverse();
		}
		return preparedData;
	}

	render() {
		const data = this.prepareData();
		return (
			<Table
				products={data}
				headers={this.tableHeaders}
				filters={this.filteredTypes}
				onFilteringChange={filters => this.filteringOut(filters)}
				onSortingChange={e => this.setSortingType(e)}
			/>
		);
	}

	filteringOut(filters) {
		const activeFilters = [];
		for (let filter in filters) {
			if (filters[filter]) {
				activeFilters.push(filter);
			}
		}
		this.setState({ activeFilters });
	}

	setSortingType(event) {
		const { sorting } = event.target.dataset;
		if (sorting === this.state.sortColumn) {
			const sortingType = this.state.sortingType === "ASC" ? "DESC" : "ASC";
			this.setState({ sortingType });
		}

		this.setState({ sortColumn: sorting });
	}
}

export default App;
