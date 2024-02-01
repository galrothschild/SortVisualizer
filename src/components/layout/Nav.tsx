import React, { useContext } from "react";
import { SettingsContext } from "../utils/AlgoContext";
import CustomLink from "../utils/CustomLink";
import { useLocation } from "react-router-dom";
import path from "path";

const Nav = () => {
    const { settings, setSettings, sort } = useContext(SettingsContext);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: "arrayLength" | "delay") => {
        if (setSettings)
            setSettings({ ...settings, [type]: +event.target.value });
    };
    const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
        sort(pathName);
        const button = event.currentTarget;
        button.disabled = true;
        setTimeout(() => {
            button.disabled = false;
        }, settings.arrayLength * 3 * settings.delay);
    };
    let pathName = useLocation().pathname.split("/")[1];
    return (
        <nav className="w-screen bg-cyan-800 grid grid-flow-row">
            <div className="flex items-center justify-center w-full text-white my-2 gap-8">
                <div className="flex gap-2">
                    <CustomLink to="/merge">Merge Sort</CustomLink>
                    <CustomLink to="/insertion">Insertion Sort</CustomLink>
                    <CustomLink to="/bubble">Bubble Sort</CustomLink>
                </div>
                <button
                    onClick={handleSort}
                >Sort!</button>
            </div>
            <div className="flex flex-col items-center w-full pb-3">
                <label htmlFor="items_amount">Array Length: {settings.arrayLength}</label>
                <input
                    type="range"
                    name="items_amount"
                    id="items_amount"
                    className="w-full max-w-2xl "
                    min={2}
                    defaultValue={25}
                    max={300}
                    onChange={(e) => { handleChange(e, "arrayLength"); }} />
                <label htmlFor="items_amount">Delay: {settings.delay}</label>
                <input
                    type="range"
                    name="delay"
                    id="delay"
                    className="w-full max-w-2xl"
                    min={3}
                    defaultValue={15}
                    onChange={(e) => { handleChange(e, "delay"); }} />
            </div>
        </nav>
    );
};

export default Nav;