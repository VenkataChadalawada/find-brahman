import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6; // change it to 9
    const skip = (page - 1) * pageSize; // used to get to page user directly wants
    const total = await Property.countDocuments({});
    // console.log("total properties", totalProperties);
    const properties = await Property.find({}).skip(skip).limit(pageSize);
    const result = {
      total,
      properties,
    };
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log("eerrr", error);
    return new Response("Something Went Wrong", {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserID is required", { status: 401 });
    }
    const { userId } = sessionUser;
    const formData = await request.formData();
    // console.log("----------post-=---", formData.get("name"));

    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");

    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // create propertydata object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
      },
      owner: userId,
      // images,
    };

    // Upload image(s) to cloudinary
    const imageUploadPromises = [];
    for (const image of images) {
      // console.log("image", image);
      // Assuming 'image' is a Blob or File object representing an image

      // Convert the image to an ArrayBuffer
      const imageBuffer = await image.arrayBuffer();
      // Create a Uint8Array from the ArrayBuffer
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      // Convert the Uint8Array to a Node.js Buffer
      const imageData = Buffer.from(imageArray);
      // Convert the image data buffer to base64 string
      const imageBase64 = imageData.toString("base64");
      // console.log("--imageBase64", imageBase64);
      // Make request to upload to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "propertypulse" },
        (error) => {
          console.log(error);
        }
      );

      // console.log("result---", result);
      imageUploadPromises.push(result.secure_url);
    }
    //wait for all images to upload
    const uploadedImages = await Promise.all(imageUploadPromises);

    //Add uploaded images to the propertyData object
    propertyData.images = uploadedImages;

    // console.log(propertyData);

    // create new Property model to upload into mongo db
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: "success" }), {
    //   status: 200,
    // });
  } catch (e) {
    return new Response(`Failed to add property ${JSON.stringify(e)}`, {
      status: 500,
    });
  }
};

// export const GET = async (request) => {
//   try {
//     await connectDB();
//     return new Response(JSON.stringify({ message: "Hello World" }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response("Something Went Wrong", {
//       status: 500,
//     });
//   }
// };
