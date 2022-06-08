import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";

export default function PieChart({ data }) {
    const selectedSvg = useRef(null);

    useEffect(() => {

        const svg = d3.select(selectedSvg.current);
        const chartWidth = 350;
        const chartHeight = 300;
        const radius = Math.min(chartWidth, chartHeight) / 2;

        svg.attr("viewBox", "0 0 350 300")

        const g = svg
            .append("g")
            .attr(
                "transform",
                `translate(${chartWidth / 2}, ${chartHeight / 2})`
            );

        const pie = d3
            .pie()
            .value(function (d) {
                return d.value;
            })
            (data);

        const path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 150);

        const arc = g.selectAll(".arc")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) { return d.data.color; });

        arc.append("text")
            .attr("transform", function (d) {
                const [x, y] = label.centroid(d)
                return `translate(${x - 40},${y})`;
            })
            .attr("font-size", (d) => {
                return d.data.value > 50 ? "60px" : "30px"
            })
            .attr("style", "font-weight:500")
            .attr("fill",
                (d) => {
                    console.log(d.data.color === "#ffd0e4")
                    return d.data.color === "#ffd0e4" ? "#ffd0e4" : "#eee"
                }
            )
            .text(function (d) { return d.data.value + "%"; });

    }, [])
    return (
        <div className="pieChart">
            <svg ref={selectedSvg} width="100%" height="100%"></svg>
        </div >
    )
}
