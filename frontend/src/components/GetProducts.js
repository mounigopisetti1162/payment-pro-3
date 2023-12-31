import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { API } from "./global"
import './getproducts.css'
import Nav from "./nav"
function GetProducts() {
    const navigate = useNavigate()
    const rights = JSON.parse(localStorage.getItem('rights'))[0]?.permissions
    console.log(rights, "9")
    const [data, setData] = useState([])
    const [deleteData, setDeleteData] = useState([])

    const [refresh, setRefresh] = useState(false)

console.log(rights);
    console.log(deleteData, "deletedata")

    // console.log(data, "8")
    useEffect(() => {
        const headers = { Authorization: localStorage.getItem('token') }
        axios.get(`${API}/get-products`, { headers })
            .then(res => {
                setData(res.data.data)
                console.log(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [refresh])
    let header=true;
if(((localStorage.getItem('rights'))[0]?.role)==='ADMIN')
{
header=false;
}

    const handleDelete = () => {
        // const data = deleteData
        // const data = rights
        const rig=rights
        console.log(data)// pass on the rights witht the data tooo
        axios.post(`${API}/delete-products`, {data:{data:deleteData,rights:rights}})
            .then(res => {
                console.log(res.data, "27")
                if (res.data.code === 200) {
                    setRefresh(!refresh)
                }
            })
            .catch(err => {
                console.log(err, "30")
            })

    }

    const handleAddToCart = (productId) => {
        const _productId = productId
        const userId = localStorage.getItem('userId')

        console.log({ productId: _productId, userId })
        const _data = { productId: _productId, userId }
        const headers = { Authorization: localStorage.getItem('token') }
        axios.post(`${API}/add-to-cart`, _data, { headers })
            .then(res => {
                console.log(res.data, "49")
                if (res.data.code === 200) {
                    setRefresh(!refresh)
                    console.log(refresh);
                }
            })
            .catch(err => {
                console.log(err, "30")
            })
    }

    return (<>
    <div className="getproducts">


        <h1 style={{ textAlign: 'center' }} className="heading"> $HOPPING CART  PRODUCTS </h1>
        <Nav rights={rights}/>
       
        {deleteData.length > 0 &&
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button className="delete"
                    onClick={handleDelete}>DELETE SELECTED </button>
            </div>}
          
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <br></br>
            <br></br>
            <br></br>
     
            {
                data &&
                data.length > 0 &&
                data.map((item, index) => {
                    return (
                        <div style={{
                            margin: '30px 30px',
                            padding:'10px 10px 10px 10px',
                            // background: '#eee',
                            boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 16%)',
                            width: '20%',
                            borderRadius: '5px'
                        }}>
                            <img style={{
                                width: '100%',
                                height: '150px'
                            }} src={item.url} alt="nin"/>
                            <div className="iteamname"style={{ marginLeft: '4px' }}>{item.name} in {item.category}</div>
                            <div className="iteamname" style={{ color: 'red', marginLeft: "4px" }}>
                                By {item.seller} </div>
                            <div className="iteamname" style={{ marginLeft: "4px" }}> PRICE : {item.price} Only/- </div>
                            <div className="productbutttons">

                            {rights.indexOf('edit-product') !== -1 && <button className="edit" onClick={() => {
                                console.log(item._id, "40")
                                navigate(`/get/product/${item._id}`)
                            }}>EDIT</button>}

                            {rights.indexOf('delete-products') !== -1 && <input onChange={(e) => {
                                if (e.target.checked === true) {
                                    setDeleteData([...deleteData, item._id])
                                } else {
                                    setDeleteData(deleteData.filter(s => s !== item._id))
                                }
                            }} type="checkbox" />}
                            <button className="buttons" onClick={() => handleAddToCart(item._id)
                            } > ADD TO CART  </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
    </>)
}

export default GetProducts