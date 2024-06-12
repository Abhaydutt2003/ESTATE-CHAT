import React from 'react'

import { Marker,Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import './style.scss';

const Pin = ({item}) => {
    console.log(item);
  return (
    <Marker position={[item.latitude,item.longitude]}>
    <Popup>
        <div className='popupContainer'>
            <img src = {item.img} alt = ""></img>
            <div className='textContainer'>
                <Link to = {`${item.id}`}>{item.title}</Link>
                <span>{item.bedroom} bedroom</span>
                <b>{item.price}</b>
            </div>
        </div>
    </Popup>
  </Marker>
  )
}

export default Pin