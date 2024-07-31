import { RiDeleteBin6Line } from 'react-icons/ri';
import image from '../../assets/images/shirt1.png';
const CartItem = () => {
  return (
    <div>
        <div className='flex gap-1 pt-10'>
            <img src={image} alt="product-image" className='w-28 h-32 object-contain object-center' />
            <div>
                <p className='text-lg font-semibold'>Mid Blue Rahul Monogram Denim Shirt</p>
                <p className="text-xs">Ectra Small</p>
                <p className='text-xs font-semibold'>€159.95</p>
            </div>
        </div>
        <div className='flex gap-2 items-center'>
            <p className='text-xs'>Quantity</p>
            <div className='border rounded-2xl flex items-center justify-between p-2 gap-16'>
                <button className=' '>-</button>
                <input type='number' className='text-xs inline-block w-10' value='1' />
                <button className=' '>+</button>
            </div>
            <div><RiDeleteBin6Line /></div>
        </div>
    </div>
  )
}

export default CartItem