import gsap from "gsap";

const Cell = ({ cell, index }) => {
  if (cell.type === "placeholder")
    return <div key={index} className="cell placeholder"></div>;
  if (cell.type === "spacer")
    return (
      <div key={index} className={`cell spacer ${cell.orientation}`}></div>
    );
  if (cell.type === "element")
    return (
      <div
        key={index}
        className="cell element"
        onClick={() => onElementClick(cell)}
        onMouseEnter={(e) => gsap.to(e.target, { scale: 1.2 })}
        onMouseLeave={(e) => gsap.to(e.target, { scale: 1 })}
      >
        <div className="symbol">{cell.symbol}</div>
        <div className="atomic-number">{cell.atomicNumber}</div>
      </div>
    );

    throw new Error(`Unknown cell type: ${cell.type}`);
};

export default Cell;