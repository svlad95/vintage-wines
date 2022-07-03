import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartProduct from './CartProduct'

function Checkout(props) {
  const { cartItems, onAdd, onRemove, removeFromCart } = props
  const currency = useSelector((state) => state.currency)
  let currencySign = ''
  const [selected, setSelected] = useState(null)
  const displayedCartItems = useSelector((state) => state.displayedCartItems)

  function checkForCurrency() {
    return currency === 'dollar' ? (currencySign = '$') : currency === 'euro' ? (currencySign = '€') : currency === 'ron' ? (currencySign = 'RON') : ''
  }
  checkForCurrency()
  let shipmentCostInRon = 30
  const shippingPrice =
    selected === 'shipToAddress'
      ? currency === 'ron'
        ? shipmentCostInRon
        : currency === 'euro'
        ? (shipmentCostInRon * 100) / 4.95 / 100
        : currency === 'dollar'
        ? (shipmentCostInRon * 100) / 4.69 / 100
        : ''
      : 0

  let copyOfShippingPrice =
    currency === 'ron'
      ? shipmentCostInRon
      : currency === 'euro'
      ? (shipmentCostInRon * 100) / 4.95 / 100
      : currency === 'dollar'
      ? (shipmentCostInRon * 100) / 4.69 / 100
      : ''
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.cartQty, 0)

  return (
    <>
      <div className="checkout-div">
        {cartItems.length === 0 ? (
          <span>Cart is empty</span>
        ) : (
          <div className="checkout-container">
            <div className="checkout-products">
              {cartItems.map((product) => {
                return (
                  <div className="cart-product" key={product.id}>
                    <CartProduct
                      removeFromCart={removeFromCart}
                      cartItems={cartItems}
                      onRemove={onRemove}
                      onAdd={onAdd}
                      product={product}
                      name={product.name}
                      quantity={product.quantity}
                      img={product.img}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {cartItems.length !== 0 && (
          <div className="checkout-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>
                {currency === 'ron'
                  ? itemsPrice.toFixed(2)
                  : currency === 'euro'
                  ? ((itemsPrice * 100) / 4.95 / 100).toFixed(2)
                  : currency === 'dollar'
                  ? ((itemsPrice * 100) / 4.69 / 100).toFixed(2)
                  : ''}
                <sup> {currencySign}</sup>
              </span>
            </div>
            <div className="delivery-options">
              <p>Delivery:</p>
              <select name="delivery" id="" onChange={(e) => setSelected(e.target.value || null)} value={selected || ''}>
                <option value="pickupFromLocation" id="pickupFromLocation">
                  Pickup from location - Free
                </option>
                <option value="shipToAddress" id="shipToAddress">
                  Ship to address - {`${copyOfShippingPrice.toFixed(2)} ${currencySign}`}
                </option>
              </select>
            </div>
            <div className="total">
              <span>
                <strong>Total:</strong>
              </span>
              <span>
                <strong>{`${
                  currency === 'ron'
                    ? (itemsPrice + shippingPrice).toFixed(2)
                    : currency === 'euro'
                    ? ((itemsPrice * 100) / 4.95 / 100 + shippingPrice).toFixed(2)
                    : currency === 'dollar'
                    ? ((itemsPrice * 100) / 4.69 / 100 + shippingPrice).toFixed(2)
                    : ''
                } ${currencySign}`}</strong>
              </span>
            </div>
            <button
              id="checkout-btn"
              onClick={() => {
                let finalCheckoutDiv = document.getElementById('final-checkout')
                finalCheckoutDiv.classList.add('unhide')
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <div className="final-checkout" id="final-checkout">
        <h3>One more step</h3>

        <div>
          <button
            onClick={() => {
              let finalCheckoutDiv = document.getElementById('final-checkout')
              finalCheckoutDiv.classList.remove('unhide')
            }}
          >
            Back to Cart
          </button>
          <h4>Shipment details</h4>

          {selected === 'shipToAddress' ? (
            <>
              <h5>(Ship to address)</h5>
              <form action="" method="get">
                <label htmlFor="fullName">
                  <sup>*</sup>Full Name
                </label>
                <input type="text" name="fullName" required />
                <label htmlFor="address">
                  <sup>*</sup>Complete Address
                </label>
                <input type="text" name="address" required />
                <label htmlFor="phone-number">
                  <sup>*</sup>Phone Number
                </label>
                <input type="text" name="phone-number" required />
                <span>
                  ( <sup>*</sup>Required Fields )
                </span>
                <div className="order-summary">
                  <p>Items Ordered: {displayedCartItems}</p>
                  <p>
                    Total Price:{' '}
                    {currency === 'ron'
                      ? (itemsPrice + shippingPrice).toFixed(2)
                      : currency === 'euro'
                      ? ((itemsPrice * 100) / 4.95 / 100 + shippingPrice).toFixed(2)
                      : currency === 'dollar'
                      ? ((itemsPrice * 100) / 4.69 / 100 + shippingPrice).toFixed(2)
                      : ''}
                    {currencySign}
                  </p>
                </div>
                <input type="submit" value="Order" />
              </form>
            </>
          ) : (
            <div>
              <h5>(Pickup from Location)</h5>
              <div className="order-summary">
                <p>Items Ordered: {displayedCartItems}</p>
                <p>
                  Total Price:{' '}
                  {currency === 'ron'
                    ? (itemsPrice + shippingPrice).toFixed(2)
                    : currency === 'euro'
                    ? ((itemsPrice * 100) / 4.95 / 100 + shippingPrice).toFixed(2)
                    : currency === 'dollar'
                    ? ((itemsPrice * 100) / 4.69 / 100 + shippingPrice).toFixed(2)
                    : ''}
                  {currencySign}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Checkout
