import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../features/loading/loadingSlice';

export default function Nav() {

    // read from store
    const loadingState = useSelector(selectLoading);

    return (
        <nav style={{borderTop:"1px solid #770b96"}} className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Your personal CMS
          </a>
          {loadingState ? <div className="navbar-brand ml-auto">Loading...</div> : <></>}
        </nav>
      );
}
