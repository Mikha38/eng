import { Button } from "flowbite-react"
import { Link } from "react-router-dom"
import { exitThunk, getUser } from "../../app/clientAPI/userSliceAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"

export default function UserPage(){
    const user = useAppSelector(getUser)
    const dispatch = useAppDispatch()
    return(
        <div>
            <Link to={'vocabulary'}>Управлять словарем</Link>
            <h1>Управлять текстами</h1>
            <h1>Управлять данными</h1>
            <h1>Выход</h1>
            <div>id {user.id}</div> 
            <div>token {user.token}</div>
            <Button type="button" onClick={()=>dispatch(exitThunk())}>Exit</Button>
        </div>
    )
}