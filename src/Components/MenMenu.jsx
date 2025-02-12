import { Menu, Space } from "antd"
import MenB from "../assets/images/men.png";
import WomenB from "../assets/images/women.png";
import IMAGE from '../assets/images/shopm.png'
import men1 from '../assets/images/men1.png';
import men2 from '../assets/images/men2.png'
import men3 from '../assets/images/men3.png'
import women1 from '../assets/images/women1.png'
import women2 from '../assets/images/women2.png'
import women3 from '../assets/images/women3.png'
import PropTypes from "prop-types";

const MenMenu = ({categoryName, category, onMenuItemClick}) => {
  return (
    <div className="bg-white px-5 py-5 grid grid-cols-6 max-w-6xl gap-8 min-h-[422px]">
          <div className="flex items-center col-span-1">
            <img src={
              (categoryName === 'men' && MenB) || (categoryName === 'women' && WomenB)
            } alt="" className='max-w-[20vh] object-contain' />
          </div>
          <Space direction="horizontal" className="flex items-start col-span-2">
            {category.sub_categories.map((subCategory) => (
              <Menu
                key={subCategory.id}
                onClick={onMenuItemClick}
                selectedKeys={[]}
                items={[
                  {
                    label: <span className="text-gray-500">{subCategory.name.toUpperCase()}</span>,
                    key: subCategory.id,
                    type: 'group',
                  },
                  ...subCategory.product_types.map((type) => ({
                    label: type.name,
                    key: type.id,
                  })),
                ]}
                style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
              />
            ))}
          </Space>
    
          {/* Sample image content */}
          <div className="h-[350px] max-w-xl col-span-3">
            <p className="text-center mb-4 text-gray-600">Best of Seasons</p>
            <div className="grid grid-cols-5 gap-5 h-full">
              {/* First image container */}
              <div className="w-full h-[350px] col-span-2">
                <img src={(categoryName === 'men' && men1) || (categoryName === 'women' && women1) || IMAGE} alt="best season" className="w-full h-[350px] object-cover object-center" />
              </div>
              {/* Remaining two images */}
              <div className="col-span-3 space-y-4">
                <img src={(categoryName === 'men' && men2) || (categoryName === 'women' && women2) || IMAGE} alt="best season" className="w-full h-[165px] object-cover object-center" />
                <img src={(categoryName === 'men' && men3) || (categoryName === 'women' && women3) || IMAGE} alt="best season" className="w-full h-[165px] object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
  )
}

MenMenu.propTypes = {
  categoryName: PropTypes.string,
  category: PropTypes.object,
  onMenuItemClick: PropTypes.func,
};

export default MenMenu