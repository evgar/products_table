import React, {Component} from 'react'
import data from './data'
import './App.css'

class App extends Component {
	constructor() {
		super()

		this.state = {
			items: []
		}

		this.tableHeaders = ['Identifier', 'Product Name', 'Rating', 'Price']
		this.filteredTypes = []
		this.sortedBy = ''
	}

	componentWillMount() {
		this.setState({
			items: data
		})
		const uniqueTypes = new Set(data.map(item => item.type))
		this.filteredTypes = Array.from(uniqueTypes)
	}

	render() {
		return (
			<Table products={this.state.items} headers={this.tableHeaders} filters={this.filteredTypes}
				   onFilteringChange={filters => this.filteringOut(filters)} onSortingChange={e => this.sortingOut(e)}/>
		)
	}

	filteringOut(filters) {
		function getActiveFilters(filters) {
			const activeFilters = []
			for (let filter in filters) {
				if (filters[filter]) {
					activeFilters.push(filter)
				}
			}
			return activeFilters
		}

		const newFilters = data.filter(item =>
			getActiveFilters(filters).includes(item.type)
		)

		this.setState({items: newFilters})
	}

	sortingOut(event) {
		// const {sorting} = event.target.dataset
		this.sortedBy = event.target.dataset.sorting
		let sortedItems=[]
		if (this.sortedBy === 'Product Name') {
			sortedItems = this.state.items.sort((item1, item2) => item1.name.localeCompare(item2.name))
		}
		if (this.sortedBy === 'Rating') {
			sortedItems = this.state.items.sort((item1, item2) => item2.rating - item1.rating)
		}
		if (this.sortedBy === 'Price') {
			const validatePrice = (price) => {
				return price.replace(/[^0-9]/, '')
			}
			sortedItems = this.state.items.sort((item1, item2) => validatePrice(item2.price) - validatePrice(item1.price))
		}
		this.setState({items: sortedItems})
	}
}

class Table extends Component {
	constructor() {
		super()

	}

	render() {
		return (
			<main>
				<table className="table">
					<TableHeader headers={this.props.headers}
								 onSortingChange={this.props.onSortingChange} />
					<tbody>
					<TableRow products={this.props.products}/>
					</tbody>
				</table>
				<Filter filters={this.props.filters}
						onFilteringChange={this.props.onFilteringChange}
						onSortingChange={this.props.onSortingChange}/>
			</main>
		)
	}
}

class TableHeader extends Component {

	constructor() {
		super()

	}

	render() {
		return (
			<thead>
			<tr>
				{
					this.props.headers.map(tHeader =>
						<th key={tHeader} data-sorting={tHeader} onClick={e => this.handleClick(e)}>{tHeader}</th>)
				}
			</tr>
			</thead>
		)
	}

	handleClick(event) {
		this.props.onSortingChange(event)
	}
}

class TableRow extends Component {
	render() {
		return (
			Object.values(this.props.products).map(product =>
				<tr key={product.id}>
					<td><input type="checkbox" className=""/></td>
					<td>{product.name}</td>
					<td>{product.rating}</td>
					<td>{product.price}</td>
				</tr>
			)
		)
	}
}

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
				{
					this.props.filters.map(item =>
						<div className="custom-control custom-checkbox">
							<input type="checkbox"
								   className="custom-control-input"
								   name={item}
								   id={item}
								   checked={this.state[item]}
								   onChange={() => this.handleChange(item)} />

							<label key={item} className="custom-control-label" for={item}>
								{item}
							</label>
						</div>
					)
				}
			</div>
		)
	}

	handleChange(item) {
		this.setState({[item]: !this.state[item]},
			() => this.props.onFilteringChange(this.state)
		);
	}
}


export default App
