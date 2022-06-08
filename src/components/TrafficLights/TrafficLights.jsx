import React, { useEffect } from 'react'
import lights from "../../assests/trafficLights.svg"
import redLights from "../../assests/redTrafficSign.svg"
import greenLights from "../../assests/greenTrafficSign.svg"

import "./trafficLights.scss"

export default function TrafficLights() {
    useEffect(() => {

    }, [])
    return (
        <div className="trafficLights">
            <img src={lights} alt="" />
        </div>
    )
}
