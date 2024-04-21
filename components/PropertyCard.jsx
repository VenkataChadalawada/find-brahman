import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";
import {GiFlowers, GiFireBowl, GiMeditation} from 'react-icons/gi';

const PropertyCard = ({ property }) => {
  const { rates } = property;
  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/hr`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/dy`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/event`;
    }
  };
  // src={`/images/properties/${property.images[0]}`}

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <Image
        src={property.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-orange-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}$
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <GiFlowers className="inline mr-2" /> {property.beds}
            <span className="md:hidden lg:inline">3</span>
          </p>
          <p>
            <GiFireBowl className="inline mr-2" /> {property.baths}
            <span className="md:hidden lg:inline">bath</span>
          </p>
          <p>
            <GiMeditation className="inline mr-2" />
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> hour
            </p>
          )}
          {rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> day
            </p>
          )}
          {rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" /> event
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700  mt-1" />
            <span className="text-orange-700">
              {" "}
              {property.location.city} {property.location.state}{" "}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-orange-700 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
