import React from 'react';
import PixelCard from '../app/card';
import {Column, Row} from '../components/layout';

const CardMatrix = () => {
  // fetch the most recent projects
  const projects = [
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
    {title: 'Title', date: 'date', username: 'demo user'},
  ];

  const cards = projects.map((p, i) => {
    return(
      <PixelCard key={i} title={p.title} date={p.date} username={p.username}/>
    );
  })

  return(
    <div className='center-page'>
      <div className='matrix'>
        {cards}
      </div>
    </div>
  );
}

export default CardMatrix;