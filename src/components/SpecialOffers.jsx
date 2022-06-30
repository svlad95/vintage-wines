import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'

function SpecialOffers(props) {
  const currency = useSelector((state) => state.currency) // Global currency variable
  let currencySign = '' // Currency sign variable which changes depends on the "currency" global variable

  const { products, onAdd, cartItems } = props

  // Function that checks the currency variable and assign the currencySign variable
  function checkForCurrency() {
    return currency === 'dollar'
      ? (currencySign = '$')
      : currency === 'euro'
      ? (currencySign = '€')
      : currency === 'ron'
      ? (currencySign = 'RON')
      : ''
  }

  checkForCurrency()

  return (
    <>
      <div className="special-offers-div">
        <h5>Special Offers</h5>

        {products.map((product) => {
          if (product.color === '')
            return (
              <Product
                onAdd={onAdd}
                cartItems={cartItems}
                product={product}
                id={product.id}
                key={product.id}
                name={product.name}
                price={
                  currency === 'ron'
                    ? product.price
                    : currency === 'euro'
                    ? (product.price * 100) / 4.95 / 100
                    : currency === 'dollar'
                    ? (product.price * 100) / 4.69 / 100
                    : ''
                }
                type={product.type}
                volume={product.volume}
                currencySign={currencySign}
                quantity={product.quantity}
                img={product.img}
                imgWidth={product.imgWidth}
              />
            )
        })}
      </div>
    </>
  )
}

export default SpecialOffers
