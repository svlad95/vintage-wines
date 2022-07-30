import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'
import SortComponent from './Filter&Sort_Components/SortComponent'

function SpecialOffers(props) {
  const currency = useSelector((state) => state.currency) // Global currency variable
  let currencySign = '' // Currency sign variable which changes depends on the "currency" global variable

  const { products, onAdd, cartItems } = props
  const [displayFilters, setDisplayFilters] = useState(false)
  const [sortFilter, setSortFilter] = useState('NoFilterApplied')
  const [rerender, setRerender] = useState(false)
  const [isSortIconClicked, setSortIconClicked] = useState(false)

  //Rerender useEffect
  useEffect(() => {
    setRerender(!rerender)
  }, [])

  const [specialProducts, setSpecialProducts] = useState(
    products
      .map((product) => {
        //Target only the special products, which have no color property set
        if (product.color === '') {
          return product
        }
      })
      .filter(Boolean),
  )
  // Use Effect hook to update the sortFilter and set the rendered products according to the Sort Options
  useEffect(() => {
    if (sortFilter === 'priceLowToHigh') {
      setSpecialProducts(specialProducts.sort((a, b) => a.price - b.price))
      setRerender(!rerender)
    } else if (sortFilter === 'priceHighToLow') {
      setSpecialProducts(specialProducts.sort((a, b) => b.price - a.price))
      setRerender(!rerender)
    } else if (sortFilter === 'volumeLowToHigh') {
      setSpecialProducts(specialProducts.sort((a, b) => a.volume - b.volume))
      setRerender(!rerender)
    } else if (sortFilter === 'volumeHighToLow') {
      setSpecialProducts(specialProducts.sort((a, b) => b.volume - a.volume))
      setRerender(!rerender)
    } else {
      setSortFilter('NoFilterApplied')
      setSpecialProducts(
        products
          .map((product) => {
            //Target only the special products, which have no color property set
            if (product.color === '') {
              return product
            }
          })
          .filter(Boolean),
      )
    }
  }, [sortFilter])
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

  // Function to uncheck all the checked checkboxes
  function resetCheckboxes() {
    let checkboxes = Array.from(document.querySelectorAll('input[type=radio]'))

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
  }

  function sortCards(sortFilter) {
    let productCards = document.querySelectorAll('.product-card')
    productCards.forEach((product) => {
      product.style.transform = 'scale(0)'
    })
    setTimeout(() => {
      setSortFilter(`${sortFilter}`)
    }, 380)

    setTimeout(() => {
      productCards.forEach((product) => {
        product.style.transform = 'scale(1)'
      })
    }, 420)
  }

  window.addEventListener('scroll', function (e) {
    let filterWrapper = document.getElementById('filtersWrapper')

    // Need to add a question mark after filterWrapper in order to aviod console error stating that "Cannot read properties of null (reading 'classList')"
    try {
      filterWrapper.classList.toggle('sticky', window.scrollY > 10)
    } catch (err) {
      console.log('Bravo! Nice Find! This was a hard one')
      console.log(err)
    }
  })

  checkForCurrency()

  return (
    <>
      <div className="special-offers-wrapper" id="specialOffersWrapper">
        <div className="filters-wrapper" id="filtersWrapper">
          <h5>Special Offers</h5>
          <div id="filtersContainer" className="filters-container">
            <SortComponent
              sortCards={sortCards}
              resetCheckboxes={resetCheckboxes}
              setDisplayFilters={setDisplayFilters}
            />
          </div>

          <div
            id="filtersContainerMobile"
            className={displayFilters ? 'filters-container-mobile active' : 'filters-container-mobile'}
          >
            <SortComponent
              sortCards={sortCards}
              resetCheckboxes={resetCheckboxes}
              setDisplayFilters={setDisplayFilters}
            />
            <i
              className="fa-solid fa-rectangle-xmark"
              onClick={() => {
                return setDisplayFilters(false)
              }}
            ></i>
          </div>
        </div>
        <div className="special-offers-div">
          {specialProducts.map((product) => {
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

      <i
        className="fa-solid fa-angles-right"
        id="sortMenuIcon"
        onClick={() => {
          let sortIcon = document.getElementById('sortMenuIcon')
          let specialOffersWrapper = document.getElementById('specialOffersWrapper')
          let filtersContainer = document.getElementById('filtersContainer')
          if (isSortIconClicked) {
            sortIcon.style.transform = 'rotate(0deg)'
            setSortIconClicked(!isSortIconClicked)

            filtersContainer.style.left = '-25%'

            specialOffersWrapper.style.width = '100%'
          } else {
            sortIcon.style.transform = 'rotate(180deg)'
            setSortIconClicked(!isSortIconClicked)
            filtersContainer.style.left = '6%'
            specialOffersWrapper.style.width = '80%'
          }
        }}
      ></i>
    </>
  )
}

export default SpecialOffers
