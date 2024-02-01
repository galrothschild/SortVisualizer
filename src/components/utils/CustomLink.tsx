import React from 'react';
import { Link, useLocation, useMatch } from 'react-router-dom';

interface Props {
    to: string;
    children: React.ReactNode;
}

const CustomLink: React.FC<Props> = ({ to, children, ...props }) => {
    const resolvedPath = useLocation();
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })?.pathname === to;
    return (
        <Link to={to} className={`border border-teal-300 shadow-md py-2 px-4 transition-all active:scale-95 rounded ${!isActive && "text-teal-300 border-teal-600"}`}>{children}</Link>

    );
};

export default CustomLink;