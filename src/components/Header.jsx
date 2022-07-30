import { MobileMenu } from './MobileMenu'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../components/actions/actions'
import data from './data'

function Header(props) {
  const [isMobileMenuOpened, setisMobileMenuOpened] = useState()
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false)
  const [isSearchDivDisplayed, setisSearchDivDisplayed] = useState(false)
  let searchInput = document.getElementById('search-input')

  const { products } = data

  const [searchTerm, setSearchTerm] = useState('')
  window.addEventListener('resize', () => {
    let searchInputField = document.getElementById('search-input')

    if (isSearchIconClicked && window.innerWidth < 700) {
      searchInputField.classList.add('expanded')
    } else {
      searchInputField.classList.remove('expanded')
    }
  })
  const currency = useSelector((state) => state.currency)
  let currencySign = ''
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
  const dispatch = useDispatch()
  const displayedCartItems = useSelector((state) => state.displayedCartItems)
  const { cartItems, onAdd } = props

  const searchBarProductsFiltered = products
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
          <p>
            {`${product.name} `}
            {`${product.color} `}
            {`${product.type.replace('-', ' ')} `}
            {`(${product.volume}l)`}
          </p>
          <img src={product.img} width="110px" alt="" />
          <small>{`Price: ${
            currency === 'ron'
              ? product.price.toFixed(2)
              : currency === 'euro'
              ? Math.abs((product.price / 4.95).toFixed(2))
              : currency === 'dollar'
              ? Math.abs((product.price / 4.69).toFixed(2))
              : ''
          }`} <sup>{`${currencySign}`}</sup></small>

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
                        `There are only ${product.quantity} ${product.volume !== 10 ? 'bottles' : 'boxes'} of ${
                          product.name
                        } ${product.color} ${product.type} (${product.volume}L) available right now.`,
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
            Add to Cart
          </button>
        </div>
      )
    })

  function showSearchMenu() {
    let searchInputField = document.getElementById('search-input')
    searchInputField.style.width = '60%'
    searchInputField.style.opacity = 1
    searchInputField.focus()
  }
  function hideSearchMenu() {
    let searchInputField = document.getElementById('search-input')
    searchInputField.style.width = '0px'
    searchInputField.style.opacity = 0
    setisSearchDivDisplayed(false)
    //this has to be removed
    try {
      searchInput.value = ''
    } catch (err) {
      console.log(err)
      console.log('Nice find! This was the easy one(')
    }

    //This is the fix, below, lets see who finds out the bug
    // if (searchInput !== null) searchInput.value = ''
  }

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
    isMobileMenuOpened
      ? (window.onscroll = function () {
          window.scrollTo(0, 0)
        })
      : (window.onscroll = function () {})
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
                setisSearchDivDisplayed(false)
                setIsSearchIconClicked(false)
                hideSearchMenu()
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
                setIsSearchIconClicked(false)
                hideSearchMenu()
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
                setIsSearchIconClicked(false)
                hideSearchMenu()
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
          <i
            className={isSearchIconClicked ? 'fa-solid fa-xmark' : 'fa-solid fa-magnifying-glass'}
            onClick={() => {
              if (isSearchIconClicked) {
                hideSearchMenu()
                setIsSearchIconClicked(!isSearchIconClicked)
              } else {
                showSearchMenu()
                setIsSearchIconClicked(!isSearchIconClicked)
              }
            }}
          ></i>
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
        <div className="search-results-container">
          {searchBarProductsFiltered.length === 0 ? (
            <div className="no-results-div">No results found</div>
          ) : (
            searchBarProductsFiltered
          )}
        </div>
      </div>
      {/* Mobile menu */}
      <MobileMenu
        isMobileMenuOpened={isMobileMenuOpened}
        setisMobileMenuOpened={setisMobileMenuOpened}
        setisSearchDivDisplayed={setisSearchDivDisplayed}
        setIsSearchIconClicked={setIsSearchIconClicked}
        dispatch={dispatch}
        hideSearchMenu={hideSearchMenu}
      />
    </>
  )
}

export default Header
