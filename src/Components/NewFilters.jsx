import { Select } from 'antd';

const { Option } = Select;

const colorOptions = ['Beige', 'Black', 'Blue', 'Brown', 'Green', 'Grey', 'Multi']
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL',]
const statusOptions = [
  {
    label: 'Discontinued',
    value: 'discontinued',
  },
   {
    label: 'Out of Stock',
    value: 'out_of_stock',
  },
  {
    value: 'available',
    label: 'Available',
  }
]
const creatorOptions = [
  {
    value: 'Dior',
    label: 'Dior',
  },
  {
    value: 'Loius Vuitton',
    label: 'Loius Vuitton',
  },
  {
    value: 'Versace',
    label: 'Versace',
  },
]
const sortOptions = [
  { label: 'Newest arrival', value: 'newest' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Best Seller', value: 'best_seller' }
];

const NewFilters = ({ filters, setFilters }) => {

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {/* Category Filter */}
      <div className="">
        <Select
         allowClear
          size='large'
          className=''
          style={{ width: '100%' }}
          placeholder="Status"
          value={filters?.status ? filters.status : undefined}
          onChange={(value) => setFilters((prevFilters) => ({ ...prevFilters, status: value }))}
        >
          {statusOptions.map((item, index) => (
            <Option key={index} value={item.value}>{item.label}</Option>
          ))}
        </Select>
      </div>

      {/* Colour Filter */}
      <div className="">
        <Select
          allowClear
          size='large'
          style={{ width: '100%' }}
          placeholder="Colors"
          value={filters?.color ? filters?.color : undefined}
          onChange={(value) => setFilters((prevFilters) => ({ ...prevFilters, color: value }))}
        >
          {colorOptions.map((color, index) => (
            <Option key={index} value={color}>{color}</Option>
          ))}
        </Select>
      </div>

      {/* Size Filter */}
      <div className="">
        <Select
          size='large'
          allowClear
          style={{ width: '100%' }}
          placeholder="Sizes"
          value={filters?.size ? filters?.size : undefined}
          onChange={(value) => setFilters((prevFilters) => ({ ...prevFilters, size: value }))}
        >
          {sizeOptions.map((size, index) => (
            <Option key={index} value={size}>{size}</Option>
          ))}
        </Select>
      </div>

      {/* Creator Filter */}
      <div className="">
        <Select
          allowClear
          size='large'
          style={{ width: '100%' }}
          placeholder="Creators"
          value={filters?.creator ? filters?.creator : undefined}
          onChange={(value) => setFilters((prevFilters) => ({ ...prevFilters, creator:value }))}
        >
          {creatorOptions.map((creator, index) => (
            <Option key={index} value={creator.value}>{creator.label}</Option>
          ))}
        </Select>
      </div>

      {/* Sort Filter (including Price Sorting) */}
      <div className="">
        <Select
          allowClear
          style={{ width: '100%' }}
          size='large'
          placeholder="Sort by"
          className='!h-auto'
          value={filters?.sort_by ? filters?.sort_by : undefined}
          onChange={(value) => setFilters((prevFilters) => ({ ...prevFilters, sort_by: value }))}
        >
          {sortOptions.map((option, index) => (
            <Option key={index} value={option.value}>{option.label}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default NewFilters;
