﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Logout } from './Logout';

var i = 0;

export class CurrentUser extends React.Component<RouteComponentProps<{}>, FetchDataAboutUsers> {


    constructor() {
        super();
        this.state = {
            users: {
                id: 0,
                firstname: "",
                lastname: "",
                phone: "",
                password: "",
                login: "",
                surname: "",
                pesel: "",
                email : ""
            },
            loading: true,
            currentEdition: ""
        };
        this.changeModalContext = this.changeModalContext.bind(this);
        this.saveModalContext = this.saveModalContext.bind(this);
        this.renderGuestTable = this.renderGuestTable.bind(this);
    }

    componentDidMount() {
        this.httpGetAsync();
    }


    private httpGetAsync() {
        var xhr = new XMLHttpRequest();
        var json_obj, status = false;
        var self = this;

        xhr.open("POST", "api/user/get-current", true);

        xhr.onreadystatechange = function () {

            if (xhr.responseText == "Unauthorized session") {
                window.location.replace("login");
            }
            var data = JSON.parse(xhr.responseText);

         
            self.setState({
                users: data[0],
                loading: false
            });

        }

        xhr.send();

    }



    //      .then(response =>  response.json() as Promise<User[]>)


    private static deleteGuest(z: any) {

        var id = z.target.id;
        console.log(id);
        var request = new XMLHttpRequest();
        request.open('POST', '/api/user/delete', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(parseInt(id));
        z.target.parentElement.parentNode.remove();

        request.onload = () => {
            alert(request.responseText);
        }
    }

    private changeModalContext(event: any) {

        var oldValue = event.target.parentElement.firstChild.innerHTML;

        var element = document.getElementById("propertyToChange") as HTMLInputElement;
        element.setAttribute("placeholder", oldValue);
        this.setState({
           currentEdition: event.target.id 
    })

}

    private  saveModalContext(event: any) {
    var value = document.getElementById("propertyToChange") as HTMLInputElement;

        var request = new XMLHttpRequest();

        request.open('POST', '/api/user/change-' + this.state.currentEdition, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({ "property": value.value }));






        this.httpGetAsync();

}



    public render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : this.renderGuestTable(this.state.users);

    return <div>
        <h3>Your information</h3>
        {contents}
        <Logout />
    </div>;
}



    private renderGuestTable(users: User) {
    return <div>
        {
            <div className="panel panel-info" key={this.state.users.id} >
                <div className="panel-heading">
                    <h3 className="panel-title"><b>{this.state.users.login}</b></h3>
                </div>
                <div className="col-md-2 col-lg-2 userImage">
                    <img alt="User Pic" src="https://kazut.pl/wp-content/themes/Aether/library/img/default-image.jpg" className="img-circle img-responsive" />
                </div>
                <div className=" col-md-9 col-lg-9 ">
                    <table className="table table-user-information">
                        <tbody>
                            <tr>
                                <td>Firstname:</td>
                                <td>
                                    <span id="userName">{this.state.users.firstname}</span>
                                    <button data-toggle="modal" onClick={this.changeModalContext}
                                        data-target="#exampleModal" id="firstname" className="btn glyphicon glyphicon-pencil"></button>
                                </td>

                            </tr>
                            <tr>
                                <td>Lastname:</td>
                                <td>{this.state.users.lastname}</td>
                            </tr>
                            <tr>
                                <td>Surname</td>
                                <td>{this.state.users.surname}</td>
                            </tr>

                            <tr>
                                <td>Pesel</td>
                                <td>{this.state.users.pesel}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{this.state.users.phone}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.users.email}</td>
                            </tr>

                        </tbody>
                    </table>

                    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Editing your account information</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body">
                                        <input className="form-control" type="text" name="toChange" id="propertyToChange" placeholder="xD" />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" name="modalButton" onClick={this.saveModalContext} className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>;

}
}

interface User {
    id: number,
    firstname: string,
    lastname: string,
    surname: string,
    pesel: string,
    phone: string,
    email: string,
    password: string,
    login: string

}

interface FetchDataAboutUsers {
    users: User,
    loading: boolean,
    currentEdition: string
}



