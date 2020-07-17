import { createReducer } from "../utility/Redux/createReducer";
import { fromJS } from "immutable";
import {
  ADD_ASSET,
  ADD_LIABILITY,
  REMOVE_LIABILITY,
  RECEIVED_CALCULATE_NET_WORTH,
  RECEIVED_ASSET_TYPES,
  RECEIVED_LIABILITY_TYPES,
  REMOVE_ASSET,
  UPDATE_LIABILITY,
  UPDATE_ASSET,
} from "../actions/NetWorth";


const removeAssetHandler = (state, { asset }) => {
  const currentAssets = state.get(`Assets`).toJS();

  const found = currentAssets.findIndex(currentAsset => currentAsset.Name = asset);

  currentAssets.splice(found, 1);

  return state.set(`Assets`, fromJS(currentAssets));
};

const addAssetHandler = (state, { asset }) => {
  const currentAssets = state.get(`Assets`).toJS();
  currentAssets.push(asset);

  return state.set(`Assets`, fromJS(currentAssets));
};

const removeLiabilityHandler = (state, { liability }) => {
  const currentLiabilities = state.get(`Liabilities`).toJS();

  const found = currentLiabilities.findIndex(currentLiability => currentLiability.Name = liability);

  currentLiabilities.splice(found, 1);

  return state.set(`Liabilities`, fromJS(currentLiabilities));
};

const addLiabilityHandler = (state, { liability }) => {
  const currentLiabilities = state.get(`Liabilities`).toJS();
  currentLiabilities.push(liability);

  return state.set(`Liabilities`, fromJS(currentLiabilities));
};

const receivedCalculateHandler = (state, { networth }) => state.set(`NetWorth`, fromJS(networth));
const receivedAssetTypesHandler = (state, { assetTypes }) => state.set(`AssetTypes`, fromJS(assetTypes));
const receivedLiabilityTypesHandler = (state, { liabilityTypes }) => state.set(`LiablityTypes`, fromJS(liabilityTypes));

const updateAssetHandler = (state, { asset }) => {
  const currentAssets = state.get(`Assets`).toJS();
  const index = currentAssets.findIndex(rec => rec.Name === asset.Name);
  currentAssets[index] = asset;

  return state.set(`Assets`, fromJS(currentAssets));
};

const updateLiabilityHandler = (state, { liability }) => {
  const currentLiabilites = state.get(`Liabilites`).toJS();

  const index = currentLiabilites.findIndex(rec => rec.Name === liability.Name);
  currentLiabilites[index] = liability;

  return state.set(`Liabilites`, fromJS(currentLiabilites));
};

export const netWorthReducer = createReducer(null, {
  [ADD_ASSET]: addAssetHandler,
  [REMOVE_ASSET]: removeAssetHandler,
  [UPDATE_ASSET]: updateAssetHandler,
  [ADD_LIABILITY]: addLiabilityHandler,
  [REMOVE_LIABILITY]: removeLiabilityHandler,
  [UPDATE_LIABILITY]: updateLiabilityHandler,
  [RECEIVED_CALCULATE_NET_WORTH]: receivedCalculateHandler,
  [RECEIVED_ASSET_TYPES]: receivedAssetTypesHandler,
  [RECEIVED_LIABILITY_TYPES]: receivedLiabilityTypesHandler,
});