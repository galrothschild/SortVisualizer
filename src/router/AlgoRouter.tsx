import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../components/layout/Main';



const AlgoRouter: React.FC = () => {
    return (

        <Routes>
            <Route path="/" element={<Main algoType='merge' />} />
            <Route path="/merge" element={<Main algoType="merge" />} />
            <Route path="/insertion" element={<Main algoType="insertion" />} />
            <Route path="/bubble" element={<Main algoType="bubble" />} />
        </Routes>

    );
};

export default AlgoRouter;