import React, { Component } from "react";
import { graphql } from "react-apollo";
import Currencies from "../currencies/Currencies";
import "./Navbar.css";
import BrandIcon from "../../assets/icons/brand_icon.svg";
import EmptyCart from "../../assets/icons/empty_cart.svg";
import { getCategoriesAndCurrenciesQuery } from "../../resources/queries/queries";
import { connect } from "react-redux";
import { selectCategory } from "../../resources/actions/navbarActions";

class Navbar extends Component {
  displayCategories = () =>
    !this.props.data.loading
      ? this.props.data.categories.map((category) => (
          <li
            key={category.name}
            className={
              category.name === this.props.categoryName ? "active" : null
            }
            onClick={() => {
              this.props.selectCategory(category.name);
            }}
          >
            {category.name}
          </li>
        ))
      : null;

  render() {
    return (
      <div className="Navbar">
        <ul className="categories">{this.displayCategories()}</ul>
        <img src={BrandIcon} className="logo" alt="a brand logo" />
        <div className="currency-cart">
          <Currencies currencies={this.props.data.currencies} />
          <img src={EmptyCart} alt="a cart icon" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categoryName: state.categoryName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectCategory: (categoryName) => {
      dispatch(selectCategory(categoryName));
    },
  };
};

export default graphql(getCategoriesAndCurrenciesQuery)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
