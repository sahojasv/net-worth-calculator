export const prepareAssetData = (assets, assetType) => {
  const data = [];

  assets.forEach(asset => {
    if (asset.TypeId === assetType.Id) {
      data.push({
        Type: asset.Name,
        amount: asset.Amount
      });
    }
  });

  return data;
};