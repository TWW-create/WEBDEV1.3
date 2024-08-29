import { Checkbox, Slider, Radio, Divider } from 'antd';
import { useEffect } from 'react';

const catOptions = ['Jackets', 'Longsleeves', 'Shirts', 'Sweaters', 'T-Shirts']
const colorOptions = ['Beige', 'Black', 'Blue', 'Brown', 'Green', 'Grey', 'Multi']
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL',]
const creatorOptions = ['BARA Designs', 'D&G', 'Willston Design', 'TD Design',]
const sortOptions = [{label:'Newest arrival', value:'newest'}, {label:'Price ascending', value:'asc'}, {label:'Price descending', value:'desc'}, {label:'Best Seller', value:'best'}]
const Filters = ({ filters, setFilters, setShowFilters, showFilters}) => {

    useEffect(() => {
        if (showFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showFilters]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end duration-300 transition-all">
        <div className="w-[250px] h-full bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <p className="font-medium text-lg">Filters</p>
                <button onClick={() => setShowFilters(false)} className="text-xl font-bold">×</button>
            </div>
            <Divider />
            <div className='h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide'>
                <div className="filter-section">
                    <h3 className='font-bold text-lg pb-3'>Category</h3>
                    <Checkbox.Group
                    className="flex flex-col gap-3"
                    value={filters.category}
                    onChange={(values) => setFilters({ ...filters, category: values })}
                    >
                        {catOptions.map((cat, index) => (
                            <Checkbox key={index} value={cat} className='font-medium'>{cat}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </div>
                <div className="filter-section">
                    <h3 className='font-bold text-lg pb-3'>Colour</h3>
                    <Checkbox.Group
                    className="flex flex-col gap-3"
                    value={filters.color}
                    onChange={(values) => setFilters({ ...filters, color: values })}
                    >
                        {colorOptions.map((color, index) => (
                            <Checkbox key={index} value={color} className='font-medium'>{color}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </div>
                <div className="filter-section">
                    <h3 className='font-bold text-lg pb-3'>Price</h3>
                    <Slider
                    range
                    min={0}
                    max={550}
                    defaultValue={[0, 550]}
                    onChange={(value) => setFilters({ ...filters, price: value })}
                    />
                    <div className='flex justify-between mt-2'>
                    <span>€{filters.price[0]}</span>
                    <span>€{filters.price[1]}</span>
                    </div>
                </div>
                <div className="filter-section">
                    <h3 className='font-bold text-lg pb-3'>Sort</h3>
                    <Radio.Group
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    value={filters.sort}
                    className='flex flex-col gap-3'
                    >
                        {sortOptions.map((option, i) => (
                        <Radio key={i} value={option.value} className='font-medium'>{option.label}</Radio>
                        ))}
                    </Radio.Group>
                </div>
                <div className="filter-section">
                    <h3 className='font-bold text-lg pb-3'>Sizes</h3>
                    <Checkbox.Group
                    className="flex flex-col gap-3"
                    value={filters.sizes}
                    onChange={(values) => setFilters({ ...filters, sizes: values })}
                    >
                        {sizeOptions.map((color, index) => (
                            <Checkbox key={index} value={color} className='font-medium'>{color}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </div>
                <div className="filter-section">
                    <h3 className='font-bold text-lg pb-3'>Creator</h3>
                    <Checkbox.Group
                    className="flex flex-col gap-3"
                    value={filters.creator}
                    onChange={(values) => setFilters({ ...filters, creator: values })}
                    >
                        {creatorOptions.map((color, index) => (
                            <Checkbox key={index} value={color} className='font-medium'>{color}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Filters;
