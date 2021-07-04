import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
class AddClients extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newClient = this.state;
        const { firestore, history } = this.props;
        if (newClient.balance === '') {
            newClient.balance = 0;
        }
        firestore.add({ collection: 'clients' }, newClient).then(() => history.push('/'));
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { disableBalanceOnAdd } = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas-fa-arrow-circle-left"></i>Back to Dashboard
                   </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <labe htmlFor="firstName">First Name</labe>
                                <input className="form-control"
                                    type="text"
                                    name="firstName"
                                    minLength="2"
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    required
                                ></input>
                            </div>
                            <div className="form-group">
                                <labe htmlFor="lastName">Last Name</labe>
                                <input className="form-control"
                                    type="text"
                                    name="lastName"
                                    minLength="2"
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    required
                                ></input>
                            </div>
                            <div className="form-group">
                                <labe htmlFor="email">Email</labe>
                                <input className="form-control"
                                    type="text"
                                    name="email"
                                    onChange={this.onChange}
                                    value={this.state.email}
                                ></input>
                            </div>
                            <div className="form-group">
                                <labe htmlFor="phone">Phone</labe>
                                <input className="form-control"
                                    type="text"
                                    name="phone"
                                    minLength="10"
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                    required
                                ></input>
                            </div>
                            <div className="form-group">
                                <labe htmlFor="balance">Balance</labe>
                                <input className="form-control"
                                    type="text"
                                    name="balance"
                                    onChange={this.onChange}
                                    value={this.state.balance}
                                    disabled={disableBalanceOnAdd}

                                ></input>
                            </div>
                            <input type="submit" value="submit" className="btn btn-primary btn-block"></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
AddClients.popTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClients);