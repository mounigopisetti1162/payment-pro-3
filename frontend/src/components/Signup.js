import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from "./global"
import './signup.css'
function Signup() {
    const navigate = useNavigate()


    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [type, setType] = useState('')

    const handleSignup = () => {
        console.log(userName, password)

        const data = { name: userName, password: password, type }
        axios.post(`${API}/signup`, data)
            .then((res) => {
                console.log(res.data, 17)
                if (res.data.code === 200) {
                    navigate('/login')
                }
            })
            .catch((err) => {
                console.log(err, 20)
            })
    }

    return (
        <div style={{
            display: 'flex',
            boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 16%)',
            justifyContent: 'center',
            margin: '50px 70px',
            padding: '30px',
        }} className="sign">
            <div className="signdiv">
                <h1 className="login"> Signup PAGE</h1>
                <label className="user">UserName</label><br></br>
          
                <input className="userinp" type="text" value={userName} onChange={(e) => {
                    setUserName(e.target.value)
                }} />   <br />  <br />
                <label className="user">Password</label><br></br>
                <input type="text" className="userinp" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />   <br />  <br />
               <label className="user">User Type</label><br></br>
                <input type="text" value={type}  className="userinp" onChange={(e) => {
                    setType(e.target.value)
                }} />   <br />  <br />

                <button onClick={handleSignup}  className="button"> SUBMIT </button>
                <div className="signup"> <Link to="/login"> LOGIN </Link> </div>
            <p>NOTE:user type is USER and this is only a payemnt application does not contain much Authorization or authentication you can find that in my remaining applications</p>
            </div>
        </div>
    )
}

export default Signup