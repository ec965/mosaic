import React from 'react';
import {Column, Row} from '../components/layout';
import PixelApp from './index';

const PixelCard = (props) => {
  return(
    <Column className={`${props.className} card`}>
      <PixelApp 
        dimension={props.dimension} 
        pixelSize={props.pixelSize}
        borderRadius={props.borderRadius}
        rmin={props.rmin}
        rmax={props.rmax}
        gmin={props.gmin}
        gmax={props.gmax}
        bmin={props.bmin}
        bmax={props.bmax}
        sortHueRow={props.sortHueRow}
        sortHueRowLen={props.sortHueRowLen}
        sortHueCol={props.sortHueCol}
        sortHueColLen={props.sortHueColLen}
      />
      <Column className='card-body'>
        <h5 className='card-title'>{props.title}</h5>
        <p className='card-text'>{props.date}</p>
        <p className='card-text'>{props.username}</p>
      </Column>
    </Column>
  );
}

export default PixelCard;