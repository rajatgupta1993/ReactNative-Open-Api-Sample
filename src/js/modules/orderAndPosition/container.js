import { connect } from 'react-redux';
import * as errorActions from '../error/actions';
import * as loaderActions from '../loader/actions';
import OrderAndPosition from './orderAndPosition';

// this module handles detail page which has child routing for other modules
// like introduction, ref, portfolio and other, so store is attached here and
// passed down as props to other modules
const mapStateToProps = (store, props) => {
    return {
        accessToken: store.userInfo.accessToken,
        isLoading: store.loader.isLoading,
        ...props.navigation.state.params,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideError: () => dispatch(errorActions.hideError()),
        showError: () => dispatch(errorActions.showError()),
        hideLoader: () => dispatch(loaderActions.hideLoader()),
        showLoader: () => dispatch(loaderActions.showLoader()),
        setErrMessage: (msg) => dispatch(errorActions.setErrorMessage(msg)),
    };
};

// using withRouter to fix the issue of react-router-dom v4 not working with the redux container
export default connect(mapStateToProps, mapDispatchToProps)(OrderAndPosition);
