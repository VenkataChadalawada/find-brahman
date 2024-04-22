"use client";
import { useState, useEffect } from "react";

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    type: "Apartment",
    name: "test property",
    description: "",
    location: {
      street: "",
      city: "test city",
      state: "test state",
      zipcode: "",
    },
    beds: "3",
    baths: "2",
    square_feet: "1800",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "2000",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "test@test.com",
      phone: "",
    },
    images: [],
  });
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;

    // clone the current array
    const updatedAmenities = [...fields.amenities];
    if (checked) {
      //add value to the array
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);

      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    //update state with updated array
    setFields((prevFields) => ({
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };
  const handleImageChange = (e) => {
    const { files } = e.target;
    console.log('--------', files);
    // clone images array
    const updatedImages = [...fields.images];
    // add new files to the array
    for (const file of files) {
      updatedImages.push(file);
    }
    // update state with the array of images
    setFields((prevFields) => ({
      ...prevFields,
      images: updatedImages,
    }));
  };


  return (
    mounted && (
      <div>
        <form
          action="/api/properties"
          method="POST"
          encType="multipart/form-data"
        >
          <h2 className="text-3xl text-center font-semibold mb-6">
            Add Pandit Form
          </h2>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-bold mb-2"
            >
              Pandit Language
            </label>
            <select
              id="type"
              name="type"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.type}
              onChange={handleChange}
            >
              <option value="All">All</option>
              <option value="Telugu">Telugu</option>
              <option value="Tamil">Tamil</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Kannada">Kannada</option>
              <option value="Odiya">Odiya</option>
              <option value="Gujarathi">Gujarathi</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Listing Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
              value={fields.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add an optional description of your property"
              value={fields.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-4 bg-orange-50 p-4">
            <label className="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              id="street"
              name="location.street"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Street"
              value={fields.location.street}
              onChange={handleChange}
            />
            <input
              type="text"
              id="city"
              name="location.city"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="City"
              required
              value={fields.location.city}
              onChange={handleChange}
            />
            <input
              type="text"
              id="state"
              name="location.state"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="State"
              required
              value={fields.location.state}
              onChange={handleChange}
            />
            <input
              type="text"
              id="zipcode"
              name="location.zipcode"
              className="border rounded w-full py-2 px-3 mb-2"
              placeholder="Zipcode"
              value={fields.location.zipcode}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex flex-wrap">
            <div className="w-full sm:w-1/3 pr-2">
              <label
                htmlFor="beds"
                className="block text-gray-700 font-bold mb-2"
              >
                Poojas
              </label>
              <input
                type="number"
                id="beds"
                name="beds"
                className="border rounded w-full py-2 px-3"
                required
                value={fields.beds}
                onChange={handleChange}
              />
            </div>
            <div className="w-full sm:w-1/3 px-2">
              <label
                htmlFor="baths"
                className="block text-gray-700 font-bold mb-2"
              >
                homas
              </label>
              <input
                type="number"
                id="baths"
                name="baths"
                className="border rounded w-full py-2 px-3"
                required
                value={fields.baths}
                onChange={handleChange}
              />
            </div>
            <div className="w-full sm:w-1/3 pl-2">
              <label
                htmlFor="square_feet"
                className="block text-gray-700 font-bold mb-2"
              >
                Japams
              </label>
              <input
                type="number"
                id="square_feet"
                name="square_feet"
                className="border rounded w-full py-2 px-3"
                required
                value={fields.square_feet}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Talents
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <input
                  type="checkbox"
                  id="amenity_Aksharabhyasam"
                  name="amenities"
                  value="Aksharabhyasam"
                  className="mr-2"
                  checked={fields.amenities.includes("Aksharabhyasam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Aksharabhyasam">Aksharabhyasam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Annaprasana"
                  name="amenities"
                  value="Annaprasana"
                  className="mr-2"
                  checked={fields.amenities.includes("Annaprasana")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Annaprasana">Annaprasana</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Barasala"
                  name="amenities"
                  value="Barasala"
                  className="mr-2"
                  checked={fields.amenities.includes("Barasala")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Barasala">Barasala</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_bhima_santhi"
                  name="amenities"
                  value="Bhima rather sandhi"
                  className="mr-2"
                  checked={fields.amenities.includes("Bhima rather sandhi")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_bhima_santhi">Bhima rather sandhi</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_kalyanam"
                  name="amenities"
                  value="Bhagavad Kalyanam"
                  className="mr-2"
                  checked={fields.amenities.includes("Bhagavad Kalyanam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_kalyanam">Bhagavad Kalyanam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_muhurtham"
                  name="amenities"
                  value="Muhurtham fixing"
                  className="mr-2"
                  checked={fields.amenities.includes("Muhurtham fixing")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_muhurtham">Muhurtham fixing</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_house_warm"
                  name="amenities"
                  value="House warming"
                  className="mr-2"
                  checked={fields.amenities.includes("House warming")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_house_warm">House warming</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_marriage"
                  name="amenities"
                  value="Marriage"
                  className="mr-2"
                  checked={fields.amenities.includes("Marriage")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_marriage">
                  Marriage
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Nischitartham"
                  name="amenities"
                  value="Nischitartham"
                  className="mr-2"
                  checked={fields.amenities.includes("Nischitartham")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Nischitartham">Nischitartham</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Shashtipoorthi"
                  name="amenities"
                  value="Shashtipoorthi"
                  className="mr-2"
                  checked={fields.amenities.includes("Shashtipoorthi")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Shashtipoorthi">Shashtipoorthi</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_gym_Upanayanam"
                  name="amenities"
                  value="Upanayanam"
                  className="mr-2"
                  checked={fields.amenities.includes("Upanayanam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_gym_Upanayanam">
                  Upanayanam
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_satya_vratam"
                  name="amenities"
                  value="Satya Narayana vartam"
                  className="mr-2"
                  checked={fields.amenities.includes("Satya Narayana vartam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_satya_vratam">
                  Satya Narayana vartam
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_homam"
                  name="amenities"
                  value="Homams"
                  className="mr-2"
                  checked={fields.amenities.includes("Homams")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_homam">Homams</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_pariharam"
                  name="amenities"
                  value="Pariharams"
                  className="mr-2"
                  checked={fields.amenities.includes("Pariharams")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_pariharam">Pariharams</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_japam"
                  name="amenities"
                  value="Japam"
                  className="mr-2"
                  checked={fields.amenities.includes("Japam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_japam">Japam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Punyavachanam"
                  name="amenities"
                  value="Punyavachanam"
                  className="mr-2"
                  checked={fields.amenities.includes("Punyavachanam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Punyavachanam">Punyavachanam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_vehicle_pooja"
                  name="amenities"
                  value="New vehicle pooja"
                  className="mr-2"
                  checked={fields.amenities.includes("New vehicle pooja")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_vehicle_pooja">New vehicle pooja</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Bhoomi_pooja"
                  name="amenities"
                  value="Bhoomi pooja"
                  className="mr-2"
                  checked={fields.amenities.includes("Bhoomi pooja")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Bhoomi_pooja">Bhoomi pooja</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_lalitha"
                  name="amenities"
                  value="Lalitha saahasranama pooja"
                  className="mr-2"
                  checked={fields.amenities.includes("Lalitha saahasranama pooja")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_lalitha">Lalitha saahasranama pooja</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_rudra"
                  name="amenities"
                  value="Rudrabhishekam"
                  className="mr-2"
                  checked={fields.amenities.includes("Rudrabhishekam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_rudra">Rudrabhishekam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_vara_laxmi_pooja"
                  name="amenities"
                  value="Vara Lakshmi pooja"
                  className="mr-2"
                  checked={fields.amenities.includes("Vara Lakshmi pooja")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_vara_laxmi_pooja">Vara Lakshmi pooja</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_veda_parayana"
                  name="amenities"
                  value="Veda parayanam"
                  className="mr-2"
                  checked={fields.amenities.includes("Veda parayanam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_veda_parayana">Veda parayanam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_annadanam"
                  name="amenities"
                  value="Annadanam"
                  className="mr-2"
                  checked={fields.amenities.includes("Annadanam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_annadanam">Annadanam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_karma"
                  name="amenities"
                  value="Karma karyam"
                  className="mr-2"
                  checked={fields.amenities.includes("Karma karyam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_karma">Karma karyam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_Srardham"
                  name="amenities"
                  value="Srardham"
                  className="mr-2"
                  checked={fields.amenities.includes("Srardham")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_Srardham">Srardham</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_danam"
                  name="amenities"
                  value="Danam"
                  className="mr-2"
                  checked={fields.amenities.includes("Danam")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_danam">Danam</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="amenity_santhi"
                  name="amenities"
                  value="Shanthi pooja"
                  className="mr-2"
                  checked={fields.amenities.includes("Shanthi pooja")}
                  onChange={handleAmenitiesChange}
                />
                <label htmlFor="amenity_santhi">Shanthi pooja</label>
              </div>
            </div>
          </div>

          <div className="mb-4 bg-orange-50 p-4">
            <label className="block text-gray-700 font-bold mb-2">
              Rates (Leave blank if not applicable)
            </label>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <label htmlFor="weekly_rate" className="mr-2">
                  Per Hour
                </label>
                <input
                  type="number"
                  id="weekly_rate"
                  name="rates.weekly"
                  className="border rounded w-full py-2 px-3"
                  checked={fields.rates.weekly}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="monthly_rate" className="mr-2">
                  Per Day
                </label>
                <input
                  type="number"
                  id="monthly_rate"
                  name="rates.monthly"
                  className="border rounded w-full py-2 px-3"
                  checked={fields.rates.monthly}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="nightly_rate" className="mr-2">
                  Per Event
                </label>
                <input
                  type="number"
                  id="nightly_rate"
                  name="rates.nightly"
                  className="border rounded w-full py-2 px-3"
                  checked={fields.rates.nightly}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="seller_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Pandit Name
            </label>
            <input
              type="text"
              id="seller_name"
              name="seller_info.name"
              className="border rounded w-full py-2 px-3"
              placeholder="Name"
              checked={fields.seller_info.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="seller_email"
              className="block text-gray-700 font-bold mb-2"
            >
              Pandit Email
            </label>
            <input
              type="email"
              id="seller_email"
              name="seller_info.email"
              className="border rounded w-full py-2 px-3"
              placeholder="Email address"
              required
              checked={fields.seller_info.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="seller_phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Pandit Phone
            </label>
            <input
              type="tel"
              id="seller_phone"
              name="seller_info.phone"
              className="border rounded w-full py-2 px-3"
              placeholder="Phone"
              checked={fields.seller_info.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-gray-700 font-bold mb-2"
            >
              Images (Select up to 4 images)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="border rounded w-full py-2 px-3"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>

          <div>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              Add Pandit
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyAddForm;
