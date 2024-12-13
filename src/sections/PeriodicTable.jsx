import "../styles/PeriodicTable.scss"
import { gsap } from "gsap";

const PeriodicTable = ({elements, onElementClick}) => {

    const rows = 10;
    const columns = 18;

    const grid = Array.from({ length: rows }, () => Array(columns).fill(0));

    console.log(grid)
    elements.data.forEach((element) => {
        const { xpos, ypos } = element;
        console.log(`Element: ${element.symbol} X: ${xpos}, Y: ${ypos}`)
        grid[ypos-1][xpos-1] = element;
    })

    
    console.log({
      grid,
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