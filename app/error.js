'use client'

export default function Error({error, reset}){
    return (
        <div>
        <h4>404 ERROR</h4>
        <button onClick={()=>{reset()}}>새로고침</button>
        </div>
    )
}