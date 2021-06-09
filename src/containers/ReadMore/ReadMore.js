import React, { useState } from "react";
import classes from './ReadMore.module.css';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className={classes.text}>
        {isReadMore ? text.slice(0, 5) : text}
        <span onClick={toggleReadMore} className={classes.readOrHide}>
            {isReadMore ? "...more" : " less"}
        </span>
        </p>
    );
};

const Content = (props) => {
return (
	<div className={classes.container}>
	<h2>
		<ReadMore>
		{props.desc}
		</ReadMore>
	</h2>
	</div>
);
};

export default Content;
