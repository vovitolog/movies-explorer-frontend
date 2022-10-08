import React from 'react'
import './Preloader.css'

export function Preloader(props) {

    return (
      <>
         <span className={`preloader__nothingfound-message
        ${props.isNothingFound ? `preloader__nothingfound-message_active` : null}`}>
       По вашему запросу ничего не найдено
       </span>
       <div className={`preloader ${props.isLoading ? 'preloader_active' : null}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
        </>
    )
};