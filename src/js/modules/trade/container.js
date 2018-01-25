import { connect } from 'react-redux';
import * as errorActions from '../error/actions';
import * as loaderActions from '../loader/actions';
import SearchInstrument from './searchInstrument';

const mapStateToProps = (store) => {
    return {
        accessToken: store.userInfo.accessToken,
        isLoading: store.loader.isLoading,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchInstrument);
