import React, {Component} from 'react';
import Modal from '../../components/ui/Modal/modal';
import Aux from '../auxFile.js';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

        state = {
            error : null
        }

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({errors: null});
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error});
            })
        }
        
        componentWillUnmount() {
            console.log("will unmount", this.requestInterceptor, this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error : null});
        } 

        render (){
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );        
        }
    }
}

export default withErrorHandler;