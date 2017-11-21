import { connect } from 'react-redux';
import Trade from './trade';

// this module handles detail page which has child routing for other modules
// like introduction, ref, portfolio and other, so store is attached here and
// passed down as props to other modules
const mapStateToProps = (store, props) => {
    return {
        ...props.navigation.state.params,
        isLoading: store.loader.isLoading,
    };
};

// using withRouter to fix the issue of react-router-dom v4 not working with the redux container
export default connect(mapStateToProps)(Trade);
