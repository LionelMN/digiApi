import React from 'react';

import axios from 'axios';
import './digiList.css'

export default class DigiList extends React.Component {
    state = {
        digimons: [],
        digimonFiltered: []
    }

    componentDidMount() {
        axios.get(`https://digimon-api.vercel.app/api/digimon`)
            .then(res => {
                let digimons = res.data;
                digimons = digimons.filter( digi => digi.name !== "Magnamon")
                const magnamon = {
                    img : "https://digimon.shadowsmith.com/img/magnamon.jpg",
                    name : "Magnamon",
                    level : "Armor"
                }
                digimons.push(magnamon)
                this.setState({
                    digimons,
                    digimonFiltered : digimons
                })
            })
    }

    filterDigimon(level) {
        if(level !== "any"){
            const digimonFiltered = this.state.digimons.filter(digi => digi.level === level);
            this.setState({digimonFiltered})
        } else {
            this.setState({digimonFiltered : this.state.digimons})
        }
    }

    render(){
        return(
            <div className="container">
                <div className="buttons">
                    <div className="button" onClick = { () => this.filterDigimon('any')}>Show All</div>
                    <div className="button" onClick = { () => this.filterDigimon('Fresh')}>Fresh Level</div>
                    <div className="button" onClick = { () => this.filterDigimon('In Training')}>In Training Level</div>
                    <div className="button" onClick = { () => this.filterDigimon('Rookie')}>Rookie Level</div>
                    <div className="button" onClick = { () => this.filterDigimon('Champion')}>Champion Level</div>
                    <div className="button" onClick = { () => this.filterDigimon('Ultimate')}>Ultimate Level</div>
                    <div className="button" onClick = { () => this.filterDigimon('Mega')}>Mega Level</div>
                    <div className="button" onClick = { () => this.filterDigimon('Armor')}>Armor Level</div>
                </div>
                <div className="digiList">
                    {this.state.digimonFiltered.map(digimon =>
                        <div className="digimon" key={digimon.name}>
                            <div><img src={digimon.img} alt={digimon.name}></img></div>
                            <div>{digimon.name}</div>
                            <div>{digimon.level}</div>
                        </div>
                        )}
                </div>
            </div>
        )
    }
}
