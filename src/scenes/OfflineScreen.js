import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class OfflineScreen extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div className="container-1 text-center">
                <p>Está offline, só pode continuar depois de ficar online</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineScreen)
