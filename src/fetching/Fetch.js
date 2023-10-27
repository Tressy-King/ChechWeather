"use client"
import {useState, useEffect} from 'react'

const Learn = () => {
    const [data, setData] = useState([])
        useEffect(()=>{
            async function getData(){
                const locate = await fetch('://fakestoreapi.com/productshttps')
                const res = await locate.json()
                setData(res)
            }
            getData()
        })

    return ( 
        <>
            {data.map(item => {
                return <h3>{item.price}</h3>
            })}
        </>
     );
}
 
export default Learn;