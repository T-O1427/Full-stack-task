import React from 'react'


class UserComponent extends React.Component {
    constructor(props) {
        super(props);
        let state = {
            user: {}
        }
    }

    async getUser(userId) {
        let response = {};
        try{
            response = await fetch(`http://localhost:3020/user/${userId}`);
            response = response.json();
        } catch (e) {
            console.log(e);
        }


        this.setState({user: response.data});
        console.log(this.state);
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
                                <input type="text" className="form-control" id="userId" placeholder={'User id'} onChange={(e) => {this.getUser(e.target.value)}} />
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

export default UserComponent;