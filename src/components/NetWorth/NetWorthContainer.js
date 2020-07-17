import { connect } from 'react-redux';
import NetWorth from './NetWorth';
import { updateAsset, updateLiability } from '../../actions/NetWorth';

const mapStateToProps = (state) => {
  const networth = state.get(`netWorth`);
 
  return {
    assets: networth.get(`Assets`).toJS(),
    assetTypes: networth.get(`AssetTypes`).toJS(),
    liabilites: networth.get(`Liabilites`).toJS(),
    liabilityTypes: networth.get(`LiabilityTypes`).toJS(),
    networth: networth.get(`NetWorth`)
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateAsset: (asset) => dispatch(updateAsset(asset)),
  updateLiability: (liability) => dispatch(updateLiability(liability))
});

const NetWorthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NetWorth);

export default NetWorthContainer;