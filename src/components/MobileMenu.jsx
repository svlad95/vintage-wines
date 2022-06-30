import React from 'react'
import { Link } from 'react-router-dom'
import * as actions from '../components/actions/actions'

export function MobileMenu({
  isMobileMenuOpened,
  setisMobileMenuOpened,
  setisSearchDivDisplayed,
  dispatch,
  hideSearchMenu,
}) {
  
  return (
    <div className={isMobileMenuOpened ? 'mobile-menu' : 'mobile-menu inactive'}>
      <Link
        to="/"
        onClick={() => {
          setisMobileMenuOpened(false)
          setisSearchDivDisplayed(false)
          hideSearchMenu()
        }}
      >
        Home (Special Offers)
      </Link>
      <Link
        to="/tohani-wines"
        onClick={() => {
          setisMobileMenuOpened(false)
          setisSearchDivDisplayed(false)
          hideSearchMenu()
        }}
      >
        Tohani Wines
      </Link>
      <Link
        to="/moldova-wines"
        onClick={() => {
          setisMobileMenuOpened(false)
          setisSearchDivDisplayed(false)
          hideSearchMenu()
        }}
      >
        Moldova Wines
      </Link>
      <Link
        to="/recas-wines"
        onClick={() => {
          setisMobileMenuOpened(false)
          setisSearchDivDisplayed(false)
          hideSearchMenu()
        }}
      >
        Recas Wines
      </Link>

      <Link
        to="/about"
        onClick={() => {
          setisMobileMenuOpened(false)
          setisSearchDivDisplayed(false)
          hideSearchMenu()
        }}
      >
        About
      </Link>
      <Link
        to="/contact"
        onClick={() => {
          setisMobileMenuOpened(false)
          setisSearchDivDisplayed(false)
          hideSearchMenu()
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
              hideSearchMenu()
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
              hideSearchMenu()
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
              hideSearchMenu()
            }}
          />
          usd
        </div>
      </div>
    </div>
  )
}
