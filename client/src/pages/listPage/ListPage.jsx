import React from 'react'
import './style.scss';
import {listData} from '../../lib/dummyData';
import {Filter,Card} from '../../components';

const ListPage = () => {
  const data = listData;


  return (
    <div className='listPage'>
      <div className='listContainer'>
        <div className="wrapper">
          <Filter></Filter>
          {
            data.map((item)=>{
              return(
                <Card key = {item.id} item = {item}></Card>
              );
            })
          }
        </div>
      </div>
      <div className='mapContainer'>Map</div>
    </div>
  )
}

export default ListPage
