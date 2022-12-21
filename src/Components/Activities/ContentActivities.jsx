import React from "react";

const ContentActivities = ({ content,classToApply }) => {
	return <div className={classToApply} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default ContentActivities;
