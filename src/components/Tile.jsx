function Tile({ className, value, onClick }) {
// A value of x or 0, className for css purpose and onClick function
    return (
      <div onClick={onClick} className={`tile ${className} `}>
        {value}
      </div>
    );
  }
  
  export default Tile;