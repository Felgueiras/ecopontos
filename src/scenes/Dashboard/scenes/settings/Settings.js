import React from "react";
import ExternalAccountsSetup from "../../../Settings/scenes/ExternalAccountsSetup";
import LocationSetup from "../../../Settings/scenes/LocationSetup";
import { Divider } from "@material-ui/core";


const Settings = () => {
  return (
    <div>
      <div className="center">
        <ExternalAccountsSetup dashboard />
        <Divider className="margin-big-both" />
        <LocationSetup />
      </div>
    </div>
  )
}

export default Settings;