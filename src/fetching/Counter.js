import React from "react";
import { useState } from "react";

const Count = () => {
    const [count, setCount] = useState(0);
    const increase = () =>{
        setCount(count +1)
    }
    const decrease = () =>{
        if(count === 0){
            alert('Cannot go lower than zero');
            return
        }else{
            setCount(count -1)
        }

    }

    return ( 
        <>
            <div className="count-holder">
                <h1>{count}</h1>
                <button className="green" onClick={increase}>Increement</button>
                <button className="red" onClick={decrease}>Decreement</button>
            </div>
        </>
     );
}
 
export default Count;