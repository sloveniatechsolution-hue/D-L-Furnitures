'use client';

interface FilterState {
  priceRange: number;
  materials: string[];
  finishes: string[];
  seatingCapacity: string[];
  availability: string[];
  deliveryTime: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const handlePriceChange = (value: number) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleMaterialChange = (material: string) => {
    const materials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    setFilters({ ...filters, materials });
  };

  const handleFinishChange = (finish: string) => {
    const finishes = filters.finishes.includes(finish)
      ? filters.finishes.filter((f) => f !== finish)
      : [...filters.finishes, finish];
    setFilters({ ...filters, finishes });
  };

  const handleSeatingChange = (seating: string) => {
    const seatingCapacity = filters.seatingCapacity.includes(seating)
      ? filters.seatingCapacity.filter((s) => s !== seating)
      : [...filters.seatingCapacity, seating];
    setFilters({ ...filters, seatingCapacity });
  };

  const handleAvailabilityChange = (availability: string) => {
    const availabilities = filters.availability.includes(availability)
      ? filters.availability.filter((a) => a !== availability)
      : [...filters.availability, availability];
    setFilters({ ...filters, availability: availabilities });
  };

  const handleDeliveryChange = (delivery: string) => {
    const deliveryTime = filters.deliveryTime.includes(delivery)
      ? filters.deliveryTime.filter((d) => d !== delivery)
      : [...filters.deliveryTime, delivery];
    setFilters({ ...filters, deliveryTime });
  };

  return (
    <aside className="hidden lg:block w-64 pr-6">
      <div className="bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
        {/* Filters Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-6">Filters</h3>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">
            Price Range
          </h4>
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>₹0</span>
            <span>₹{filters.priceRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          </div>
        </div>

        {/* Material */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Material</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="sheesham" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.materials.includes('sheesham')}
                onChange={() => handleMaterialChange('sheesham')}
              />
              <label htmlFor="sheesham" className="cursor-pointer text-gray-700">
                Sheesham Wood
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="mango" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.materials.includes('mango')}
                onChange={() => handleMaterialChange('mango')}
              />
              <label htmlFor="mango" className="cursor-pointer text-gray-700">
                Mango Wood
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="oak" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.materials.includes('oak')}
                onChange={() => handleMaterialChange('oak')}
              />
              <label htmlFor="oak" className="cursor-pointer text-gray-700">
                Oak Wood
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="engineered" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.materials.includes('engineered')}
                onChange={() => handleMaterialChange('engineered')}
              />
              <label htmlFor="engineered" className="cursor-pointer text-gray-700">
                Engineered Wood
              </label>
            </li>
          </ul>
        </div>

        {/* Finish */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Finish</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="natural" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.finishes.includes('natural')}
                onChange={() => handleFinishChange('natural')}
              />
              <label htmlFor="natural" className="cursor-pointer text-gray-700">
                Natural
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="stained" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.finishes.includes('stained')}
                onChange={() => handleFinishChange('stained')}
              />
              <label htmlFor="stained" className="cursor-pointer text-gray-700">
                Stained
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="polished" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.finishes.includes('polished')}
                onChange={() => handleFinishChange('polished')}
              />
              <label htmlFor="polished" className="cursor-pointer text-gray-700">
                Polished
              </label>
            </li>
          </ul>
        </div>

        {/* Seating Capacity */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Seating Capacity</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="2seater" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.seatingCapacity.includes('2seater')}
                onChange={() => handleSeatingChange('2seater')}
              />
              <label htmlFor="2seater" className="cursor-pointer text-gray-700">
                2 Seater
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="3seater" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.seatingCapacity.includes('3seater')}
                onChange={() => handleSeatingChange('3seater')}
              />
              <label htmlFor="3seater" className="cursor-pointer text-gray-700">
                3 Seater
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="4plus" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.seatingCapacity.includes('4plus')}
                onChange={() => handleSeatingChange('4plus')}
              />
              <label htmlFor="4plus" className="cursor-pointer text-gray-700">
                4+ Seater
              </label>
            </li>
          </ul>
        </div>

        {/* Availability */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Availability</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="instock" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.availability.includes('instock')}
                onChange={() => handleAvailabilityChange('instock')}
              />
              <label htmlFor="instock" className="cursor-pointer text-gray-700">
                In Stock
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="preorder" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.availability.includes('preorder')}
                onChange={() => handleAvailabilityChange('preorder')}
              />
              <label htmlFor="preorder" className="cursor-pointer text-gray-700">
                Pre-Order
              </label>
            </li>
          </ul>
        </div>

        {/* Delivery Time */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-sm">Delivery Time</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="express" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.deliveryTime.includes('express')}
                onChange={() => handleDeliveryChange('express')}
              />
              <label htmlFor="express" className="cursor-pointer text-gray-700">
                Express (2-3 days)
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="standard" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.deliveryTime.includes('standard')}
                onChange={() => handleDeliveryChange('standard')}
              />
              <label htmlFor="standard" className="cursor-pointer text-gray-700">
                Standard (5-7 days)
              </label>
            </li>
            <li className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="custom" 
                className="w-4 h-4 cursor-pointer" 
                checked={filters.deliveryTime.includes('custom')}
                onChange={() => handleDeliveryChange('custom')}
              />
              <label htmlFor="custom" className="cursor-pointer text-gray-700">
                Custom (Up to 30 days)
              </label>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
