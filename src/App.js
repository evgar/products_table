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
		this.sortedTypes = []
	}

	componentWillMount() {
		this.setState({
			items: data
		})
		const uniqueTypes = new Set(data.map(item => item.type))
		this.sortedTypes = Array.from(uniqueTypes)
	}

	render() {
		return (
			<Table products={this.state.items} headers={this.tableHeaders} filters={this.sortedTypes}
				   onFilteringChange={e => this.filteringOut(e)}/>
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
}

class Table extends Component {
	constructor() {
		super()

	}

	render() {
		return (
			<main>
				<table>
					<TableHeader headers={this.props.headers}/>
					<tbody>
					<TableRow products={this.props.products}/>
					</tbody>
				</table>
				<Filter filters={this.props.filters} onFilteringChange={this.props.onFilteringChange}/>
			</main>
		)
	}
}

class TableHeader extends Component {

	render() {
		return (
			<thead>
			<tr>
				{
					this.props.headers.map(tHeader =>
						<th key={tHeader}>{tHeader}</th>)
				}
			</tr>
			</thead>
		)
	}
}

class TableRow extends Component {
	render() {
		return (
			Object.values(this.props.products).map(product =>
				<tr key={product.id}>
					<td><input type="checkbox"/></td>
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
			<div>
				{
					this.props.filters.map(item =>
						<label key={item}>
							<input type="checkbox"
								   name={item}
								   checked={this.state[item]}
								   onChange={() => this.handleChange(item)}/>
							{item}
						</label>
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
