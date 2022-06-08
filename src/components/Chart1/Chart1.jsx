import React, { useState, useEffect } from 'react'
import { GaugeChart } from './GuageChart'
import './Chart1.scss'
import Legends from '../Legends/Legends';

export default function Chart() {
    const [numOfCrushes, setNumOfCrushes] = useState(0);

    const randomCrushes = () => {
        return Math.floor((Math.random() * 50) + 1);
    }
    const legendsData =
        [
            { value: "Less than 10", color: "#ffd0e4" },
            { value: "10-20", color: "#f67aac" },
            { value: "20-30", color: "#d81071" },
            { value: "30-40", color: "#ac0857" },
            { value: "40 and more", color: "#ac0857" },
        ];

    useEffect(() => {
        const num = randomCrushes();
        setNumOfCrushes(num);
    }, [])

    return (
        <div className="gauge__wrapper">
            <h2 className="gauge__heading">
                Crushes you had during your life
            </h2>
            <div className="gauge__container">
                <div className="crushes__numberContainer">
                    <div className="loveBg">
                        <p className="crush__count">{numOfCrushes}</p>
                    </div>
                </div>
                <div className="loveMeter__container">
                    <GaugeChart
                        numOfCrushes={numOfCrushes}
                    />
                </div>
                <div style={{ width: "25%" }}>
                    <Legends legendsData={legendsData} />
                </div>
            </div>
        </div>

    )
}
