import React from "react";

const Title = (props) => {
    const { title } = props || '';
    return (
        <>
            <h1 className="font-bold text-center text-2xl">{title}</h1>
        </>
    );
}

export { Title };