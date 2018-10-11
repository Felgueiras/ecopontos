import React from 'react';

// logos
import partner1 from '../../../../img/logos_parceiros/hdpi/alticelabs.png'
import partner2 from '../../../../img/logos_parceiros/hdpi/cml.png'
import partner3 from '../../../../img/logos_parceiros/hdpi/ceiia.png'
import partner4 from '../../../../img/logos_parceiros/hdpi/edp.png'
import partner5 from '../../../../img/logos_parceiros/hdpi/emel.png'
import partner6 from '../../../../img/logos_parceiros/hdpi/ist.png'
import partner7 from '../../../../img/logos_parceiros/hdpi/reabilita.png'
import partner8 from '../../../../img/logos_parceiros/hdpi/lisboa_enova.png'
import logoEU from "../../../../img/ilustracoes/splashscreen/uniaoeuropeia_logo.svg";

import { Divider } from '../../../../../node_modules/@material-ui/core';


class About extends React.Component {

  render() {

    const partners = [partner1, partner2, partner3, partner4];
    const partners2 = [partner5, partner6, partner7, partner8];

    function buildRow(input) {
      return (
        <div className="row margin-normal">
          {
            input.map((partner, index) => (
              <div
                className="col-3"
                key={"about_partner_" + index}
              >
                <img src={partner} alt='' style={{
                  maxWidth: '100%',
                  maxHeight: '100%'
                }} />
              </div>
            ))
          }
        </div>
      );
    }


    return (
      <React.Fragment>
        <div className="text-center">
          <p className="text-h2">O projeto Sharing Cities</p>
          <iframe title="video" width="100%" height="auto" src="https://www.youtube.com/embed/TZFWF_2hhjs" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          <p className="margin-normal">Saiba mais sobre o projeto
          <a href="www.123.pt"> Sharing Cities</a>
          </p>
          <img src={logoEU} className="icon-normal" alt="Thumbnail" />
          <p className="text-small">
            Este projeto é financiado pelo programa de pesquisa e inovação European Horizon 2020, ao abrigo da Convenção de Subvenção nº 691895
          </p>
          <Divider className="margin-normal" />
          <p className="text-h2">Parceiros do consórcio</p>
          {buildRow(partners)}
          {buildRow(partners2)}
        </div>
      </React.Fragment>
    );
  }
}

export default About;
