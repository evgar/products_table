import React, { Component } from "react";
import data from "./data";
import Table from './Table';
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.items = data;

		const uniqueTypes = new Set(data.map(item => item.type));
		this.filteredTypes = [...uniqueTypes];

		this.state = {
			activeFilters: [...uniqueTypes],
			sortingType: "ASC",
			sortColumn: ""
		};

		this.setSortingType = this.setSortingType.bind(this)
		this.filteringOut = this.filteringOut.bind(this)
	}

	prepareData() {
		const { activeFilters, sortColumn, sortingType } = this.state;
		let preparedData = this.items;

		preparedData = this.items.filter(item =>
			activeFilters.includes(item.type)
		);

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
				filters={this.filteredTypes}
				onFilteringChange={this.filteringOut}
				onSortingChange={this.setSortingType}
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

	setSortingType(sorting) {
		if (sorting === this.state.sortColumn) {
			const sortingType = this.state.sortingType === "ASC" ? "DESC" : "ASC";
			this.setState({ sortingType });
		}

		this.setState({ sortColumn: sorting });
	}
}

export default App;
