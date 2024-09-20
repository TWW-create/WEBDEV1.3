import { Button, Collapse, Divider, Input } from 'antd';
import CartItem from './CartItem';

const Cart = () => {
  // Example cart items
  const cartItems = [
    {
      id: 1,
      name: 'Black T-shirt',
      image: 'https://via.placeholder.com/150',
      price: '€19.95',
    },
    {
      id: 2,
      name: 'White Sweater',
      image: 'https://via.placeholder.com/150',
      price: '€139.95',
    },
    {
      id: 3,
      name: 'Black T-shirt',
      image: 'https://via.placeholder.com/150',
      price: '€19.95',
    },
    {
      id: 4,
      name: 'White Sweater',
      image: 'https://via.placeholder.com/150',
      price: '€139.95',
    },
    {
      id: 5,
      name: 'Black T-shirt',
      image: 'https://via.placeholder.com/150',
      price: '€19.95',
    },
    {
      id: 6,
      name: 'White Sweater',
      image: 'https://via.placeholder.com/150',
      price: '€139.95',
    },
  ];

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
          <div className="grid gap-5 grid-cols-1">
            {cartItems.map(item => (
              <div key={item.id} className='border-b last:border-none'>
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
          <Button type='primary' block className='rounded-2xl mt-8'>Checkout • €159.95</Button>
          <Divider className='bg-black' />
          <Collapse defaultActiveKey={['1']} ghost items={items} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
