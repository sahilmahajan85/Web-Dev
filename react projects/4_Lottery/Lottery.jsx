import { useState } from "react";

function genTicket(n){
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i]= Math.floor(Math.random()*10);
        
    }return arr;
}

function sum(arr) {
    return arr.reduce((sum, curr) => sum + curr, 0);
}

export default function Lottery() {
    let[ticket, setTicket]= useState(genTicket(3));
    let isWinning = sum( ticket ) === 15 ;
    let buyTicket = () =>  {
        setTicket(genTicket(3));
    }

    return( 
        <div>
            <h1>Lottery Game!</h1>
            <div className="ticket">
                <span>{ticket[0]}</span> &nbsp;
                <span>{ticket[1]}</span>&nbsp;
                <span>{ticket[2]}</span>&nbsp;
            </div>
            <br /><br />
            <button onClick={buyTicket}>Buy New Ticket</button>
            <h3>{isWinning && "Congratulations, You Won" }</h3>
        </div>
    );
}