import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API } from "./global"
import './addproducts.css'
function Addproduct() {
    const navigate = useNavigate()
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [seller, setSeller] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ image: image, name, category, seller, price })

        const data = { url: image, name, category, seller, price }
        axios.post(`${API}/add-product`, data)
            .then(res => {
                console.log(res)
                if (res.data === 'saved') {
                    navigate('/get/products')
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div className="forms">
            <form onSubmit={handleSubmit}>
                Image :     <input
                    className="inputs"
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    value={image} />
                <br />

                Name :  <input className="inputs"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name} /> <br />

                category :    <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="inputs"
                    type="text" /> <br />

                Seller :    <input
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    className="inputs" type="text" /> <br />

                Price :    <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="inputs" type="number" /> <br />

                <button type="submit" className="btn btn-success
                "> Submit </button>
            </form>
        </div>
    )
}

export default Addproduct