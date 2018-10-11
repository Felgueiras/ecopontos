import logo_mobie from '../../img/contas_externas/mobie.png';
import logo_gira from '../../img/contas_externas/gira.png';

class ExternalAccountsAPI {

  static fetchExternalAccounts() {
    var accounts = [];
    accounts.push({
      thumbnail: logo_gira,
      name: "GIRA",
      description: 'Serviço de bicicletas partilhadas de Lisboa',
      code: 'gira'
    });
    accounts.push({
      thumbnail: logo_mobie,
      name: "MOBI.E",
      description: 'Rede de carregamento inteligente para o abastecimento de veículos elétricos',
      code: 'mobi.e'
    });
    return accounts;
  }
}

export const giraAccount = {
  thumbnail: logo_gira,
  name: "GIRA",
  description: 'Serviço de bicicletas partilhadas de Lisboa',
  code: 'gira'
};

export const logoGira = logo_gira;

export default ExternalAccountsAPI
