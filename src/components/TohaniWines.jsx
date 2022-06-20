import React, { useState, useEffect } from 'react'
import Product from './Product'
import { useSelector } from 'react-redux'

function TohaniWines(props) {
  const currency = useSelector((state) => state.currency) // Global currency variable
  let currencySign = '' // Currency sign variable which changes depends on the "currency" global variable
  const [displayFilters, setDisplayFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])

  const { products, onAdd, cartItems } = props

  //Sclipire de geniu useEffect to make sure that the colors are displayed first in the filters array
  useEffect(() => {
    if (activeFilters.indexOf('Rose') > 0) {
      activeFilters.splice(activeFilters.indexOf('Rose'), 1)
      activeFilters.unshift('Rose')
      console.log(activeFilters)
    }
    if (activeFilters.indexOf('White') > 0) {
      activeFilters.splice(activeFilters.indexOf('White'), 1)
      activeFilters.unshift('White')
      console.log(activeFilters)
    }
    if (activeFilters.indexOf('Red') > 0) {
      activeFilters.splice(activeFilters.indexOf('Red'), 1)
      activeFilters.unshift('Red')
      console.log(activeFilters)
    }
  }, [activeFilters])
  // Function that checks the currency variable and assign the currencySign variable
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
          //
          if (
            !sweetTypeCheckbox.checked &&
            !semiSweetTypeCheckbox.checked &&
            !dryTypeCheckbox.checked &&
            !semiDryTypeCheckbox.checked
          ) {
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
          //
        } else if (product.type.split(' ').indexOf(filter) > -1) {
          resultArray.push(product)
        }
      })
    })

    setCopyOfProducts(
      activeFilters.length === 0 ? products.map((product) => product) : [...new Set(resultArray)],
    )
  }

  return (
    <>
      <div className="wine-offers-div">
        <h5>Tohani Wines</h5>

        <div className={displayFilters ? 'filters-container active' : 'filters-container'}>
          <div>
            <div
              className="filters-icon"
              onClick={() => {
                setDisplayFilters(true)
              }}
            >
              <small>Filters</small>
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
          </div>

          <div className="filter-options">
            <div className="filter-color">
              <span>By Color</span>
              <div className="inputs">
                <input
                  type="checkbox"
                  id="redColorCheckbox"
                  onChange={() => {
                    if (document.getElementById('redColorCheckbox').checked) {
                      if (!activeFilters.includes('Red')) {
                        setActiveFilters([...activeFilters, 'Red'])
                      }
                    } else {
                      setActiveFilters(removeFilter(activeFilters, 'Red'))
                    }
                  }}
                />
                Red
                <input
                  type="checkbox"
                  id="whiteColorCheckbox"
                  onChange={() => {
                    if (document.getElementById('whiteColorCheckbox').checked) {
                      if (!activeFilters.includes('White')) {
                        setActiveFilters([...activeFilters, 'White'])
                      }
                    } else {
                      setActiveFilters(removeFilter(activeFilters, 'White'))
                    }
                  }}
                />
                White
                <input
                  type="checkbox"
                  id="roseColorCheckbox"
                  onChange={() => {
                    if (document.getElementById('roseColorCheckbox').checked) {
                      if (!activeFilters.includes('Rose')) {
                        setActiveFilters([...activeFilters, 'Rose'])
                      }
                    } else {
                      setActiveFilters(removeFilter(activeFilters, 'Rose'))
                    }
                  }}
                />
                Rosé
              </div>
            </div>
            <div className="filter-type">
              <span>By Type</span>
              <div className="inputs">
                <div className="sweet-type">
                  <div>
                    <input
                      type="checkbox"
                      id="sweetTypeCheckbox"
                      name="Sweet"
                      onChange={() => {
                        if (document.getElementById('sweetTypeCheckbox').checked) {
                          if (!activeFilters.includes('Sweet')) {
                            setActiveFilters([...activeFilters, 'Sweet'])
                          }
                        } else {
                          setActiveFilters(removeFilter(activeFilters, 'Sweet'))
                        }
                      }}
                    />
                    <label htmlFor="Sweet">Sweet</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="semiSweetTypeCheckbox"
                      name="Sweet"
                      onChange={() => {
                        if (document.getElementById('semiSweetTypeCheckbox').checked) {
                          if (!activeFilters.includes('Semi-Sweet')) {
                            setActiveFilters([...activeFilters, 'Semi-Sweet'])
                          }
                        } else {
                          setActiveFilters(removeFilter(activeFilters, 'Semi-Sweet'))
                        }
                      }}
                    />

                    <label htmlFor="Semi-Sweet">Semi-Sweet</label>
                  </div>
                </div>
                <div className="dry-type">
                  <div>
                    <input
                      type="checkbox"
                      id="dryTypeCheckbox"
                      name="Dry"
                      onClick={() => {
                        return false
                      }}
                      disabled={true}
                      // onChange={() => {
                      //   if (document.getElementById('dryTypeCheckbox').checked) {
                      //     if (!activeFilters.includes('Dry')) {
                      //       setActiveFilters([...activeFilters, 'Dry'])
                      //     }
                      //   } else {
                      //     setActiveFilters(removeFilter(activeFilters, 'Dry'))
                      //   }
                      // }}
                    />

                    <label htmlFor="Dry">Dry</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="semiDryTypeCheckbox"
                      name="Semi-Dry"
                      onChange={() => {
                        if (document.getElementById('semiDryTypeCheckbox').checked) {
                          if (!activeFilters.includes('Semi-Dry')) {
                            setActiveFilters([...activeFilters, 'Semi-Dry'])
                          }
                        } else {
                          setActiveFilters(removeFilter(activeFilters, 'Semi-Dry'))
                        }
                      }}
                    />

                    <label htmlFor="Semi-Dry">Semi-Dry</label>
                  </div>
                </div>
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

        {copyOfProducts.map((product) => {
          if (product.name === 'Tohani')
            return (
              <Product
                onAdd={onAdd}
                cartItems={cartItems}
                product={product}
                id={product.id}
                key={product.id}
                name={product.name}
                type={product.type}
                color={product.color}
                volume={product.volume}
                img={product.img}
                imgWidth={product.imgWidth}
                currencySign={currencySign}
                totalQuantity={product.totalQuantity}
                price={
                  currency === 'ron'
                    ? product.price
                    : currency === 'euro'
                    ? Math.abs((product.price / 4.95).toFixed(2))
                    : currency === 'dollar'
                    ? Math.abs((product.price / 4.69).toFixed(2))
                    : ''
                }
              />
            )
        })}
      </div>
    </>
  )
}

export default TohaniWines
