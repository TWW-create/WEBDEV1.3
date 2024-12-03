import { RiDeleteBin6Line } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL } from '../../utils/apiConstants';
import { useDispatch } from 'react-redux';
import { increaseQuantity, reduceQuantity, removeFromCart } from '../../redux/slice/cartSlice';
import { Link } from 'react-router-dom';

const CartItem = ({item}) => {

    const dispatch = useDispatch()

    const handleReduceCart = () => {
        dispatch(
            reduceQuantity({
              id: item.id,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
            })
        );   
    }

    const handleIncreaseCart = () => {
        dispatch(
            increaseQuantity({
              id: item.id,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
            })
          );
          
    }

    const handleRemoveItem = () => {
        dispatch(
            removeFromCart({
              id: item.id,
              selectedSize: item.selectedSize,
              selectedColor: item.selectedColor,
            })
        );
    }
    
  return (
    <div className='py-8 flex gap-6 justify-between items-center'>
        <div className='flex max-w-sm lg:max-w-none gap-2'>
            <img src={IMAGE_BASE_URL + "/" + item.image} alt="product-image" className='w-28 h-32 object-contain object-center' />
            <div>
                <Link to={(`/products/${item.id}`)} className='text-lg font-semibold ursor-pointer'>{item?.name}</Link>
                <div className="flex gap-2 items-center">
                    <p className="text-xs">{item.selectedSize}</p>
                    <span>•</span>
                    <div>
                        <div
                            className={`w-3 h-3 rounded-full border cursor-pointer`}
                            style={{ backgroundColor: item?.selectedColor.toLowerCase() }}
                        />
                    </div>
                </div>
                <p className='text-xs font-semibold'>€{item.price}</p>
            </div>
        </div>
        <div className='flex gap-2 items-center'>
            <p className='text-xs'>Quantity</p>
            <div className='border rounded-2xl flex items-center justify-between p-2 gap-16'>
                <button className=' ' onClick={() => handleReduceCart()}>-</button>
                <input type='number' className='text-xs inline-block w-10' value={item.quantity} />
                <button className=' ' onClick={() => handleIncreaseCart()}>+</button>
            </div>
            <div onClick={() => handleRemoveItem()}><RiDeleteBin6Line /></div>
        </div>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem