import React from 'react';

import { withRouter } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { BackIcon } from '../../components/AppBarIcons';


const terms = `
<p class="text-center"><b>TERMOS E CONDIÇÕES GERAIS DA APP SHARING CITIES</b></p>
<b>Sobre a App SHARING CITIES</b>

A App SHARING CITIES (“App”) é uma aplicação para promover a adoção de comportamentos sustentáveis através do estabelecimento de um conjunto de benefícios e recompensas ligadas a uma causa comum, criada no âmbito do Projeto Sharing Cities – SHAR LLM (abreviadamente Projeto) do Programa H2020 financiado pela União Europeia ao abrigo do Acordo de Subvenção nº 691895. A App SHARING CITIES funciona como uma ferramenta de informação e de monitorização dos comportamentos dos utilizadores permitindo assim tomar decisões informadas.


<b>Termos e Condições de Utilização e Privacidade (“Termos e Condições”)</b>

<b>Introdução</b>

Ao aceder à App, o Utilizador declara ter lido, compreendido e aceite os Termos e Condições de Utilização e Privacidade abaixo descritos. 

A Altice Labs reserva-se o direito de alterar, adicionar ou excluir parte dos Termos e Condições de Utilização e Privacidade em qualquer momento e sem aviso prévio. 

A Altice Labs não assume qualquer responsabilidade pelo uso da App pelos Utilizadores em desconformidade com os presentes termos e condições. 

Se não concordar com os Termos e Condições não deve utilizar a App.


<b>Direitos de Propriedade</b>

A App SHARING CITIES está protegida pela lei dos Direitos de Propriedade Intelectual sobre os seus conteúdos, sendo a sua reprodução, total ou parcial, expressamente proibida. 

Os textos, design, logos, software, imagens, animações, e outros conteúdos em geral disponibilizados na aplicação, são propriedade Altice Labs, ou usados por esta com a autorização do respetivo proprietário, não podendo ser reproduzidos sem o prévio consentimento da Altice Labs.

O Utilizador não pode transmitir ou publicar qualquer conteúdo que contenha informação de caráter calunioso, difamatório, ilegal ou que viole de qualquer forma os direitos legais (tal como os direitos à privacidade e integridade) de terceiros.

É expressamente proibido efetuar qualquer tipo de engenharia inversa ao software.


<b>Utilização</b>

A App é disponibilizada com a finalidade do Utilizador ter informação que lhe permita monitorizar e adotar comportamentos sustentáveis.

O Utilizador está proibido de fazer uso da App nas seguintes circunstâncias:
- Reproduzir a App;
- Colocar à disposição de terceiros, incluindo ceder, utilizar fora do âmbito das finalidades indicadas, bem como demonstrar, comercializar, licenciar  e/ou de qualquer forma explorar e/ou tentar obter qualquer tipo de proveitos resultantes do uso da App;
- Aceder ao código fonte da App;
- Cancelar, contornar, remover, desativar ou comprometer mecanismos de segurança da App;
- Remover avisos de direitos de autor ou de propriedade, ou marcas comerciais da App;
- Aceder à App através de meios que não os disponibilizados, ou utilizar formas modificadas de software;
- Utilizar a App no âmbito de atividades proibidas por lei ou que impliquem (i) uma violação de direitos de terceiros, (ii) a prática de atos ofensivos da ordem pública ou dos bons costumes, incluindo atos ameaçadores, maldosos, abusivos, assediantes, difamatórios, injuriosos, ordinários, obscenos ou indecentes, (iii) a promoção do ódio, violência ou intolerância racial, política ou religiosa ou (iv) o incentivo, promoção, facilitação ou instrução a outros para praticarem as atividades referidas;
- Utilizar a App para disponibilizar ou transmitir, propositada ou negligentemente, qualquer tipo de material que contenha ou possa conter vírus, worms, defeitos, cavalos de Troia ou outro item ou códigos informáticos, ficheiros ou programas que sejam suscetíveis de interromper, destruir ou limitar a funcionalidade de qualquer equipamento ou sistema informático (hardware ou software) ou equipamento de telecomunicações;
- Praticar quaisquer atos que possam causar danos ou colocar em risco a integridade, continuidade ou qualidade da App, devendo utilizá-la de forma responsável, prudente e cuidadosa;

A Altice Labs reserva-se o direito de fazer cessar, a qualquer momento com aviso prévio mínimo de 8 (oito) dias, a utilização da App, nos seguintes casos:
a)	Cessação da disponibilização da App.
b)	Desrespeito pelas regras de utilização especificadas nos presentes termos e condições.




<b>Responsabilidade</b>

No âmbito dos presentes Termos e Condições, a Altice Labs apenas poderá ser responsabilizada por danos ou prejuízos que lhe sejam diretamente imputáveis, a título de dolo ou culpa grave, não se responsabilizando, nomeadamente, por danos indiretos (tais como perdas de receita, entre outros), por prejuízos extraordinários e/ou por atividades da responsabilidade direta do Utilizador ou de terceiros. 
A utilização da App é por conta e risco do Utilizador.
A Altice Labs não será responsável por eventuais danos ou prejuízos que o Utilizador ou terceiros possam vir a sofrer, nomeadamente na segurança dos sistemas, redes e ou recursos informáticos utilizados, em virtude de informações ou dados disponibilizados ou recebidos através da Internet, de ataques ilícitos de intrusão ou congestão do sistema informático e ou rede, independentemente da tecnologia utilizada pelo Utilizador, bem como em virtude de erros (“bugs”) nos sistemas informáticos do Utilizador. 
São da exclusiva responsabilidade do Utilizador quaisquer danos sofridos ou causados a terceiros pelo uso inadequado ou não autorizado da App. 
A Altice Labs não poderá ser responsabilizada pelo não cumprimento ou cumprimento defeituoso das obrigações por si assumidas, quando tal resulte da ocorrência de uma situação de natureza extraordinária ou imprevisível exterior à Altice Labs e que por ela não possa ser controlada. 
Dada a natureza experimental da App, o Utilizador reconhece e aceita que não é possível garantir um uso contínuo, sem interrupções da App e que podem existir situações em que esta está impossibilitada de funcionar corretamente, conduzindo a uma quebra de utilização e/ou perda e/ou dano de informação residente. 
Cabe também a cada Utilizador adotar as medidas necessárias para manter a confidencialidade do seu Login, palavra-chave e qualquer outra informação confidencial relativa ao acesso à App.



<b>Política de Privacidade</b>

A Altice Labs é a entidade responsável pela recolha e pelo tratamento dos dados pessoais do Utilizador. Os dados pessoais serão tratados no estrito respeito e cumprimento do disposto na legislação de proteção de dados pessoais em vigor em cada momento, nomeadamente o Regulamento (UE) 2016/679 do Parlamento Europeu e do Conselho, de 27 de abril de 2016 (“RGPD”).

A Altice Labs assegura a privacidade dos dados de todos os Utilizadores da App bem como a adoção das medidas técnicas e de segurança adequadas e necessárias à preservação da sua integridade, garantindo ainda que os dados não serão transmitidos nem divulgados a terceiros nem utilizados para quaisquer fins promocionais.

Para aderir à App e criar uma Conta, é solicitada ao Utilizador a disponibilização no Formulário de Adesão dos seguintes dados: género, faixa etária, se vive em Lisboa e se trabalha em Lisboa. Não serão pedidos dados que permitam identificar os Utilizadores da App.

Os dados recolhidos no formulário de adesão e no âmbito da relação com o Utilizador serão tratados pela Altice Labs unicamente para efeitos do processo de criação e gestão da conta na App. Os dados são tratados de forma anónima, para fins estatísticos.

Os dados assinalados com * são de preenchimento obrigatório. A não disponibilização de tais dados impossibilita a conclusão do processo de criação da Conta na App.

Os dados serão conservados pelo prazo de duração do Projeto, findo o qual serão eliminados.

O Utilizador tem o direito de solicitar à Altice Labs o acesso, a retificação, eliminação, a limitação de tratamento dos seus dados pessoais, bem como o direito a retirar o seu consentimento, sem comprometer a licitude do tratamento efetuado com base no consentimento previamente dado e ainda o direito de opor-se ao tratamento dos seus dados pessoais o que poderá ter lugar através do envio de um email para XXX@alticelabs.com. Tem ainda o direito a apresentar uma reclamação junto da autoridade de controlo que é a Comissão Nacional de Proteção de Dados (CNPD).  



<b>Lei aplicável e Foro</b>

Em tudo o que não estiver previsto nos presentes Termos e Condições, será aplicável a Lei Portuguesa.
Para dirimir todos os conflitos emergentes da execução dos presentes Termos e Condições será competente o foro do Tribunal da Comarca de Lisboa com expressa renúncia a qualquer outro.


Copyright © 2018, Altice Labs, S.A.

`


class TermsConditions extends React.Component {

  goBack = () => {
    this.props.history.goBack();
  };

  render() {

    const showAppBar = (this.props.history.location.pathname === "/dashboard/help/terms") ? false : true;
    return (
      <React.Fragment>
        {showAppBar && (
          <AppBar position="static" elevation={0}>
            <Toolbar disableGutters={true}>
              <IconButton
                onClick={this.goBack}
                color="inherit"
                aria-label="Menu">
                <BackIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit" >
                Termos e Condições
            </Typography>
            </Toolbar>
          </AppBar>
        )}
        <p
          dangerouslySetInnerHTML={{ __html: terms }}
          style={{
            textAlign: 'justify',
            whiteSpace: 'pre-line', paddingLeft: '10px',
            paddingRight: '10px'
          }}>
          {/* {terms} */}
        </p>

      </React.Fragment>
    );
  }
}

export default withRouter(TermsConditions);
