import '../src/CSS/style.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SpecialOffers from './components/SpecialOffers'
import Contact from './components/Contact'
import About from './components/About'
import Checkout from './components/Checkout'
import TohaniWines from './components/TohaniWines'
import React, { useState, useEffect } from 'react'
import data from './components/data'
import MoldovaWines from './components/MoldovaWines'
import RecasWines from './components/RecasWines'

function App() {
  const { products } = data

  const [cartItems, setCartItems] = useState([])

  // Function to add products to cart
  const onAdd = (product) => {
    const exists = cartItems.find((item) => item.id === product.id)
    //Filter through the cartItems array and check if
    //an item already exists in the cart and STORE the item (object) into the "exists" variable

    if (exists) {
      // If the item (object) already exists, increase the cart quantity by the user's inputValue
      // Also decrease the available quantity by the user's inputValue

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...exists,
                cartQty: exists.cartQty + 1,
              }
            : item,
        ),
      )
    } else {
      // If the item (object) does not exist in the cart, add it and increase the cart quantity by 1

      setCartItems([...cartItems, { ...product, cartQty: 1 }])
    }
  }

  function removeFromCart(product) {
    setCartItems(
      cartItems.filter((item) => {
        return item.id !== product.id
      }),
    )
  }

  // Function to remove products from cart
  const onRemove = (product) => {
    const exists = cartItems.find((item) => item.id === product.id)
    //Filter through the cartItems array and check if
    //an item already exists in the cart and STORE the item (object) into the "exists" variable

    if (exists.cartQty === 1) {
      //If only one item (object) is in the cart , decrease its cart quantity and increase its overall quantity by 1

      //Also. filter the cartItems in order to update the array. By filtering the array, the object that already exists will no longer be a part of the array

      setCartItems(
        cartItems.filter((item) => {
          return item.id !== product.id
        }),
      )
    } else {
      //If multiple instances of an item (object) are already in the cart, decrease their cart quantity and increase their overall quantity

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...exists,
                cartQty: exists.cartQty - 1,
              }
            : item,
        ),
      )
    }
  }

  return (
    <Router>
      <Header cartItems={cartItems} onAdd={onAdd}></Header>
      <Routes>
        <Route
          path="/special-offers"
          element={<SpecialOffers products={products} cartItems={cartItems} onAdd={onAdd} />}
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              products={products}
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/tohani-wines"
          element={<TohaniWines products={products} cartItems={cartItems} onAdd={onAdd} />}
        />
        <Route
          path="/moldova-wines"
          element={<MoldovaWines products={products} cartItems={cartItems} onAdd={onAdd} />}
        />
        <Route
          path="/recas-wines"
          element={<RecasWines products={products} cartItems={cartItems} onAdd={onAdd} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
