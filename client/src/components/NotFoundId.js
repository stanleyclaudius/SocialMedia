import React from 'react';
import NotFound from './../images/notFound.svg';
import { Link } from 'react-router-dom';

const NotFoundId = ({info, url, link}) => {
  return (
    <>
      <div className='notFoundId'>
        <h1>SR-Social</h1>
        <div className='notFoundId__main'>
          <div className="notFoundId__left">
            <img src={NotFound} alt="Not Found" />
          </div>
          <div className="notFoundId__right">
            <p>{info} Not Found</p>
            <Link to={url}>Back to {link}</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundId;