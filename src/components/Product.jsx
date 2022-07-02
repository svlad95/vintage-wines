import React from 'react'
import { useDispatch } from 'react-redux'
import * as actions from './actions/actions'

function Product(props) {
  const dispatch = useDispatch()
  const { product, onAdd, cartItems } = props

  return (
    <div className="special-offer-card">
      <h6 className="product-name">{product.name}</h6>
      <small>
        {`${product.color} `}
        {product.type} - {product.volume}l
      </small>
      <img src={product.img} alt="" width={`${product.imgWidth}px`} />
      <small className="product-price">
        Price: {props.price.toFixed(2)}
        <sup>{props.currencySign}</sup>
      </small>

      <div className="add-to-cart">
        <a
          onClick={() => {
            let isInCart = false
            //Check if cart is empty and if it is, add the product to the cart
            if (cartItems.length === 0) {
              onAdd(product)
              dispatch(actions.increaseCart(1))
            } else {
              //if the cart is not empty, loop through the cart
              cartItems.forEach((item) => {
                //if the item.id of the itemCart is equal to current product id, set the isInCart variable to true
                if (item.id === product.id) {
                  isInCart = true
                  //if the cartQty of the item is smaller than product overall quantity, increase the product qty in cart
                  if (item.cartQty < product.quantity) {
                    onAdd(product)
                    dispatch(actions.increaseCart(1))
                  } else {
                    //if the cartQty of the item is equal to the product overall quantity, display an alert (error)
                    alert(`There are only ${product.quantity} bottles of ${product.name} available right now.`)
                  }
                }
              })

              //if the products were not added in the cart before, but there are other products, we can add it
              if (isInCart === false) {
                onAdd(product)
                dispatch(actions.increaseCart(1))
              }
            }
          }}
        >
          Add to cart
        </a>
      </div>
    </div>
  )
}

export default Product
