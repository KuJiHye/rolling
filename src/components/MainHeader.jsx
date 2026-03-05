import React from 'react';
import Logo from './Logo';
import CreateButton from './CreateButton';
import ExploreButton from './ExploreButton'; 

const MainHeader = () => {
  return (
    <header>
      <Logo />
      <CreateButton />
      <ExploreButton /> 
    </header>
  );
};

export default MainHeader;