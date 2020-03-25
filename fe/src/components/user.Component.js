import React from 'react'


class UserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.defaultUser = {};
        this.defaultAlbum = {};
        this.state = {
            user: {},
            album: {}
        };
        this.getUser = this.getUser.bind(this);
    }

    async getUser(userId) {
        let response = {};
        try {
            response = await fetch(`http://localhost:3020/user/${userId}`);
            response = await response.json();
            this.setState({user: response});
        } catch (e) {
            console.log(e);
            this.setState({user: this.defaultUser});
        }
    }

    async getAlbum(userId, albumId) {
        let response = {};
        try {
            response = await fetch(`http://localhost:3020/user/${userId}/albums/${albumId}`);
            response = await response.json();
            this.setState({album: response});
        } catch (e) {
            console.log(e);
            this.setState({album: this.defaultAlbum});
        }
    }

    async loanAlbum(userId, albumId, username, date) {
        let response = {};
        try {
            let loan = {
                userName: username,
                date: date
            };
            let response = await fetch(`http://localhost:3020/user/${userId}/albums/${albumId}/loan`, {
                method: 'POST',
                body: JSON.stringify(loan)
            });
                response = await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    renderUser() {
        if (this.state.user && Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object) {
            return this.renderUserNotFound();
        } else {
            return this.renderUserDetails();
        }
    }

    renderUserDetails() {
        return (<div>
            <div className={'row justify-content-md-center'}>
                <div className={'col-6 col-offset-3'}>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-5 col-form-label">User id</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" readOnly id="userId"
                                       placeholder={'User id'} value={this.state.user.id}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="staticEmail" className="col-sm-5 col-form-label">User name</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" readOnly id="userId"
                                       placeholder={'User name'} value={this.state.user.name}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className={'row justify-content-md-center'}>
                <div className={'col-6'}>
                    <h3>Albums</h3>
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderAlbums(this.state.user.id, this.state.user.albums)}
                        </tbody>
                    </table>
                </div>
                <div className={'col-6'}>
                    {this.renderAlbumDetails(this.state.album)}
                </div>
            </div>
        </div>);
    }

    renderUserNotFound() {
        return (<div className={'row justify-content-md-center'}>
            <h1>Please try again. User not found</h1>
        </div>);
    }

    renderAlbumDetails(album) {
        return (
            <div>
            <h3>Album details</h3>
                <form>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">id</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" readOnly id="albumId"
                                   placeholder={'Album id'} value={this.state.album.id}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" readOnly id="albumName"
                                   placeholder={'Album name'} value={this.state.album.name}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Artist</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" readOnly id="albumArtist"
                                   placeholder={'Album artist'} value={this.state.album.artist}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Year</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" readOnly id="albumYear"
                                   placeholder={'Album year'} value={this.state.album.year}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Number of tracks</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" readOnly id="albumYear"
                                   placeholder={'Album year'} value={this.state.album.numberOfTracks}/>
                        </div>
                    </div>
                </form>
                <h4>Loans</h4>
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User name</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderLoans(this.state.user.id, this.state.album.id, this.state.album.loans)}
                    </tbody>
                </table>
            </div>

        )
    }

    renderAlbums(userId, albums) {
        console.log(albums);
        if (Array.isArray(albums) && albums.length > 0) {
            let trs = [];

            // Outer loop to create parent
            for (let i = 0; i < albums.length; i++) {
                trs.push(<tr key={i} onClick={async (e) => {
                    await this.getAlbum(userId, albums[i].id)
                }}>
                    <td>{i}</td>
                    <td>{albums[i].id}</td>
                    <td>{albums[i].name}</td>
                </tr>)
            }
            return trs;
        } else {
            return(<h4>No albums found</h4>)
        }
    }

    renderLoans(userId, albumId, loans) {
        console.log(loans);
        if (Array.isArray(loans) && loans.length > 0) {
            let trs = [];

            // Outer loop to create parent
            for (let i = 0; i < loans.length; i++) {
                trs.push(<tr key={i} onClick={async (e) => {
                    await this.getAlbum(userId, loans[i].id)
                }}>
                    <td>{i}</td>
                    <td>{loans[i].userName}</td>
                    <td>{loans[i].date}</td>
                </tr>)
            }
            return trs;
        } else {
            return(<tr>
                    <td><button className="btn btn-primary" onClick={() => {this.loanAlbum(userId, albumId, 'bla', 'lalal')}}>Loan</button></td>
                    <td><input type="text" className="form-control" id="albumName"
                               placeholder={'User name'} /></td>
                    <td><input type="date" className="form-control" id="albumName"
                               placeholder={'Date of return'} /></td>
                </tr>
            )
        }
    }

    render() {
        console.log('User component rendering starting');
        return (
            <div className={'container'}>
                <div className={'row justify-content-md-center'}>
                    <div className={'col-6 col-offset-3'}>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">User id/name</label>
                                <div className="col-sm-7">
                                    <input type="text" className="form-control" id="userId" placeholder={'User id'}
                                           onChange={async (e) => {
                                               await this.getUser(e.target.value)
                                           }}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {this.renderUser()}
                <style jsx={'true'}>{`
     .hidden { display:none; }
    `}</style>
            </div>
        );
    }
}

export default UserComponent;