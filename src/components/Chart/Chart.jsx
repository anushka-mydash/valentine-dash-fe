import React, { useState, useEffect } from 'react'
import { GaugeChart } from '../GuageChart'
import './Chart.scss'

export default function Chart() {
    const [numOfCrushes, setNumOfCrushes] = useState(0);

    const randomCrushes = () => {
        return Math.floor((Math.random() * 50) + 1);
    }

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
                <div className="legends__container">
                    <div className="legend__item">
                        <div className="col__box1"></div>
                        <div className="legend__label">Less than 10</div>
                    </div>
                    <div className="legend__item">
                        <div className="col__box2"></div>
                        <div className="legend__label">10-20</div>
                    </div>
                    <div className="legend__item">
                        <div className="col__box3"></div>
                        <div className="legend__label">20-30</div>
                    </div>
                    <div className="legend__item">
                        <div className="col__box4"></div>
                        <div className="legend__label">30-40</div>
                    </div>
                    <div className="legend__item">
                        <div className="col__box4"></div>
                        <div className="legend__label">40 and more</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
