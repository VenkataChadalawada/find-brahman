import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Something Went Wrong ${error}`, {
      status: 500,
    });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = sessionUser;
    await connectDB();
    const property = await Property.findById(propertyId);
    if (!property) {
      return new Response("Property Not Found", { status: 404 });
    }
    // verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("unauthorized", { status: 401 });
    }
    // delete
    await property.deleteOne();
    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log("---Something Went Wrong deleting property--", error);
    return new Response(`Something Went Wrong deleting property ${error}`, {
      status: 500,
    });
  }
};

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response("UserID is required", { status: 401 });
    }
    const { id } = params;
    const { userId } = sessionUser;
    const formData = await request.formData();
    // console.log("----------post-=---", formData.get("name"));

    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");
    // get property to update
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response("Property doesnot exist", { status: 404 });
    }
    // Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("UnAuthorized", { status: 401 });
    }
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
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify({ updatedProperty }), {
      status: 200,
    });
  } catch (e) {
    return new Response(`Failed to add property ${JSON.stringify(e)}`, {
      status: 500,
    });
  }
};
