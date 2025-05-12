import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, condition }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden h-60 w-full">
        <img
          className="h-full w-full object-cover hover:scale-110 transition ease-in-out duration-300"
          src={image[0]}
          alt={name}
        />
      </div>
      <div className="flex justify-between items-center pt-3 pb-1">
        <p className="text-sm font-semibold truncate">{name}</p>
        <p className="text-xs text-gray-500 italic ml-2">{condition}</p>
      </div>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  )
}

export default ProductItem
