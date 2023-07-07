import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './nav.css'
function Nav({rights}) {
    const navigate=useNavigate();
  return (
   
    <div className='nav'>
        <div className='navs'>
        <div className='1nav'>

      
          <button class="btn btn-danger" onClick={() => {
                localStorage.clear()
                navigate('/login')
            }} > Logout </button>
            </div>
            <div className='2nav'> 

           
             <button onClick={() => { navigate("/get/cart")}} class="btn btn-success" > GO TO CART </button>
             </div>
             <div className='3nav'>
             {rights.indexOf('add-product') !== -1 && <button className="edit" class="btn btn-warning" onClick={() => {
                               
                                navigate(`/add/product`)
                            }}>Create</button>}
                             </div>
    
    </div>
    </div>
  )
}

export default Nav