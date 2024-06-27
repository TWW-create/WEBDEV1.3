import { Button } from 'antd';
import shopm from '../../assets/images/shopm.png';
import shopw from '../../assets/images/shopw.png';

const Shop = () => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-2 mt-2'>
        <div className="md:w-[50%] flex-1 shrink-0 relative">
            <img src={shopm} alt="Shop Men" className='w-full object-cover object-center relative' />
            {/* <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 text-white rounded-xl px-5 py-1 flex items-center justify-center">
              <p className='font-bold text-sm'>Men</p>
            </div> */}
            <div className="absolute inset-0 flex items-start mt-9 justify-center">
                <div className="bg-white/30 text-white rounded-xl px-5 py-1">
                    <p className='font-bold text-sm'>Men</p>
                </div>
                <div className="absolute inset-0 flex items-end mb-9 justify-center">
                  <Button className="bg-white text-black px-5 py-6 font-medium">Explore Collections</Button>
              </div>
            </div>
        </div>
        <div className="md:w-[50%] flex-1 shrink-0 relative">
            <img src={shopw} alt="Shop Men" className='w-full object-cover object-center' />
            {/* <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 text-white rounded-xl px-5 py-1 flex items-center justify-center">
              <p className='font-bold text-sm'>Women</p>
            </div> */}
            <div className="absolute inset-0 flex items-start mt-9 justify-center">
                <div className="bg-white/30 text-white rounded-xl px-5 py-1">
                    <p className='font-bold text-sm'>Women</p>
                </div>
            </div>
            <div className="absolute inset-0 flex items-end mb-9 justify-center">
                <Button className="bg-white text-black px-5 py-6 font-medium">Explore Collections</Button>
            </div>
        </div>
    </div>
  )
}

export default Shop