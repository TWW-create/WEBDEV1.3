import { Button } from 'antd'
import empty from '../../../assets/images/SVG.png'
import { Link } from 'react-router-dom'
const EmptyFavorites = () => {
  return (
    <div className='flex flex-col items-center gap-2 pt-32'>
        <img src={empty} alt="/" className='w-16 object-cover object-center' />
        <p className='font-semibold text-sm'>You have no Favourites</p>
        <Link to={'/'}>
            <Button htmlType="submit" block type="primary" className="rounded-2xl !shadow-none">Shop now</Button>
        </Link>
    </div>
  )
}

export default EmptyFavorites