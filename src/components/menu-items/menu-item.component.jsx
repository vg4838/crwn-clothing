import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ( {title, imgUrl, size} ) => (
    <div 
        className={` ${size} menu-item`}
    >
        <div 
            className='background-image'
            style={{
                backgroundImage:`url(${imgUrl})`
            }} 
        />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);
export default MenuItem