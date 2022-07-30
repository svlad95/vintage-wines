import FilterComponent from '../components/Filter&Sort_Components/FilterComponent'
import React, { useState } from 'react'
import Product from './Product'
import { useSelector } from 'react-redux'

function RecasWines(props) {
  const currency = useSelector((state) => state.currency) // Global currency variable
  let currencySign = '' // Currency sign variable which changes depends on the "currency" global variable
  const [displayFilters, setDisplayFilters] = useState(false)
  const [isSortIconClicked, setSortIconClicked] = useState(false)

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

  const [copyOfProducts, setCopyOfProducts] = useState(products.map((product) => product))

  function filterCards(copyOfProducts) {
    let wineOffersWrapper = document.getElementById('wineOffersDiv')
    wineOffersWrapper.style.transform = 'scale(0)'
    setTimeout(() => {
      setCopyOfProducts(copyOfProducts)
    }, 280)
    setTimeout(() => {
      wineOffersWrapper.style.transform = 'scale(1)'
    }, 320)
  }

  return (
    <>
      <div id="wineOffersWrapper" className="wine-offers-wrapper">
        <div className="filters-wrapper">
          <h5>Recas Wines</h5>

          <div id="filtersContainer" className="filters-container">
            {!displayFilters ? (
              <FilterComponent
                setDisplayFilters={setDisplayFilters}
                setCopyOfProducts={setCopyOfProducts}
                filterCards={filterCards}
                products={products}
              />
            ) : (
              ''
            )}
          </div>
          <div
            id="filtersContainerMobile"
            className={displayFilters ? 'filters-container-mobile active' : 'filters-container-mobile'}
          >
            <FilterComponent
              setDisplayFilters={setDisplayFilters}
              setCopyOfProducts={setCopyOfProducts}
              filterCards={filterCards}
              products={products}
            />
            <i
              className="fa-solid fa-rectangle-xmark"
              onClick={() => {
                return setDisplayFilters(false)
              }}
            ></i>
          </div>
        </div>
        <div id="wineOffersDiv" className="wine-offers-div">
          {copyOfProducts
            .map((product) => {
              if (product.name === 'Recas') {
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
              }
            })
            .filter(Boolean).length === 0 ? (
            <div>No results found</div>
          ) : (
            copyOfProducts.map((product) => {
              if (product.name === 'Recas')
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
            })
          )}
        </div>
      </div>
      <i
        className="fa-solid fa-angles-right"
        id="sortMenuIcon"
        onClick={() => {
          let sortIcon = document.getElementById('sortMenuIcon')
          let wineOffersWrapper = document.getElementById('wineOffersWrapper')
          let filtersContainer = document.getElementById('filtersContainer')
          if (isSortIconClicked) {
            sortIcon.style.transform = 'rotate(0deg)'
            setSortIconClicked(!isSortIconClicked)

            filtersContainer.style.left = '-25%'

            wineOffersWrapper.style.width = '100%'
          } else {
            sortIcon.style.transform = 'rotate(180deg)'
            setSortIconClicked(!isSortIconClicked)
            filtersContainer.style.left = '6%'
            wineOffersWrapper.style.width = '80%'
          }
        }}
      ></i>
    </>
  )
}

export default RecasWines
