import { connect } from 'react-redux';
import Trade from './trade';


const mapStateToProps = (store, props) => {
    return {
        ...props.navigation.state.params,
        isLoading: store.loader.isLoading,
    };
};

export default connect(mapStateToProps)(Trade);
