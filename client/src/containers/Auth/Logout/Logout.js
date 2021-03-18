import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Logout extends Component {
    componentDidMount = () => {
        this.props.onLogout()
    }
    render () {
        return (
            <Redirect to="/auth"/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null,mapDispatchToProps)(Logout))