import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConfirmationDialog from "./ConfirmationDialog";
import { setPermission, setPosition } from "../../../redux/actions";
import FeedbackDialog from "./FeedbackDialog";

import errorIcon from '../../../img/emoticon/sad_face.svg'
import { StringUtils } from "../../../utils/StringUtils";


class LocationPermissionDialog extends React.Component {

  state = {
    permissionErrDialog: false,
    warning: false
  }

  render() {
    const { image, open, close, setPermission, setPosition } = this.props;
    let _this = this;

    const closePermission = (next = false) => {
      const { warning } = this.state;

      if (warning) {
        close(false);
        _this.setState({ warning: false });
      }
      else {
        if (next) {
          navigator.geolocation.getCurrentPosition(function (pos) {
            const newPosition = pos.coords;
            setPosition({
              lat: newPosition.latitude,
              lng: newPosition.longitude
            })
            console.log('Geolocation permissions granted');
            setPermission('location', true);
            close(next);
          },
            function (error) {
              if (error.code == error.PERMISSION_DENIED) {
                _this.setState({ permissionErrDialog: true })
              }
            }
          );

        }
        else {
          _this.setState({
            warning: true,
            main: 'Sem autorização GPS',
            message: 'Se não autorizar o acesso à localização, fica impossibilitado de ganhar pontos através de check-in e de usufruir de bónus.',
            positiveAction: 'Entendido'
          });
        }
      }
    };

    const { main, message, positiveAction, warning } = this.state;

    return (
      <div>
        <ConfirmationDialog
          showNegative
          image={warning? undefined: image}
          close={closePermission}
          open={open || false}
          main={warning ? main : "Permissões de localização"}
          message={warning ? message : "Para ver o mapa/lojas autorize o acesso aos seus dados de localização."}
          positiveAction={warning ? positiveAction : StringUtils.appLocationAuthorize}
          negativeAction={warning ? '' : 'Cancelar'}
        />
        <FeedbackDialog
          image={errorIcon}
          close={() => this.setState({ permissionErrDialog: false })}
          open={this.state.permissionErrDialog}
          main={"Ups"}
          message={"Detetámos que negou o acesso à localização.<br></br>Para a ativar novamente siga <a href='https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DAndroid&oco=1'>estas instruções</a>"}
          buttonLabel={"Ok"}
        />
      </div>
    );
  }
}



LocationPermissionDialog.propTypes = {
  image: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
}



const mapDispatchToProps = dispatch => {
  return {
    setPermission: (permission, authorization) => dispatch(setPermission({ permission, authorization })),
    setPosition: position => dispatch(setPosition(position))


  };
};

export default connect(null, mapDispatchToProps)(LocationPermissionDialog);

