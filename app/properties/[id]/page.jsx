"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";

import Link from "next/link";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/components/Spinner";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
        console.log("---", property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);
  if (!(property && property._id) && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property?.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
                    <BookmarkButton property={property} />
                    <ShareButtons property={property} />
                    <PropertyContactForm property={property} />
                  </div>
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;

// "use client";
// import {
//   useRouter,
//   useParams,
//   useSearchParams,
//   usePathname,
// } from "next/navigation";

// // http://localhost:3000/properties/alpha?name=venkat

// const IDPage = () => {
//   const router = useRouter();
//   const { id } = useParams(); // url/venkat
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name"); // url?name='venkat'
//   const pathName = usePathname(); // /properties/alpha

//   return (
//     <div>
//       ID Prop
//       <button onClick={() => router.push("/")} className="bg-blue-500 p-2">
//         Go Home {id} {name} {pathName}
//       </button>
//     </div>
//   );
// };

// export default IDPage;
