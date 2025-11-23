import "./Product.css";
import Price from "./Price";

function Product({title, idx}) {
    let oldPrice = ["12,495","11,900", "1,599", "599"];
    let newPrice = ["8,999","9,199", "899", "278"];
    let Description = [
        ["8,000 DPI", "5 Programmable Buttons"], 
        ["intutive surface", "designed for ipad pro"], 
        ["designed for ipad pro","intutive surface"], 
        ["wireless","intutive surface"],
    ];
    return (
        <div className="Product">
            <h4>{title}</h4>
            <p>{Description[idx][0]}</p>
            <p>{Description[idx][1]}</p>
           < Price oldPrice = {oldPrice[idx]} newPrice ={newPrice[idx]} />        
        </div>
    );
}
export default Product;
