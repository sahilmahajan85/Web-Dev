export default function Price({oldPrice, newPrice}){
    
    let old= {
        textDecorationLine: "Line-through",
    }; 
    let newSty = {
        fontWeight: "bold",
    };

    let styl = {
        backgroundColor:  "#e0c367",
        height:" 50px",
        color:"black",
        borderBottomLeftRadius: "14px",
        borderBottomRightRadius: "14px",
    };
    return (
        <div style={styl}>
            <span style={old}>{oldPrice}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={newSty}>{newPrice}</span>
        </div>
    );
}