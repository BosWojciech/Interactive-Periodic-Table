import { useSelector } from "react-redux";

const FilterButtons = () => {

    const { allFilters } = useSelector((state) => state.periodicTable);

    console.log(allFilters)

    return (
        <div className="filter-buttons">
          {allFilters.map((filter) => (
              <div className="filter-button">
                <input type="checkbox" />
                {filter}
              </div>
          ))}  
        </div>
    );
};

export default FilterButtons;