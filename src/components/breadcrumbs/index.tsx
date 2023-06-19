import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './crumbs.scss'

export const BreadCrumbs = () => {
  const location = useLocation();
  const path = decodeURIComponent(location.pathname)
  let currentLink = "";
  const crumbs = path.split('/').filter((crumb) => crumb !== '').map((crumb, index) => {
    currentLink += `/${crumb}`
    return (
      <Link key={index} to={currentLink} className="crumb">{crumb}</Link>
    )
  })

  return <div className="crumbs">{crumbs}</div>;
};
