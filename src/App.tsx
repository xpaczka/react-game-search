import { useSelector } from 'react-redux';
import { RootState } from './store';

import Header from './components/Header';
import GameCardsList from './components/GameCardsList';
import Pagination from './components/Pagination';

const App = () => {
  const searchState = useSelector((state: RootState) => state.search);

  return (
    <>
      <Header />
      <GameCardsList data-testid='1' />
      {searchState.data && searchState.data?.count > 0 && <Pagination />}
    </>
  );
};

export default App;
