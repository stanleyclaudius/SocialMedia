import React from 'react';
import NotFound from '../components/NotFound';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const generatePage = pageName => {
  const component = () => require(`./../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />
  }
}

const PageRender = () => {
  let pageName = '';
  const {page, id} = useParams();
  const {auth} = useSelector(state => state);

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
}

export default PageRender;;