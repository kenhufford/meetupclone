import { connect } from 'react-redux';
import HeaderSearch from './header_search';

const mapStateToProps = (state) => {
  return {
    query: ""
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
