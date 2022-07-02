import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './actions/actions'

function CartProduct(props) {
  const currency = useSelector((state) => state.currency)

  let currencySign = ''
  const dispatch = useDispatch()

  function checkForCurrency() {
    return currency === 'dollar' ? (currencySign = '$') : currency === 'euro' ? (currencySign = '€') : currency === 'ron' ? (currencySign = 'ron') : ''
  }

  checkForCurrency()
  const { product, onAdd, onRemove, removeFromCart } = props

  return (
    <>
      <div className="cart-actions">
        <button
          id="cart-add-button"
          onClick={() => {
            if (product.cartQty < product.quantity) {
              onAdd(product)
              dispatch(actions.increaseCart(1))
            } else {
              alert(
                `There are only ${product.quantity} ${product.volume !== 10 ? 'bottles' : 'boxes'} of ${product.name} ${product.color} ${product.type} (${
                  product.volume
                }L) available right now.`,
              )
            }
          }}
        >
          +
        </button>
        <button
          id="cart-remove-button"
          onClick={() => {
            dispatch(actions.decreaseCart(1))
            onRemove(product)
          }}
        >
          -
        </button>
      </div>
      <p>
        <img src={product.img} alt={product.name} width="30px" />
        {product.cartQty} x {product.name} {product.color} {product.type} {`${product.volume}l`} ={' '}
        {currency === 'ron'
          ? (product.price * product.cartQty).toFixed(2)
          : currency === 'euro'
          ? ((product.price * product.cartQty) / 4.95).toFixed(2)
          : currency === 'dollar'
          ? (Math.round((product.price * product.cartQty * 100) / 4.69) / 100).toFixed(2)
          : ''}
        {` ${currencySign}`}
      </p>
      <button
        id="clear-cart-button"
        onClick={() => {
          removeFromCart(product)
          dispatch(actions.decreaseCart(product.cartQty))
        }}
      >
        x
      </button>
    </>
  )
}

export default CartProduct
