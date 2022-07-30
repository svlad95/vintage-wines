import React, { useState, useEffect } from 'react'
function FilterComponent(props) {
  const { setDisplayFilters, filterCards, products } = props

  const [activeFilters, setActiveFilters] = useState([])

  //Sclipire de geniu useEffect to make sure that the colors are displayed first in the filters array
  useEffect(() => {
    if (activeFilters.indexOf('Rose') > 0) {
      activeFilters.splice(activeFilters.indexOf('Rose'), 1)
      activeFilters.unshift('Rose')
    }
    if (activeFilters.indexOf('White') > 0) {
      activeFilters.splice(activeFilters.indexOf('White'), 1)
      activeFilters.unshift('White')
    }
    if (activeFilters.indexOf('Red') > 0) {
      activeFilters.splice(activeFilters.indexOf('Red'), 1)
      activeFilters.unshift('Red')
    }
  }, [activeFilters])

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
    let copyOfProducts

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

    copyOfProducts = activeFilters.length === 0 ? products.map((product) => product) : [...new Set(resultArray)]

    filterCards(copyOfProducts)
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
  // Causing some performance issues, might find a solution later on
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024) {
      setDisplayFilters(false)
    }
  })

  return (
    <>
      <div
        className="filters-icon"
        onClick={() => {
          setDisplayFilters(true)
        }}
      >
        <small>Filters</small>
        <i className="fa-solid fa-filter"></i>
      </div>

      <div className="filter-options">
        <div className="filter-color">
          <span>By Color</span>
          <div className="inputs">
            <div>
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
                  onChange={() => {
                    if (document.getElementById('dryTypeCheckbox').checked) {
                      if (!activeFilters.includes('Dry')) {
                        setActiveFilters([...activeFilters, 'Dry'])
                      }
                    } else {
                      setActiveFilters(removeFilter(activeFilters, 'Dry'))
                    }
                  }}
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
              filterCards(products.map((product) => product))
              setDisplayFilters(false)
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  )
}
export default FilterComponent
