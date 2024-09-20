import { Select } from 'antd';

const { Option } = Select;

const catOptions = ['Jackets', 'Longsleeves', 'Shirts', 'Sweaters', 'T-Shirts']
const colorOptions = ['Beige', 'Black', 'Blue', 'Brown', 'Green', 'Grey', 'Multi']
const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL',]
const creatorOptions = ['BARA Designs', 'D&G', 'Willston Design', 'TD Design',]
const sortOptions = [
  { label: 'Newest arrival', value: 'newest' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Best Seller', value: 'best' }
];

const NewFilters = ({ filters, setFilters }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {/* Category Filter */}
      <div className="filter-section">
        <Select
          mode="multiple"
          className=''
          style={{ width: '100%' }}
          placeholder="Categories"
          value={filters?.category}
          onChange={(values) => setFilters({ ...filters, category: values })}
        >
          {catOptions.map((cat, index) => (
            <Option key={index} value={cat}>{cat}</Option>
          ))}
        </Select>
      </div>

      {/* Colour Filter */}
      <div className="filter-section">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Colors"
          value={filters?.color}
          onChange={(values) => setFilters({ ...filters, color: values })}
        >
          {colorOptions.map((color, index) => (
            <Option key={index} value={color}>{color}</Option>
          ))}
        </Select>
      </div>

      {/* Size Filter */}
      <div className="filter-section">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Sizes"
          value={filters?.sizes}
          onChange={(values) => setFilters({ ...filters, sizes: values })}
        >
          {sizeOptions.map((size, index) => (
            <Option key={index} value={size}>{size}</Option>
          ))}
        </Select>
      </div>

      {/* Creator Filter */}
      <div className="filter-section">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Creators"
          value={filters?.creator}
          onChange={(values) => setFilters({ ...filters, creator: values })}
        >
          {creatorOptions.map((creator, index) => (
            <Option key={index} value={creator}>{creator}</Option>
          ))}
        </Select>
      </div>

      {/* Sort Filter (including Price Sorting) */}
      <div className="filter-section">
        <Select
          style={{ width: '100%' }}
          placeholder="Sort by"
          className='!h-auto'
          value={filters?.sort}
          onChange={(value) => setFilters({ ...filters, sort: value })}
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
