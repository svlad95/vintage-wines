import { combineReducers } from "redux";

//Combine all reducers

const currency = (state = "ron", action) => {
	switch (action.type) {
		case "CONVERT_TO_USD":
			return (state = "dollar");
		case "CONVERT_TO_EUR":
			return (state = "euro");
		case "CONVERT_TO_RON":
			return (state = "ron");
		default:
			return state;
	}
};
const displayedCartItems = (state = 0, action) => {
	switch (action.type) {
		case "INCREASE":
			return state + action.payload;
		case "DECREASE":
			return state - action.payload;
		default:
			return state;
	}
};

const allReducers = combineReducers({
	currency: currency,
	displayedCartItems: displayedCartItems,
});
export default allReducers;
