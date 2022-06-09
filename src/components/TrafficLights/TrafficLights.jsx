import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";
import lights from "../../assests/trafficLights.svg"
import redLights from "../../assests/redTrafficSign.svg"
import greenLights from "../../assests/greenTrafficSign.svg"

import "./trafficLights.scss"

export default function TrafficLights({ percentage }) {
    const selectedSvg = useRef(null);
    let isPresent = true;

    useEffect(() => {
        const mainSvg = d3.select(selectedSvg.current);
        mainSvg.selectAll("*").remove();

        mainSvg
            .append("image")
            .attr("class", "trafficLights")
            .attr("xlink:href", lights)
            .attr("width", "135px")
            .attr("x", 65)
            .attr("y", 0);
    }, [])

    useEffect(() => {
        const timeOut = setInterval(() => {
            d3
                .select(selectedSvg.current)
                .select(".trafficLights")
                .remove();

            d3
                .select(selectedSvg.current)
                .append("image")
                .attr("class", "trafficLights")
                .attr(
                    "xlink:href",
                    isPresent ? (percentage < 50 ? redLights : greenLights) : lights
                )
                .attr("width", "135px")
                .attr("x", 65)
                .attr("y", 0);

            setTimeout(() => {
                // eslint-disable-next-line
                isPresent = !isPresent;
            }, 1900);

        }, 2000);
        return () => clearInterval(timeOut);
    }, [percentage]);

    return (
        <svg ref={selectedSvg} className="trafficLights"> </svg>
    )
}
