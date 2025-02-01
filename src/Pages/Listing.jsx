import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTh, FaList } from "react-icons/fa";
import Breadcrumb from "./Breadcumb";
import { Link } from "react-router";

const Listing = () => {
  const [datas, setDatas] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("Most Relevant");
  const [filters, setFilters] = useState({
    make: [],
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    kilometer: "",
    location: "",
    engineSize: [],
    transmission: "",
    fuelType: [],
    exteriorColor: "",
    interiorColor: "",
  });

  useEffect(() => {
    axios
      .get("/car_listing.json")
      .then((res) => {
        const sanitizedData = res.data.map((item) => ({
          ...item,
          make: String(item.make || ""),
          location: String(item.location || ""),
        }));
        setDatas(sanitizedData);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const sortData = (option) => {
    const sortedData = [...datas];

    switch (option) {
      case "Newest":
        sortedData.sort((a, b) => b.year - a.year);
        break;
      case "Oldest":
        sortedData.sort((a, b) => a.year - b.year);
        break;
      case "Highest Price":
        sortedData.sort((a, b) => b.price_usd - a.price_usd);
        break;
      case "Lowest Price":
        sortedData.sort((a, b) => a.price_usd - b.price_usd);
        break;
      default:
        break;
    }

    setDatas(sortedData);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "make") {
      setFilters((prev) => ({
        ...prev,
        make: checked
          ? [...prev.make, value]
          : prev.make.filter((item) => item !== value),
      }));
    } else if (name === "make") {
      setFilters((prev) => ({ ...prev, make: [value] }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredData = datas.filter((data) => {
    const {
      make,
      minYear,
      maxYear,
      minPrice,
      maxPrice,
      kilometer,
      location,
      engineSize,
      transmission,
      fuelType,
      exteriorColor,
      interiorColor,
    } = filters;

    const matchesKilometer =
      !kilometer ||
      (kilometer === "0-10000" &&
        data.kilometer >= 0 &&
        data.kilometer <= 10000) ||
      (kilometer === "10001-50000" &&
        data.kilometer >= 10001 &&
        data.kilometer <= 50000) ||
      (kilometer === "50001-100000" &&
        data.kilometer >= 50001 &&
        data.kilometer <= 100000);

    const matchesEngineSize =
      engineSize.length === 0 ||
      engineSize.some((size) => {
        const [min, max] = size.split("-").map((n) => parseInt(n, 10));
        return data.engine_size_cc >= min && data.engine_size_cc <= max;
      });

    return (
      (make.length > 0
        ? make.some((m) =>
            String(data.make || "")
              .toLowerCase()
              .includes(m.toLowerCase())
          )
        : true) &&
      (minYear ? data.year >= parseInt(minYear, 10) : true) &&
      (maxYear ? data.year <= parseInt(maxYear, 10) : true) &&
      (minPrice ? data.price_usd >= parseFloat(minPrice) : true) &&
      (maxPrice ? data.price_usd <= parseFloat(maxPrice) : true) &&
      matchesKilometer &&
      (location
        ? String(data.location || "")
            .toLowerCase()
            .includes(location.toLowerCase())
        : true) &&
      matchesEngineSize &&
      (transmission ? data.transmission === transmission : true) &&
      (fuelType.length > 0 ? fuelType.includes(data.fuel_type) : true) &&
      (exteriorColor
        ? data.exterior_color.toLowerCase() === exteriorColor.toLowerCase()
        : true) &&
      (interiorColor
        ? data.interior_color.toLowerCase() === interiorColor.toLowerCase()
        : true)
    );
  });

  return (
    <div className="pt-24 px-5 md:px-16 lg:px-28">
      <h2 className="mb-8 mt-7">
        <Breadcrumb carname={""} />
      </h2>

      <div className="grid grid-cols-8 gap-10">
        <div className="col-span-2 shadow rounded">
          {/* filter side bar  */}
          <div className="col-span-2 shadow rounded p-4">
            <h3 className="font-bold text-xl mb-4">Filters</h3>
            {/* Make */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Make</label>
              <input
                type="text"
                name="make"
                value={filters.make[0] || ""}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                placeholder="Search make"
              />
              {["BMW", "Chevrolet", "Ferrari", "Ford", "Jaguar"].map((make) => (
                <div key={make}>
                  <input
                    type="checkbox"
                    name="make"
                    value={make}
                    checked={filters.make.includes(make)}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{make}</label>
                </div>
              ))}
            </div>

            {/* Year */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Year</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minYear"
                  value={filters.minYear}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Min Year"
                />
                <input
                  type="number"
                  name="maxYear"
                  value={filters.maxYear}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Max Year"
                />
              </div>
            </div>
            {/* Price */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Min Price"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="w-1/2 border p-2 rounded"
                  placeholder="Max Price"
                />
              </div>
            </div>
            {/* Kilometer */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Kilometer</label>
              <select
                name="kilometer"
                value={filters.kilometer}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">Select Kilometer</option>
                <option value="0-10000">0-10,000</option>
                <option value="10001-50000">10,001-50,000</option>
                <option value="50001-100000">50,001-100,000</option>
              </select>
            </div>
            {/* Location */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                placeholder="Search location"
              />
              {[
                "Damascus",
                "Aleppo",
                "Daraa",
                "Deir ez-Zor",
                "Hama",
                "Homs",
              ].map((loc) => (
                <div key={loc}>
                  <input
                    type="checkbox"
                    name="location"
                    value={loc}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{loc}</label>
                </div>
              ))}
            </div>
            {/* Engine Size */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Engine Size (CC)
              </label>
              {["0-499 cc", "1000-1499 cc", "3000-3499 cc"].map((size) => (
                <div key={size}>
                  <input
                    type="checkbox"
                    name="engineSize"
                    value={size}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{size}</label>
                </div>
              ))}
            </div>
            {/* Transmission */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Transmission</label>
              {["Automatic", "Manual"].map((trans) => (
                <div key={trans}>
                  <input
                    type="radio"
                    name="transmission"
                    value={trans}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{trans}</label>
                </div>
              ))}
            </div>
            {/* Fuel Type */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Fuel Type</label>
              {["Petrol", "Diesel", "Electric", "Gasoline"].map((fuel) => (
                <div key={fuel}>
                  <input
                    type="checkbox"
                    name="fuelType"
                    value={fuel}
                    onChange={handleFilterChange}
                  />
                  <label className="ml-2">{fuel}</label>
                </div>
              ))}
            </div>
            {/* Exterior Color */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Exterior Color</label>
              <select
                name="exteriorColor"
                value={filters.exteriorColor}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Blue">Blue</option>
              </select>
            </div>
            {/* Interior Color */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Interior Color</label>
              <select
                name="interiorColor"
                value={filters.interiorColor}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
                <option value="Beige">Beige</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className="flex justify-between items-center mb-4 p-2 rounded bg-transparent">
            <h2 className="text-[24px] font-semibold mr-4">
              {filteredData?.length} Results{" "}
              <span className="text-[#ff9540] text-[15px]">Classified Ads</span>
            </h2>
            <div className="flex items-center gap-8">
              {/* <select
                 className="border border-gray-200 p-3 pr-10 rounded-lg bg-white appearance-none h-16 w-full shadow-md text-gray-700 font-medium cursor-pointer"
                style={{ backgroundColor: "#ffff" }}
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  sortData(e.target.value);
                }}
              >
                <option>Most Relevant</option>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Highest Price</option>
                <option>Lowest Price</option>
                
              </select> */}

              <div className="flex items-center space-x-2">
                {/* Left side label */}
                <label className="text-gray-700 font-semibold">Sort by:</label>

                {/* Dropdown with arrow */}
                <div className="relative w-64">
                  <select
                    className="border border-gray-200 p-3 pr-10 rounded-lg bg-white appearance-none h-16 w-full shadow-md text-gray-700 font-medium cursor-pointer"
                    style={{ backgroundColor: "#ffff" }}
                    value={sortOption}
                    onChange={(e) => {
                      setSortOption(e.target.value);
                      sortData(e.target.value);
                    }}
                  >
                    <option>Most Relevant</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Highest Price</option>
                    <option>Lowest Price</option>
                  </select>

                  {/* Dropdown Arrow (Right Side) */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setView("grid")}
                className={`p-2 w-20 h-16 flex items-center justify-center rounded cursor-pointer border hover:text-[#ff9540] hover:border-[#ff9540] duration-300 ${
                  view === "grid"
                    ? "border-[#ff9540] bg-[#ff9540] duration-100"
                    : "border-gray-200"
                }`}
              >
                <FaTh className="w-1/2 h-1/2" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 w-20 h-16 flex items-center justify-center rounded cursor-pointer border hover:text-[#ff9540] hover:border-[#ff9540] duration-300 ${
                  view === "list"
                    ? "border-[#ff9540] bg-[#ff9540] duration-100"
                    : "border-gray-200"
                }`}
              >
                <FaList className="w-1/2 h-1/2" />
              </button>
            </div>
          </div>
          <div
            className={
              view === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4"
            }
          >
            {filteredData?.length > 0 ? (
              filteredData?.map((data) => (
                <Link to={`/cardetails/${data.carName}`} key={data.id}>
                  <div
                    className="shadow-sm rounded border p-4 flex gap-4"
                    style={{
                      flexDirection: view === "grid" ? "column" : "row",
                    }}
                  >
                    <div className="overflow-hidden rounded-t-md">
                      <img
                        alt=""
                        src={data.image}
                        className={
                          view === "grid"
                            ? "h-40 w-full object-cover transition-transform duration-500 hover:scale-105 ease-in-out"
                            : "h-24 w-32 object-cover"
                        }
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {data.listing_name}
                      </h2>
                      <p className="text-orange-500 font-bold">
                        ${data.price_usd}
                      </p>
                      <p className="text-gray-500">{data.views} Views</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h2 className="text-3xl text-red-600 text-center">
                No Results Found
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
