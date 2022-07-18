import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'

function SpecialOffers(props) {
  const currency = useSelector((state) => state.currency) // Global currency variable
  let currencySign = '' // Currency sign variable which changes depends on the "currency" global variable

  const { products, onAdd, cartItems } = props
  const [displayFilters, setDisplayFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  // Function that checks the currency variable and assign the currencySign variable
  function checkForCurrency() {
    return currency === 'dollar' ? (currencySign = '$') : currency === 'euro' ? (currencySign = '€') : currency === 'ron' ? (currencySign = 'RON') : ''
  }

  // Function to uncheck all the checked checkboxes
  function resetCheckboxes() {
    let checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'))

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.click()
      }
    })
    setActiveFilters([])
  }

  // Function to remove the element from the filters array
  function removeFilter(array, item) {
    let newArray = [...array]
    const index = newArray.findIndex((element) => element === item)

    if (index !== -1) {
      newArray.splice(index, 1)
      return newArray
    }
  }

  const [copyOfProducts, setCopyOfProducts] = useState(products.map((product) => product))

  function filterProducts() {
    let resultArray = []
    let colors = []
    let redColorCheckbox = document.getElementById('redColorCheckbox')
    let whiteColorCheckbox = document.getElementById('whiteColorCheckbox')
    let roseColorCheckbox = document.getElementById('roseColorCheckbox')
    let sweetTypeCheckbox = document.getElementById('sweetTypeCheckbox')
    let semiSweetTypeCheckbox = document.getElementById('semiSweetTypeCheckbox')
    let dryTypeCheckbox = document.getElementById('dryTypeCheckbox')
    let semiDryTypeCheckbox = document.getElementById('semiDryTypeCheckbox')

    activeFilters.filter((filter) => {
      products.forEach((product) => {
        if (redColorCheckbox.checked || whiteColorCheckbox.checked || roseColorCheckbox.checked) {
          if (!sweetTypeCheckbox.checked && !semiSweetTypeCheckbox.checked && !dryTypeCheckbox.checked && !semiDryTypeCheckbox.checked) {
            if (product.color.includes(filter)) {
              resultArray.push(product)
            }
          } else {
            if (product.color.includes(filter)) {
              colors.push(product)
            }
            colors.forEach((item) => {
              if (item.type.split(' ').indexOf(filter) > -1) {
                resultArray.push(item)
              }
            })
          }
        } else if (product.type.split(' ').indexOf(filter) > -1) {
          resultArray.push(product)
        }
      })
    })

    setCopyOfProducts(activeFilters.length === 0 ? products.map((product) => product) : [...new Set(resultArray)])
  }

  checkForCurrency()

  return (
    <>
      <div className="special-offers-wrapper">
        <div className="filters-wrapper">
          <h5>Special Offers</h5>

          <div className={displayFilters ? 'filters-container active' : 'filters-container'}>
            <div
              className="filters-icon"
              onClick={() => {
                setDisplayFilters(true)
              }}
            >
              <small>Sort</small>
              <i className="fa-solid fa-filter"></i>
            </div>
            <a
              className="close-filter-menu"
              onClick={() => {
                setDisplayFilters(false)
              }}
            >
              x
            </a>

            <div className="filter-options">
              <div className="filter-color">
                <span>By Price</span>
                <div className="inputs">
                  <input type="radio" name="radio-price" id="radioPriceLowToHigh" />
                  Low to High
                  <input type="radio" name="radio-price" id="radioPriceHighToLow" />
                  High to Low
                </div>
              </div>
              <div className="filter-type">
                <span>By Volume ( L )</span>
                <div className="inputs">
                  <input type="radio" name="radio-price" id="radioVolumeLowToHigh" />
                  Low to High
                  <input type="radio" name="radio-price" id="radioVolumeHighToLow" />
                  High to Low
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    setDisplayFilters(false)
                    filterProducts()
                    resetCheckboxes()
                  }}
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    resetCheckboxes()
                    setCopyOfProducts(products.map((product) => product))
                    setDisplayFilters(false)
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="special-offers-div">
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
      </div>
    </>
  )
}

export default SpecialOffers
