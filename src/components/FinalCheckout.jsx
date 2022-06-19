import React from 'react'

function FinalCheckout(props) {
  let { selected, currencySign, itemsPrice, shippingPrice } = props
  console.log(currencySign)
  console.log('sal')

  return (
    <div className="final-checkout" id="final-checkout">
      <h3>One more step</h3>
      {selected === 'shipToAddress' ? (
        <div>
          <form action="" method="get">
            <h4>Shipment details</h4>
            <h5>(Ship to address)</h5>
            <label htmlFor="fullName">
              <sup>*</sup>Full Name
            </label>
            <input type="text" name="fullName" />
            <label htmlFor="address">
              <sup>*</sup>Complete Address
            </label>
            <input type="text" name="address" />
            <label htmlFor="phone-number">
              <sup>*</sup>Phone Number
            </label>
            <input type="text" name="phone-number" />
            <span>
              ( <sup>*</sup>Required Fields )
            </span>
            <div className="order-summary">
              <p>Items Ordered: {}</p>
              <p>
                Total Price: {(itemsPrice + shippingPrice).toFixed(2)}
                {currencySign}
              </p>
            </div>
            <input type="submit" value="Order" />
          </form>
        </div>
      ) : (
        <div>Pickup from location</div>
      )}
    </div>
  )
}

export default FinalCheckout
