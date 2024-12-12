import { fetchElements } from "./store/periodicTableSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import Header from "./sections/Header";
import SearchResult from "./sections/SearchResult";
import PeriodicTable from "./sections/PeriodicTable";

function App() {

  const dispatch = useDispatch()
  const { elements, isLoading, error } = useSelector((state) => state.periodicTable);
  const { searchQuery } = useSelector((state) => state.periodicTable);

  useEffect(() => {
    dispatch(fetchElements());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      {searchQuery ? <SearchResult /> : <PeriodicTable elements={elements} />}
    </>
  );
}

export default App
