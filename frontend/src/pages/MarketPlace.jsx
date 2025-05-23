import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const MarketPlace = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {
     if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
     }
     else{
      setCategory(prev=> [...prev,e.target.value])
     }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev=> [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice().reverse(); // reverse to show newest first
  
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }
  
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }
  
    setFilterProducts(productsCopy);
  };
  

  const sortProduct =() => {
    let filterProductsCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high' :
        setFilterProducts(filterProductsCopy.sort((a,b)=>(a.price - b.price)));
        break;
      
      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }


  useEffect(()=>{
    applyFilter();
  },[category, subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  // We don't need this since applyFilter will set filter prodducts
  // useEffect(()=>{
  //   setFilterProducts(products)
  // } , [])



  

  // THis is how you can use console.log in react projects
  // useEffect(()=>{
  //   console.log(subCategory);
  // }, [subCategory])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex  items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-2 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* Categories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-lightt text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men

            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/>Women

            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids

            </p>
          </div>
        </div>
              {/* SubCategory Filter */}
              <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-lightt text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Topwear

            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear

            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear

            </p>
          </div>
        </div>

      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'EXPLORE'} text2={'MARKETPLACE'} />
          {/* Product Sort */}

          <select name="" id="" className='border-2 border-gray-300 text-sm px-2' onChange={(e)=> setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low </option>
          </select>

        </div>

        {/* Map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>

      </div>
      
    </div>
  )
}

export default MarketPlace
