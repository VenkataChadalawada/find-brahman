import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Pandit Seekers"
            backgroundColor="bg-orange-200"
            buttonInfo={{
              text: "Browse Priests",
              link: "/properties",
              backgroundColor: "bg-orange-700",
            }}
          >
            Find your perfect priest. Bookmark priest and contact them
          </InfoBox>
          <InfoBox
            heading="For Pandits"
            backgroundColor="bg-orange-100"
            buttonInfo={{
              text: "Add Priest",
              link: "/properties/add",
              backgroundColor: "bg-orange-700",
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
