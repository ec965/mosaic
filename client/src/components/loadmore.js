import React from 'react';
import { Row } from './layout';
import { COLORS } from '../config/colors';
import Loader from 'react-loader-spinner';
import { Button } from './button';

export const NoMore = () => <Row><p className="italic">No more content to load.</p></Row>

export const LoadMore = ({disable, onClick}) =>{
  return(
    <Row>
      { disable && <Loader type="Oval" color={COLORS.base0D} height={30} width={30} style={{"padding-right": "12px"}}/>}
      <Button disable={disable ? 1: 0} onClick={onClick}>Load More</Button>
    </Row>
  );
}
