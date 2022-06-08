import React, { useEffect, useRef } from 'react'
import * as d3 from "d3";

const colorData = [
    { color: "#FFD0E4", value: 1.5, label: "<10" },
    { color: "#F67AAC", value: 1.5, label: "10-20" },
    { color: "#D81171", value: 1, label: "21-30" },
    { color: "#AC0B57", value: 1.5, label: "30-40" },
    { color: "#AC0B57", value: 4.5, label: "40+" },
];

const percentToDegree = p => p * 360;

const degreeToRadian = d => d * Math.PI / 180;

const percentToRadian = p => degreeToRadian(percentToDegree(p));

class Needle {
    constructor(props) {
        this.svg = props.svg;
        this.group = props.group;
        this.len = props.len;
        this.radius = props.radius;
        this.x = props.x;
        this.y = props.y;
    }

    render(p) {
        this.group = this.group
            .append("g");

        this.group
            .append("circle")
            .attr("class", "c-chart-gauge__needle-base")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("fill", "#3a2530")
            .attr("r", this.radius);

        this.group
            .append("path")
            .attr("class", "c-chart-gauge__needle")
            .attr("fill", "#3a2530")
            .attr("d", this._getPath(p));
    }

    animateTo(p) {
        this.group
            .transition()
            .delay(500)
            .ease(d3.easeElastic)
            .duration(3000)
            .select('path')
            .tween('progress', () => {
                const self = this;
                const lastP = this.lastP || 0;
                return function (step) {
                    const progress = lastP + step * (p - lastP);
                    d3.select(this)
                        .attr('d', self._getPath(progress))
                };
            })
            .on('end', () => this.lastP = p);
    }

    _getPath(p) {
        const thetaRad = percentToRadian(p / 2),
            centerX = 0,
            centerY = 0,
            topX = centerX - this.len * Math.cos(thetaRad) * 1.7,
            topY = centerY - this.len * Math.sin(thetaRad) * 1.7,
            leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2),
            leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2),
            rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2),
            rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);

        return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`;
    }
}

export const GaugeChart = ({ numOfCrushes }) => {
    const selectedSvg = useRef(null);
    const chartWidth = 350;
    const chartHeight = 300;

    useEffect(() => {
        const pieData = d3
            .pie()
            .value((d) => d.value)
            .startAngle((-1 * Math.PI) / 2)
            .endAngle(Math.PI / 2)
            .sort(null)(colorData);

        d3.select(selectedSvg.current).selectAll("*").remove();

        const g = d3
            .select(selectedSvg.current)
            .attr("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
            .append("g")
            .attr(
                "transform",
                "translate(" + chartWidth / 2 + "," + chartHeight / 1.3 + ")"
            );

        const needle = new Needle({
            svg: selectedSvg.current,
            len: (chartHeight / 2) * 0.6,
            radius: (chartHeight / 3) * 0.15,
            x: chartWidth / 2,
            y: chartWidth / 2,
            group: g,
        });
        const radius = 170

        const arcGenerator = d3
            .arc()
            .outerRadius(radius)
            .innerRadius(radius - 50)
            .padAngle(0.02);

        const arc = g
            .selectAll("path")
            .data(pieData, (d) => d);

        arc
            .join("path")
            .attr("d", arcGenerator)
            .attr("fill", (_, i) => colorData[i].color);

        needle.render(0)

        const lessThanTenScale = d3
            .scaleLinear()
            .domain([0, 9])
            .range([0, 0.13]);

        const between10and20 = d3
            .scaleLinear()
            .domain([10, 20])
            .range([0.14, 0.27]);

        const between20and30 = d3
            .scaleLinear()
            .domain([21, 30])
            .range([0.28, 0.41]);

        const between30and40 = d3
            .scaleLinear()
            .domain([31, 40])
            .range([0.42, 0.55]);

        const between40and90 = d3
            .scaleLinear()
            .domain([41, 90])
            .range([0.56, 1]);


        if (numOfCrushes < 10)
            needle.animateTo(lessThanTenScale(numOfCrushes));
        else if (numOfCrushes < 21 && numOfCrushes > 9) {
            needle.animateTo(between10and20(numOfCrushes));
        }
        else if (numOfCrushes < 31 && numOfCrushes > 20) {
            needle.animateTo(between20and30(numOfCrushes));
        }
        else if (numOfCrushes < 41 && numOfCrushes > 30) {
            needle.animateTo(between30and40(numOfCrushes));
        }
        else if (numOfCrushes < 91 && numOfCrushes > 40) {
            needle.animateTo(between40and90(numOfCrushes));
        }
        else {
            needle.animateTo(1);
        }
        // eslint-disable-next-line
    }, [numOfCrushes]);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <svg ref={selectedSvg} width="100%"></svg>
        </div>
    );
};