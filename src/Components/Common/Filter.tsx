import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, SlidersHorizontal, Filter } from 'lucide-react';

type FilterDropdownProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ isOpen, setIsOpen }) => {
  const [expandedSections, setExpandedSections] = useState({
    color: true,
    size: true,
    price: true,
    availability: true,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    colors: ['All'],
    sizes: ['28 Inches'],
    availability: ['In Stock'],
  });

  const [priceRange, setPriceRange] = useState([150, 15000]);

  const colors = [
    { name: 'All', count: 550, checked: true },
    { name: 'Brown', count: 100 },
    { name: 'Red', count: 20 },
    { name: 'Black', count: 90 },
    { name: 'White', count: 88 },
    { name: 'Light Blue', count: 109 },
  ];

  const sizes = [
    { name: '28 Inches', count: 550, checked: true },
    { name: '30 Inches', count: 100 },
    { name: '32 Inches', count: 20 },
    { name: '34 Inches', count: 20 },
    { name: '36 Inches', count: 20 },
    { name: '38 Inches', count: 20 },
  ];

  const availability = [
    { name: 'In Stock', count: 330, checked: true },
    { name: 'Out of Stock', count: 10 },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const handleCheckboxChange = (category: string, item: string) => {
    if (category === 'colors') {
      if (item === 'All') {
        setSelectedFilters((prev) => ({
          ...prev,
          colors: ['All'],
        }));
      } else {
        setSelectedFilters((prev) => ({
          ...prev,
          colors: prev.colors.includes('All')
            ? [item]
            : prev.colors.includes(item)
            ? prev.colors.filter((color) => color !== item)
            : [...prev.colors, item],
        }));
      }
    } else if (category === 'sizes') {
      setSelectedFilters((prev) => ({
        ...prev,
        sizes: prev.sizes.includes(item)
          ? prev.sizes.filter((size) => size !== item)
          : [...prev.sizes, item],
      }));
    } else if (category === 'availability') {
      setSelectedFilters((prev) => ({
        ...prev,
        availability: prev.availability.includes(item)
          ? prev.availability.filter((avail) => avail !== item)
          : [...prev.availability, item],
      }));
    }
  };

  const FilterSection = ({
    title,
    items,
    category,
    isExpanded,
    onToggle,
    showToggle = true,
  }: {
    title: string;
    items: { name: string; count: number }[];
    category: string;
    isExpanded: boolean;
    onToggle: () => void;
    showToggle?: boolean;
  }) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <div className="flex items-center justify-between py-4 px-5">
        <span className="font-medium text-gray-900 text-base">{title}</span>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          </div>
          {showToggle && (
            <button onClick={onToggle} className="p-1">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4 space-y-0">
          {items.map((item, index) => (
            <label
              key={index}
              className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-gray-50 group"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={
                      category === 'colors'
                        ? selectedFilters.colors.includes(item.name)
                        : category === 'sizes'
                        ? selectedFilters.sizes.includes(item.name)
                        : selectedFilters.availability.includes(item.name)
                    }
                    onChange={() => handleCheckboxChange(category, item.name)}
                    className="w-4 h-4 text-black bg-white border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0"
                  />
                  {(
                    (category === 'colors' &&
                      selectedFilters.colors.includes(item.name)) ||
                    (category === 'sizes' &&
                      selectedFilters.sizes.includes(item.name)) ||
                    (category === 'availability' &&
                      selectedFilters.availability.includes(item.name))
                  ) && (
                    <svg
                      className="absolute top-0 left-0 w-4 h-4 text-white pointer-events-none"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700 text-sm">
                  {item.name} ({item.count})
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const PriceSection = () => {
    const minPrice = 0;
    const maxPrice = 20000;

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (value <= priceRange[1]) {
        setPriceRange([value, priceRange[1]]);
      }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (value >= priceRange[0]) {
        setPriceRange([priceRange[0], value]);
      }
    };

    return (
      <div className="border-b border-gray-100">
        <div className="flex items-center justify-between py-4 px-5">
          <span className="font-medium text-gray-900 text-base">Price</span>
          <button onClick={() => toggleSection('price')} className="p-1">
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expandedSections.price ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 pb-6 mt-5">
            <div className="relative mb-4">
              <div className="h-1 bg-gray-300 rounded-full relative">
                <div
                  className="absolute h-1 bg-black rounded-full"
                  style={{
                    left: `${(priceRange[0] / maxPrice) * 100}%`,
                    width: `${
                      ((priceRange[1] - priceRange[0]) / maxPrice) * 100
                    }%`,
                  }}
                />
              </div>

              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={handleMinChange}
                className="absolute w-full appearance-none bg-transparent cursor-pointer range-slider"
                style={{
                  top: '-7px',
                  height: '20px',
                  zIndex: 1,
                }}
              />

              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={handleMaxChange}
                className="absolute w-full appearance-none bg-transparent cursor-pointer range-slider"
                style={{
                  top: '-7px',
                  height: '20px',
                  zIndex: 2,
                }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-500 px-4 py-2 rounded-lg hover:text-black transition-colors text-sm font-medium"
      >
        <Filter className="w-4 h-4" />
        <span>FILTERS</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50
          transition-all duration-300 ease-in-out transform origin-top-left
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          w-80 max-w-[calc(100vw-2rem)]
        `}
      >
        <div className="max-h-[80vh] overflow-y-auto">
          <FilterSection
            title="Color"
            items={colors}
            category="colors"
            isExpanded={expandedSections.color}
            onToggle={() => toggleSection('color')}
          />

          <FilterSection
            title="Size"
            items={sizes}
            category="sizes"
            isExpanded={expandedSections.size}
            onToggle={() => toggleSection('size')}
          />

          <PriceSection />

          <FilterSection
            title="Availability"
            items={availability}
            category="availability"
            isExpanded={expandedSections.availability}
            onToggle={() => toggleSection('availability')}
          />

          <div className="p-4 sm:p-5 md:p-6">
            <button
              onClick={() => {
                setIsOpen(false);
                console.log(
                  'Applied filters:',
                  selectedFilters,
                  'Price range:',
                  priceRange
                );
              }}
              className="w-full bg-[#ffe800] cursor-pointer hover:bg-[#e6d100] text-black font-medium py-3 px-4 rounded-full transition-all duration-200 text-sm sm:text-base hover:shadow-md active:scale-95"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
