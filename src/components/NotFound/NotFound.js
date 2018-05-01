import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () =>
<div className="NotFound">
  <h3>Error 404</h3>
  <p>
    We are sorry but the page you are looking for does not exist. <br />
    Please, come back to <Link to="/">Home</Link> page. :)
  </p>
  <img src="https://http.cat/404" alt="404 page not found" height="500" />
</div>

export default NotFound;