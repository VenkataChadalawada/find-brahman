import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Preist Seekers"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Priests",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            Find your perfect priest. Bookmark priest and contact them
          </InfoBox>
          <InfoBox
            heading="For Priests"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Priest",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your skills and reach potential priest seekers. get hired as an
            as their preist to conduct their needed ritual
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
