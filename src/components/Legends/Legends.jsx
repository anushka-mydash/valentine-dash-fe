import React from 'react'
import "./Legends.scss"

export default function Legends({ legendsData }) {

    return (
        <div className="legends__container">
            {legendsData.map((legend, i) =>
                <div className="legend__item" key={i}>
                    <div className="col__box" style={{ background: `${legend.color}` }}></div>
                    <div className="legend__label">{legend.value}</div>
                </div>
            )}
        </div>
    )
}
