import { makeActionCreator } from "../utility/Redux/makeActionCreator";
import { AppConstants } from "../utility/AppConstants";
import axios from 'axios';
import httpStatus from 'http-status';

export const REQUEST_ASSET_TYPES = `REQUEST_ASSET_TYPES`;
export const RECEIVED_ASSET_TYPES = `RECEIVED_ASSET_TYPES`;

export const REQUEST_LIABILITY_TYPES = `REQUEST_LIABILITY_TYPES`;
export const RECEIVED_LIABILITY_TYPES = `RECEIVED_LIABILITY_TYPES`;

export const REQUEST_CALCULATE_NET_WORTH = `REQUEST_CALCULATE_NET_WORTH`;
export const RECEIVED_CALCULATE_NET_WORTH = `RECEIVED_CALCULATE_NET_WORTH`;
export const FAILED_CALCULATE_NET_WORTH = `FAILED_CALCULATE_NET_WORTH`;

export const ADD_ASSET = 'ADD_ASSET';
export const REMOVE_ASSET = `REMOVE_ASSET`;
export const UPDATE_ASSET = `UPDATE_ASSET`;

export const ADD_LIABILITY = `ADD_LIABILITY`;
export const UPDATE_LIABILITY = `UPDATE_LIABILITY`;
export const REMOVE_LIABILITY = `REMOVE_LIABILITY`;

export const addLiability = makeActionCreator(REMOVE_LIABILITY, `liability`);
export const removeLiability = makeActionCreator(REMOVE_LIABILITY, `liability`);
//export const updateLiability = makeActionCreator(UPDATE_LIABILITY, `liability`);

export const addAsset = makeActionCreator(ADD_ASSET, `asset`);
export const removeAsset = makeActionCreator(REMOVE_ASSET, `asset`);
//export const updateAsset = makeActionCreator(UPDATE_ASSET, `asset`);

export const updateAsset = (asset) => (dispatch) => {
  dispatch({
    type: UPDATE_ASSET,
    asset
  });

  dispatch(requestCalculator());
};

export const updateLiability = (liability) => (dispatch) => {
  dispatch({
    type: UPDATE_LIABILITY,
    liability
  });

  dispatch(requestCalculator());
};

export const requestCalculator = () => (dispatch, getState) => {
  const state = getState();
  console.log(state.toJS());
  const assets = state.get(`netWorth`).get(`Assets`);
  const liabilites = state.get(`netWorth`).get(`Liabilites`);
  const payload = {
    Assets: assets.toJS(),
    Liabilites: liabilites.toJS()
  };
  console.log(payload);
  const endpoint = `${AppConstants.CALCULATOR_API}/networth/calculator`;

  dispatch({
    type: REQUEST_CALCULATE_NET_WORTH
  });

  return axios.post(endpoint, JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if(response.status === httpStatus.OK) {
        const res = response.data;

        dispatch({
          type: RECEIVED_CALCULATE_NET_WORTH,
          networth: {
            TotalAssets: res.TotalAssets,
            TotalLiabilites: res.TotalLiabilites,
            NetWorth: res.NetWorth
          }
        });
      } else {
        dispatch({
          type: FAILED_CALCULATE_NET_WORTH
        });
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: FAILED_CALCULATE_NET_WORTH
      });
    });
};