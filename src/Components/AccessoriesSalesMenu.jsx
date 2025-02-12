// import { Menu } from 'antd'
// import IMAGE from '../assets/images/shopm.png'
// import AccesoriesB from "../assets/images/accessories.png";
// import SalesB from "../assets/images/sales.png";
// import PropTypes from 'prop-types';

// const AccessoriesSalesMenu = ({categoryName, category, onMenuItemClick }) => {

//     const [firstSubCategory, secondSubCategory] = category.sub_categories || [];
//   return (
//     <div className="bg-white px-5 py-5 grid grid-cols-7 max-w-6xl gap-8 min-h-[422px]">
//          {/* First column: Category image */}
//          <div className="flex items-center col-span-1">
//              <img src={
//                  (categoryName === 'accessories' && AccesoriesB) || (categoryName === 'sales' && SalesB)
//              } alt="" className='max-w-[20vh] object-contain' />
//          </div>

//          {/* Second column: First subcategory */}
//          <div className="col-span-1">
//              <Menu
//                  key={firstSubCategory.id}
//                  onClick={onMenuItemClick}
//                  selectedKeys={[]}
//                  items={[
//                      {
//                          label: <span className="text-gray-500">{firstSubCategory.name.toUpperCase()}</span>,
//                          key: firstSubCategory.id,
//                          type: 'group',
//                      },
//                      ...firstSubCategory.product_types.map((type) => ({
//                          label: type.name,
//                          key: type.id,
//                      })),
//                  ]}
//                  style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
//              />
//          </div>

//          {/* Third column: First image */}
//          <div className="col-span-2">
//              <img src={IMAGE} alt="first subcategory" className="w-full h-[350px] object-cover object-center" />
//          </div>

//          {/* Fourth column: Second subcategory */}
//          <div className="col-span-1">
//              <Menu
//                  key={secondSubCategory.id}
//                  onClick={onMenuItemClick}
//                  selectedKeys={[]}
//                  items={[
//                      {
//                          label: <span className="text-gray-500">{secondSubCategory.name.toUpperCase()}</span>,
//                          key: secondSubCategory.id,
//                          type: 'group',
//                      },
//                      ...secondSubCategory.product_types.map((type) => ({
//                          label: type.name,
//                          key: type.id,
//                      })),
//                  ]}
//                  style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
//              />
//          </div>

//          {/* Fifth column: Second image */}
//          <div className="col-span-2">
//              <img src={IMAGE} alt="second subcategory" className="w-full h-[350px] object-cover object-center" />
//          </div>
//      </div>
//   )
// }

// AccessoriesSalesMenu.propTypes = {
//     categoryName: PropTypes.string,
//     category: PropTypes.object,
//     onMenuItemClick: PropTypes.func,
// }

// export default AccessoriesSalesMenu
import { Menu } from 'antd';
import IMAGE from '../assets/images/shopm.png';
import AccesoriesB from "../assets/images/accessories.png";
import SalesB from "../assets/images/sales.png";
import TailoringB from "../assets/images/shopm.png";
import ReadyToWearB from "../assets/images/shopm.png";
import PropTypes from 'prop-types';

const AccessoriesSalesMenu = ({ categoryName, category, onMenuItemClick }) => {
  const [firstSubCategory, secondSubCategory] = category.sub_categories || [];
  const isSales = categoryName === 'sales';
  
  return (
    <div className="bg-white px-5 py-5 grid grid-cols-7 max-w-6xl gap-8 min-h-[422px]">
      {/* First column: Category image */}
      <div className="flex items-center col-span-1">
        <img src={
          (categoryName === 'accessories' && AccesoriesB) || (isSales && SalesB)
        } alt="" className='max-w-[20vh] object-contain' />
      </div>

      {/* Second column: First subcategory */}
      <div className="col-span-1">
        <Menu
          key={firstSubCategory?.id}
          onClick={onMenuItemClick}
          selectedKeys={[]}
          items={firstSubCategory ? [
            {
              label: <span className="text-gray-500">{firstSubCategory.name.toUpperCase()}</span>,
              key: firstSubCategory.id,
              type: 'group',
            },
            ...firstSubCategory.product_types.map((type) => ({
              label: type.name,
              key: type.id,
            })),
          ] : []}
          style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
        />
      </div>

      {/* Third column: Image(s) */}
        <div className='col-span-2'>
            <p className="text-center mt-2 mb-4 text-gray-600">CATEGORY</p>
            <div className="flex flex-col gap-5">
                {isSales ? (
                [ReadyToWearB, TailoringB, AccesoriesB].map((img, index) => (
                    <img key={index} src={img} alt={`sales-category-${index}`} className="w-full h-28 object-cover object-center" />
                ))
                ) : (
                <img src={IMAGE} alt="first subcategory" className="w-full h-[350px] object-cover object-center" />
                )}
            </div>
        </div>

      {/* Fourth column: Second subcategory */}
        <div className="col-span-1">
            <Menu
            key={secondSubCategory?.id}
            onClick={onMenuItemClick}
            selectedKeys={[]}
            items={secondSubCategory ? [
                {
                label: <span className="text-gray-500">{secondSubCategory.name.toUpperCase()}</span>,
                key: secondSubCategory.id,
                type: 'group',
                },
                ...secondSubCategory.product_types.map((type) => ({
                label: type.name,
                key: type.id,
                })),
            ] : []}
            style={{ boxShadow: 'none', border: 'none', textTransform: 'capitalize' }}
            />
        </div>

        {/* Fifth column: Second image */}
        <div className='col-span-2'>
            <p className="text-center mt-2 mb-4 text-gray-600">CATEGORY</p>
            <div className="flex flex-col gap-5">
                {isSales ? (
                [ReadyToWearB, TailoringB, AccesoriesB].map((img, index) => (
                    <img key={index} src={img} alt={`sales-category-${index}`} className="w-full h-28 object-cover object-center" />
                ))
                ) : (
                <img src={IMAGE} alt="first subcategory" className="w-full h-[350px] object-cover object-center" />
                )}
            </div>
        </div>
    </div>
  );
};

AccessoriesSalesMenu.propTypes = {
  categoryName: PropTypes.string,
  category: PropTypes.object,
  onMenuItemClick: PropTypes.func,
};

export default AccessoriesSalesMenu;
