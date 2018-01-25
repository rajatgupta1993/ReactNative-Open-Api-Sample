import { connect } from 'react-redux';
import * as errorActions from '../error/actions';
import * as loaderActions from '../loader/actions';
import OrderAndPosition from './orderAndPosition';

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderAndPosition);
