import './style.scss';
import Card from '../card/Card';
import {listData} from '../../lib/dummyData';


import React from 'react'

const List = () => {
  return (
    <div className='list'>
        {listData.map((item)=>{
            return(
                <Card key = {item.id} item = {item}></Card>
            );
        })}         
    </div>
  )
}

export default List