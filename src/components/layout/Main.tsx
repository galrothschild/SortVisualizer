import React, { useContext } from 'react';
import { ItemsContext } from '../utils/AlgoContext';
interface Props {
    algoType: string;
}
const Main: React.FC<Props> = ({ algoType }) => {
    const { items } = useContext(ItemsContext);
    return (
        <section className='row-span-5'>
            <div className='flex w-full h-full items-end'>
                {items.map((item, index) => (<div key={`${index}- ${item}`} className='flex-1 bg-slate-400 border border-slate-600' style={{
                    height: `${item * 95 / items.length}%`
                }}
                    id={`${index}`} ></div>))}
            </div>
        </section >
    );
};

export default Main;