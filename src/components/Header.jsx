import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Product from '../components/Product'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../components/actions/actions'
import data from './data'

function Header(props) {
  const [isMobileMenuOpened, setisMobileMenuOpened] = useState()
  const [isSearchDivDisplayed, setisSearchDivDisplayed] = useState(false)
  let searchInput = document.getElementById('search-input')
  const { products } = data

  const [searchTerm, setSearchTerm] = useState('')
  const currency = useSelector((state) => state.currency)
  let currencySign = ''

  const dispatch = useDispatch()
  const displayedCartItems = useSelector((state) => state.displayedCartItems)
  const { cartItems, onAdd } = props

  function checkForCurrency() {
    return currency === 'dollar'
      ? (currencySign = '$')
      : currency === 'euro'
      ? (currencySign = '€')
      : currency === 'ron'
      ? (currencySign = 'ron')
      : ''
  }

  checkForCurrency()

  // UsEffect hook to show/hide the search div
  useEffect(() => {
    let searchResultsDiv = document.getElementById('search-results')
    if (isSearchDivDisplayed) {
      searchResultsDiv.style.transform = 'scale(1)'
    } else {
      searchResultsDiv.style.transform = 'scale(0)'
    }
  }, [isSearchDivDisplayed])

  // UseEffect hook to update the number of products displayed in the shopping cart
  useEffect(() => {
    let productAmountDiv = document.getElementById('product-amount')
    let productItemsParagraph = document.getElementById('productItems')
    if (displayedCartItems === 0) {
      productAmountDiv.style.transform = 'scale(0)'
      productAmountDiv.style.opacity = 0
    } else if (displayedCartItems >= 1 && displayedCartItems <= 99) {
      productAmountDiv.style.opacity = 1
      productAmountDiv.style.transform = 'scale(1)'
      productItemsParagraph.textContent = displayedCartItems
    } else if (displayedCartItems.toString().length > 2) {
      productAmountDiv.style.opacity = 1
      productAmountDiv.style.transform = 'scale(1)'
      productItemsParagraph.textContent = '99+'
    }
  }, [displayedCartItems])

  //UseEffect hook to disable the scroll while mobile menu is opened
  useEffect(() => {
    if (isMobileMenuOpened) {
      window.onscroll = function () {
        window.scrollTo(0, 0)
      }
    } else {
      window.onscroll = function () {}
    }
  }, [isMobileMenuOpened])

  return (
    <>
      <div className="header-container" id="header-container">
        <header>
          <a className="icon-container">
            <i
              className={isMobileMenuOpened ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered'}
              onClick={() => {
                setisMobileMenuOpened(!isMobileMenuOpened)
              }}
            ></i>
          </a>
          <div className="title-div">
            <Link
              to="/"
              id="title"
              onClick={() => {
                setisMobileMenuOpened(false)
                setisSearchDivDisplayed(false)
                searchInput.value = ''
              }}
            >
              <h1 className="title">Vintage Wines</h1>
            </Link>
            <h2 className="sub-title">It's wine o'clock!</h2>
          </div>

          <div className="shopping-cart-div">
            <Link
              to="/checkout"
              onClick={() => {
                setisMobileMenuOpened(false)
                setisSearchDivDisplayed(false)
                searchInput.value = ''
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <div className="product-amount" id="product-amount">
              <p id="productItems"></p>
            </div>
          </div>
        </header>
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search by product name, type or color"
            onChange={(e) => {
              let searchInput = document.getElementById('search-input').value
              if (searchInput.length === 0) {
                setisSearchDivDisplayed(false)
              } else {
                setisSearchDivDisplayed(true)
                setSearchTerm(e.target.value)
              }
            }}
            id="search-input"
          />
        </div>
      </div>
      {/* Search Results Div*/}
      <div className="search-results" id="search-results">
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            setisSearchDivDisplayed(false)

            searchInput.value = ''
          }}
        ></i>
        <div className="search-results-container">
          {products
            .filter((value) => {
              let combinationOne = `${value.name.toLowerCase()} ${value.type.toLowerCase()} ${value.color.toLowerCase()}`
              let combinationTwo = `${value.name.toLowerCase()} ${value.color.toLowerCase()} ${value.type.toLowerCase()}`
              let combinationThree = `${value.color.toLowerCase()} ${value.type.toLowerCase()} ${value.name.toLowerCase()}`
              let combinationFour = `${value.color.toLowerCase()} ${value.name.toLowerCase()} ${value.type.toLowerCase()}`
              let combinationFive = `${value.type.toLowerCase()} ${value.name.toLowerCase()} ${value.color.toLowerCase()}`
              let combinationSix = `${value.type.toLowerCase()} ${value.color.toLowerCase()} ${value.name.toLowerCase()}`

              let sortedCombinationOne = combinationOne.toLowerCase().replace('-', ' ').replace(/ /g, '')
              let sortedCombinationTwo = combinationTwo.toLowerCase().replace('-', ' ').replace(/ /g, '')
              let sortedCombinationThree = combinationThree.toLowerCase().replace('-', ' ').replace(/ /g, '')
              let sortedCombinationFour = combinationFour.toLowerCase().replace('-', ' ').replace(/ /g, '')
              let sortedCombinationFive = combinationFive.toLowerCase().replace('-', ' ').replace(/ /g, '')
              let sortedCombinationSix = combinationSix.toLowerCase().replace('-', ' ').replace(/ /g, '')

              if (searchTerm === '') {
                return value
              } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (value.type.toLowerCase().includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (value.color.toLowerCase().includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (sortedCombinationOne.includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (sortedCombinationTwo.includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (sortedCombinationThree.includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (sortedCombinationFour.includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (sortedCombinationFive.includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              } else if (sortedCombinationSix.includes(searchTerm.toLowerCase().replace(/ /g, ''))) {
                return value
              }
            })
            .map((product, key) => {
              return (
                <div className="search-product" key={key}>
                  <img src={product.img} width="20px" alt="" />

                  <p>
                    {`${product.name} `}
                    {`${product.color} `}
                    {`${product.type.replace('-', ' ')} `}
                    {`(${product.volume}l)`}
                  </p>
                  <small>{`${
                    currency === 'ron'
                      ? product.price.toFixed(2)
                      : currency === 'euro'
                      ? Math.abs((product.price / 4.95).toFixed(2))
                      : currency === 'dollar'
                      ? Math.abs((product.price / 4.69).toFixed(2))
                      : ''
                  } ${currencySign}`}</small>

                  <button
                    className="search-add-to-cart"
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
                              alert(
                                `There are only ${product.quantity} ${
                                  product.volume !== 10 ? 'bottles' : 'boxes'
                                } of ${product.name} ${product.color} ${product.type} (${
                                  product.volume
                                }L) available right now.`,
                              )
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
                    Add
                  </button>
                </div>
              )
            })}
        </div>
      </div>
      {/* Mobile menu */}
      <div className={isMobileMenuOpened ? 'mobile-menu' : 'mobile-menu inactive'}>
        <Link
          to="/"
          onClick={() => {
            setisMobileMenuOpened(false)
            setisSearchDivDisplayed(false)
            searchInput.value = ''
          }}
        >
          Home (Special Offers)
        </Link>
        <Link
          to="/tohani-wines"
          onClick={() => {
            setisMobileMenuOpened(false)
            setisSearchDivDisplayed(false)
            searchInput.value = ''
          }}
        >
          Tohani Wines
        </Link>
        <Link
          to="/moldova-wines"
          onClick={() => {
            setisMobileMenuOpened(false)
            setisSearchDivDisplayed(false)
            searchInput.value = ''
          }}
        >
          Moldova Wines
        </Link>
        <Link
          to="/recas-wines"
          onClick={() => {
            setisMobileMenuOpened(false)
            setisSearchDivDisplayed(false)
            searchInput.value = ''
          }}
        >
          Recas Wines
        </Link>

        <Link
          to="/about"
          onClick={() => {
            setisMobileMenuOpened(false)
            setisSearchDivDisplayed(false)
            searchInput.value = ''
          }}
        >
          About
        </Link>
        <Link
          to="/contact"
          onClick={() => {
            setisMobileMenuOpened(false)
            setisSearchDivDisplayed(false)
            searchInput.value = ''
          }}
        >
          Contact
        </Link>
        <div className="currency-selector">
          <p className="currency-text-icon">
            Currency <i className="fa-solid fa-angle-down"></i>
          </p>
          <div className="currency-inputs">
            <input
              type="radio"
              name="currency"
              defaultChecked={true}
              onClick={() => {
                dispatch(actions.convertToRon('ron'))
                setisMobileMenuOpened(false)
              }}
            />
            ron
            <input
              type="radio"
              name="currency"
              id=""
              onClick={() => {
                dispatch(actions.convertToEur('euro'))
                setisMobileMenuOpened(false)
              }}
            />
            eur
            <input
              type="radio"
              name="currency"
              id=""
              onClick={() => {
                dispatch(actions.convertToUsd('dollar'))
                setisMobileMenuOpened(false)
              }}
            />
            usd
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
