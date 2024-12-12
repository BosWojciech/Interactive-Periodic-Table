import "../styles/PeriodicTable.scss"
import { gsap } from "gsap";

const PeriodicTable = ({elements, onElementClick}) => {

    const rows = 9;
    const columns = 18;

    const grid = Array.from({ length:rows }, () => {
        Array.from({length:columns}, () => null)
    })

    elements.data.forEach((element) => {
        const { xpos, ypos } = element;
        console.log(`${xpos}, ${ypos}`)
        console.log(`Adding ${element.symbol} in array ${grid[ypos][xpos]}`)
        grid[ypos][xpos] = element;
    })




    return (
      <table className="periodic-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                if (cell) {
                  // Render element cell
                  return (
                    <td
                      key={colIndex}
                      className="element"
                      onClick={() => onElementClick(cell)}
                    >
                      <div className="symbol">{cell.symbol}</div>
                      <div className="atomic-number">{cell.atomicNumber}</div>
                    </td>
                  );
                } else {
                  // Render placeholder
                  return <td key={colIndex} className="placeholder"></td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default PeriodicTable;