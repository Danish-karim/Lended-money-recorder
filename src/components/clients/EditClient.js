import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { compose } from "redux";
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import Spinner from '../layout/spinner';

class EditClient extends Component {
    constructor(props) {
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { client, firestore, history } = this.props;
        const updClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
        }

        firestore.update({ collection: 'clients', doc: client.id }, updClient)
            .then(() => history.push('/'))
    }
    render() {
        const { client } = this.props;
        const { disableBalanceOnEdit}=this.props.settings;
        if (client) {
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
                        <div className="card-header">Edit Client</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <labe htmlFor="firstName">First Name</labe>
                                    <input className="form-control"
                                        type="text"
                                        name="firstName"
                                        minLength="2"
                                        ref={this.firstNameInput}
                                        defaultValue={client.firstName}
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <labe htmlFor="lastName">Last Name</labe>
                                    <input className="form-control"
                                        type="text"
                                        name="lastName"
                                        minLength="2"
                                        ref={this.lastNameInput}
                                        defaultValue={client.lastName}
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <labe htmlFor="email">Email</labe>
                                    <input className="form-control"
                                        type="text"
                                        name="email"
                                        ref={this.emailInput}
                                        defaultValue={client.email}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <labe htmlFor="phone">Phone</labe>
                                    <input className="form-control"
                                        type="text"
                                        name="phone"
                                        minLength="10"
                                        ref={this.phoneInput}
                                        defaultValue={client.phone}
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <labe htmlFor="balance">Balance</labe>
                                    <input className="form-control"
                                        type="text"
                                        name="balance"
                                        ref={this.balanceInput}
                                        defaultValue={client.balance}
                                        disabled={disableBalanceOnEdit}
                                    ></input>
                                </div>
                                <input type="submit" value="submit" className="btn btn-primary btn-block"></input>
                            </form>
                        </div>
                    </div>
                </div>

            )
        } else {
            return <Spinner />
        }
    }
}
EditClient.propTypes = {

    firestore: PropTypes.object.isRequired
}
export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered }, settings }, props) => ({
        client: ordered.client && ordered.client[0],
        settings: settings
    }))
)(EditClient);