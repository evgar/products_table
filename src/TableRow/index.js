import React, { Component } from 'react';
import StarRatings from "react-star-ratings";
class TableRow extends Component {
	render() {
		return Object.values(this.props.products).map(product => (
			<tr key={product.id}>
				<td>
					<div className="custom-control custom-checkbox">
						<input
							type="checkbox"
							className="custom-control-input"
							id={product.id}
						/>
						<label className="custom-control-label" htmlFor={product.id} />
					</div>
				</td>
				<td>{product.name}</td>
				<td>
					<StarRatings
						rating={product.rating}
						starRatedColor="#ffc107"
						numberOfStars={5}
						name="rating"
						starDimension="15px"
					/>
				</td>
				<td>{product.price}</td>
			</tr>
		));
	}
}

export default TableRow