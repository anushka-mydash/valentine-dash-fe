import React from 'react'
import Legends from '../Legends/Legends'
import PieChart from '../PieChart/PieChart'
import TrafficLights from '../TrafficLights/TrafficLights'
import "./Chart3.scss"

export default function Chart3() {
    const legendsData = [
        { value: "Lovers", color: "#D81071" },
        { value: "Haters", color: "#AC0857" },
    ]
    const data = [
        { value: "84", color: "#D81071" },
        { value: "16", color: "#AC0857" }
    ]
    const data1 = [
        { value: "77", color: "#D81071" },
        { value: "16", color: "#ffd0e4" }
    ]

    return (
        <div className="chart__container">
            <div className="versus__container">
                <div className="legendsContainer">
                    <Legends legendsData={legendsData} />
                </div>
                <div className="pieChart">
                    <h3>Lovers vs Haters</h3>
                    <PieChart data={data} />
                </div>
            </div>
            <div className="desirability__container">
                <div className="pieChart">
                    <h3>Your Desirability Rate</h3>
                    <PieChart data={data1} />
                </div>
                <div className="legendsContainer">
                    <TrafficLights percentage={data1[0].value} />
                </div>
            </div>
        </div>
    )
}
