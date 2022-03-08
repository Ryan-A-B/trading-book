import React from "react"
import { List, Map } from "immutable"
import Entry from "./Entry"

interface Props {
    entries: List<Entry>
}

const QuantityByAssetByLocation: React.FunctionComponent<Props> = ({ entries }) => {
    const quantityByAssetByLocation = React.useMemo(() => {
        return entries.reduce((quantityByAssetByLocation, entry) => {
            return quantityByAssetByLocation.withMutations((quantityByAssetByLocation) => {
                if (entry.quantityTo !== 0) {
                    const quantityByAsset = quantityByAssetByLocation.get(entry.locationTo, Map<string, number>())
                    const quantity = quantityByAsset.get(entry.assetTo, 0) + entry.quantityTo
                    quantityByAssetByLocation.set(entry.locationTo, quantityByAsset.set(entry.assetTo, quantity))
                }
                if (entry.quantityFrom !== 0) {
                    const quantityByAsset = quantityByAssetByLocation.get(entry.locationFrom, Map<string, number>())
                    const quantity = quantityByAsset.get(entry.assetFrom, 0) - entry.quantityFrom
                    quantityByAssetByLocation.set(entry.locationFrom, quantityByAsset.set(entry.assetFrom, quantity))
                }
            })
        }, Map<string, Map<string, number>>())
    }, [entries])
    return (
        <div className="row">
            {quantityByAssetByLocation.map((quantityByAsset, location) => (
                <div className="col-4" key={location}>
                    <div className="card mb-3">
                        <div className="card-header">
                            {location}
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quantityByAsset.map((quantity, asset) => (
                                        <tr key={asset}>
                                            <td>
                                                {asset}
                                            </td>
                                            <td>
                                                {quantity}
                                            </td>
                                        </tr>
                                    )).toList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )).toList()}
        </div>
    )
}

export default QuantityByAssetByLocation