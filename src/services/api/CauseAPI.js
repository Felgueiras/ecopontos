
// images
import cause1 from '../../img/escolas_desafio/manuel_maia.png';
import cause2 from '../../img/escolas_desafio/nuno_goncalves.png';
import cause3 from '../../img/escolas_desafio/olaias.png';

class CauseAPI {

  static fetchCauses() {
    var causes = [];

    causes.push({
      thumbnail: cause1,
      name: "EB23 Manuel da Maia",
      id: "user-guid://school-0",
      address: "school0-wallet"
    });
    causes.push({
      thumbnail: cause2,
      name: "EB23 Nuno Gonçalves",
      id: "user-guid://school-1",
      address: "school1-wallet"
    });
    causes.push({
      thumbnail: cause3,
      name: "EB23 Olaias",
      id: "user-guid://school-2",
      address: "school2-wallet"
    });
    return causes;
  }
}

export default CauseAPI
