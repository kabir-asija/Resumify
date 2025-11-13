import React from "react";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";

const RenderResume = ({ templateId, resumeData, containerWidth }) => {
  switch (templateId) {
    case "01":
      return (
        <TemplateOne containerWidth={containerWidth} resumeData={resumeData} />
      );
    case "02":
      return (
        <TemplateTwo containerWidth={containerWidth} resumeData={resumeData} />
      );

    case "03":
      return (
        <TemplateThree
          containerWidth={containerWidth}
          resumeData={resumeData}
        />
      );
    default:
      return (
        <TemplateOne containerWidth={containerWidth} resumeData={resumeData} />
      );
  }
};

export default RenderResume;
