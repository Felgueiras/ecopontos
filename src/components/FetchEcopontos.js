import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import Papa from 'papaparse'
import { setEcopontos } from '../redux/actions';
import { debug } from 'util';
import MapComponent from './MapComponent';




class FetchEcopontos extends Component {

    kmlArray = []

    state = {
        ready: false
    }

    fetchKml = () => {

        return new Promise((resolve, reject) => {
            const kml = 'https://raw.githubusercontent.com/Felgueiras/ecopontos/master/public/ecopontos.kml';
            axios.get(kml)
                .then(res => {
                    var parser, xmlDoc, elementDoc;
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(res.data, "text/xml");

                    const elements = xmlDoc.getElementsByTagName("coordinates");
                    for (let index = 0; index < elements.length; index++) {
                        const nodeValue = elements[index].childNodes[0].nodeValue;
                        const [lng, lat] = nodeValue.split(',');
                        this.kmlArray.push({ lat: Number(lat), lng: Number(lng) });
                    }
                    resolve();
                })
        })
    }


    fetchCSV = () => {

        let _this = this;


        const csv = 'https://raw.githubusercontent.com/Felgueiras/ecopontos/master/public/ecopontos.csv';
        axios.get(csv)
            .then(res => {
                var data = Papa.parse(res.data);

                for (let index = 1; index < data.data.length - 1; index++) {
                    const nodeValue = data.data[index];
                    let ecoponto = this.kmlArray[index - 1];
                    // ecoponto.info = nodeValue;
                    const [fid, id_ecop, id_via, propriedad, vidrao, papelao, embalao, lixo_geral, oleao, pilhao, dep_roupa, lugar, ano_instal, ano_subs, ano_reforc] = nodeValue;
                    // assign properties

                    const checkYes = (val) => {
                        if (val === 'sim') {
                            return true;
                        }
                        else {
                            return false
                        }
                    }
                    ecoponto.propriedad = propriedad;
                    ecoponto.fid = fid;
                    ecoponto.vidrao = checkYes(vidrao);
                    ecoponto.papelao = checkYes(papelao);
                    ecoponto.embalao = checkYes(embalao);
                    ecoponto.lixo_geral = checkYes(lixo_geral);
                    ecoponto.oleao = checkYes(oleao);
                    ecoponto.pilhao = checkYes(pilhao);
                    ecoponto.dep_roupa = checkYes(dep_roupa);
                }
                _this.props.setEcopontos(this.kmlArray);                
                _this.setState({ ready: true });
            })
    }

    componentDidMount() {

        let _this = this;

        this.fetchKml().then(function (res) {
            _this.fetchCSV();
        });
    }


    render() {
        return (
            <React.Fragment>
                {this.state.ready ? (
                    <MapComponent />
                ) : (
                        <p>A carregar</p>
                    )}
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setEcopontos: ecopontos => dispatch(setEcopontos(ecopontos))
    };
};


export default connect(null, mapDispatchToProps)(FetchEcopontos);
