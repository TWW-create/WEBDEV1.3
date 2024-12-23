import { Button, Collapse, Divider, Input } from 'antd';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();
  // Example cart items
  const cart = useSelector((state) => state.cart.cart);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };
  

  const items = [
    {
      key: '1',
      label: 'Payment Information',
      children: <p>We offer the following different payment options: iDeal, Paypal, 
      Bancontact, Visa, Mastercard, American Express, Shop Pay, 
      Google Pay</p>,
    },
    {
      key: '2',
      label: 'Shipping and returns',
      children: <p>Delivery times are currently longer due to the high volumes of orders. If you&apos;re not happy with your purchase, we offer a generous 14-day return policy on all of our items except for underwear briefs, bodies, swimwear, facemasks, pierced jewellery and earbuds.For hygiene reasons, these items cannot be returned or exchanged unless faulty.For more information, please check our Shipping page and our Returns page.</p>,
    },
  ];
  

  return (
    <div>
      <div className="px-10 xl:px-20 pt-12 flex gap-4 flex-col lg:flex-row">
        <div className="w-full flex-grow">
          <div>
            <p className="text-xl font-bold">Shopping cart</p>
          </div>
          {cart.length < 1 && <div className="mt-6">
              <h1 className='text-lg '>Your cart is empty</h1>
          </div>}
          <div className="grid gap-5 grid-cols-1">
            {cart.map((item, i) => (
              <div key={i} className='border-b last:border-none'>
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[300px] xl:w-[356px] shrink-0 mt-10 lg:mt-0">
          <div className="flex gap-2 items-center">
            <Input className="rounded-2xl bg-[#F5F5F5] !border-none text-sm !p-2 !h-auto" placeholder="Discount?" />
            <Button className="bg-transparent text-black hover:!text-black hover:!bg-transparent !shadow-none rounded-2xl" type="primary">
              Apply
            </Button>
          </div>
          <Button onClick={() => handleCheckout()} type='primary' block className='rounded-2xl mt-8' disabled={cart.length === 0}>{cart.length > 0 ? `Checkout • €${totalAmount.toFixed(2)}` : 'Checkout'}</Button>
          <Divider className='bg-black' />
          <Collapse defaultActiveKey={['1']} ghost items={items} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
