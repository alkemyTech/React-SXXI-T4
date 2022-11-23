import React from "react";

const ContentActivities = ({ content }) => {
	return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ContentActivities;
