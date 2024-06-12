import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet';
import './style.scss';
import 'leaflet/dist/leaflet.css';
import Pin from './pin/Pin';


const Map = ({items}) => {
  return (
    <MapContainer center={[52.4797,-1.90269]} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map((item)=>{
      return(
        <Pin item = {item} key = {item.id}></Pin>
      );
    })}
  </MapContainer>
  )
}

export default Map