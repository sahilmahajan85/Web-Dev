import Product from "./Product.jsx";
function ProductTab(){
    let Styles = {
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "center",
        alignItems: "center",
    };
    return (
   <div style={Styles}>
   
        <Product title="Logitecg MX Master" idx ={0} />
        <Product title="Apple pencil (2nd Gen)" idx ={1} />
        <Product title="Zebronics Zeb" idx ={2} />
        <Product title="Petronics Toad 23" idx ={3} />
   </div>   	
    );
       
}
export default ProductTab;