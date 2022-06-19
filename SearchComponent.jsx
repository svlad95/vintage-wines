import React from 'react'
export function SearchComponent({ setisSearchDivDisplayed, product, key, currency, currencySign, onAdd }) {
  return (
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
            let sum =
              value.name.toLowerCase().trim() +
              value.type.toLowerCase().trim() +
              value.color.toLowerCase().trim()
            let sorted = sum.toLowerCase().replace('-', ' ').split(' ')

            if (searchTerm === '') {
              return value
            } else if (value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return value
            } else if (value.type.toLowerCase().includes(searchTerm.toLowerCase())) {
              return value
            } else if (value.color.toLowerCase().includes(searchTerm.toLowerCase())) {
              return value
            } else {
              let result = sorted.filter((elem) => {
                if (searchTerm.toLowerCase().replace('-', '').split(' ').includes(elem)) {
                  console.log(elem)
                }
              })
              return result
            }
          })
          .map((product, key) => {
            return (
              <div className="search-product" key={key}>
                <img src={product.img} width="20px" alt="" />

                <p>
                  {`${product.name} `}
                  {`${product.color} `}
                  {`${product.type} `}
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
                    onAdd(product)
                  }}
                >
                  Add
                </button>
              </div>
            )
          })}
      </div>
    </div>
  )
}
