import { createContext, useEffect, useState } from "react";
import { getBubbleSortAnimations, getInsertionSortAnimations, getMergeSortAnimations } from "./sorts";

interface Settings {
    algoType: "merge sort" | "insertion sort";
    arrayLength: number;
    delay: number;
}

interface Props {
    children: React.ReactNode;
}

const initValues: Settings = {
    algoType: "merge sort",
    arrayLength: 25,
    delay: 15
};

type SettingsContextType = {
    settings: Settings,
    setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
    sort: (type: AlgoType) => void;

};

type ItemsContextType = {
    items: number[],
    setItems?: React.Dispatch<React.SetStateAction<number[]>>,
};

type AlgoType = string;
export const ItemsContext = createContext<ItemsContextType>({ items: [] });

export const SettingsContext = createContext<SettingsContextType>({
    settings: initValues,
    sort: () => { }
});

const AlgoContext: React.FC<Props> = ({ children }) => {
    const [settings, setSettings] = useState(initValues);
    const [items, setItems] = useState<number[]>([]);

    useEffect(() => {
        const randomNums = Array.from({ length: settings.arrayLength }, (_, i) => i + 1);
        for (let i = settings.arrayLength - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [randomNums[i], randomNums[j]] = [randomNums[j], randomNums[i]];
        }
        setItems(randomNums);
    }, [settings.arrayLength]);
    const sort = (algoType: AlgoType) => {
        switch (algoType) {
            case "bubble":
                const [newArrayBubble, animationsArrayBubble] = getBubbleSortAnimations(items);
                animateDivs(newArrayBubble, animationsArrayBubble);
                break;
            case "insertion":
                const [newArrayInsertion, animationsArrayInsertion] = getInsertionSortAnimations(items);
                animateDivs(newArrayInsertion, animationsArrayInsertion);
                break;
            case "merge":
                const aux: number[] = [];
                const AnimationsArrayMerge: number[][] = [];
                const newArrayMerge = [...items];
                getMergeSortAnimations(newArrayMerge, aux, AnimationsArrayMerge, 0, items.length - 1);
                animateMerge(newArrayMerge, AnimationsArrayMerge);
                break;
            default: break;
        }
    };

    const animateMerge = (newArr: number[], animationsArray: number[][]) => {
        animationsArray.forEach(([newHeight, divIndex], index) => {
            const div = document.getElementById(`${divIndex}`);
            if (!div) return;
            setTimeout(() => {
                div.style.backgroundColor = "#b041f0";
                div.style.height = `${newHeight * 95 / items.length}%`;
                setTimeout(() => {
                    div.style.backgroundColor = "";
                    index === animationsArray.length - 1 && setItems(newArr);
                }, settings.delay * 3);
            }, settings.delay * 3 * index);
        });
    };
    const animateDivs = (newArr: number[], animationsArray: number[][]) => {
        animationsArray.forEach(([first, second], index) => {
            const firstDiv = document.getElementById(`${first}`);
            const secondDiv = document.getElementById(`${second}`);
            if (!firstDiv || !secondDiv) return;
            setTimeout(() => {
                firstDiv.style.backgroundColor = "#b041f0";
                secondDiv.style.backgroundColor = "#b041f0";
                const firstDivHeight = firstDiv.style.height;
                firstDiv.style.height = secondDiv.style.height;
                secondDiv.style.height = firstDivHeight;
                setTimeout(() => {
                    firstDiv.style.backgroundColor = "";
                    secondDiv.style.backgroundColor = "";
                    index === animationsArray.length - 1 && setItems(newArr);
                }, settings.delay * 3);
            }, settings.delay * 3 * index);
        });
    };
    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            <SettingsContext.Provider value={{ settings, setSettings, sort }}>
                {children}
            </SettingsContext.Provider>
        </ItemsContext.Provider>
    );
};

export default AlgoContext;