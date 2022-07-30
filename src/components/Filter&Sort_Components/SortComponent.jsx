import React from 'react'

function SortComponent(props) {
  const { sortCards, resetCheckboxes, setDisplayFilters } = props

  return (
    <>
      <div
        className="filters-icon"
        onClick={() => {
          if (window.innerWidth < 1024) setDisplayFilters(true)
        }}
      >
        <small>Sort</small>

        <i className="fa-solid fa-filter"></i>
      </div>

      <div className="filter-options">
        <div className="filter-price">
          <span>By Price</span>
          <div className="inputs">
            <div>
              <input
                type="radio"
                name="radio-price"
                id="radioPriceLowToHigh"
                onChange={() => {
                  sortCards('priceLowToHigh')
                }}
              />
              Low to High
            </div>

            <div>
              <input
                type="radio"
                name="radio-price"
                id="radioPriceHighToLow"
                onChange={() => {
                  sortCards('priceHighToLow')
                }}
              />
              High to Low
            </div>
          </div>
        </div>
        <div className="filter-volume">
          <span>By Volume ( L )</span>
          <div className="inputs">
            <div>
              <input
                type="radio"
                name="radio-price"
                id="radioVolumeLowToHigh"
                onChange={() => {
                  sortCards('volumeLowToHigh')
                }}
              />
              Low to High
            </div>
            <div>
              <input
                type="radio"
                name="radio-price"
                id="radioVolumeHighToLow"
                onChange={() => {
                  sortCards('volumeHighToLow')
                }}
              />
              High to Low
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            resetCheckboxes()
            sortCards('NoFilterApplied')
            setDisplayFilters(false)
          }}
        >
          Clear Filters
        </button>
      </div>
    </>
  )
}

export default SortComponent
