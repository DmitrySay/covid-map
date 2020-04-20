import {useDispatch} from "react-redux";
import React from "react";
import {addDataToMap} from "kepler.gl/actions";
import KeplerGl from "kepler.gl";

function Map() {
    const dispatch = useDispatch();

    const sampleTripData = {
        fields: [
            {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
            {name: 'pickup_longitude', format: '', type: 'real'},
            {name: 'pickup_latitude', format: '', type: 'real'}
        ],
        rows: [
            ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
            ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
            ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576]
        ]
    };

    React.useEffect(() => {
        if (sampleTripData) {
            dispatch(
                addDataToMap({
                    datasets: {
                        info: {
                            label: "COVID-19",
                            id: "covid-19"
                        },
                        data: sampleTripData
                    },
                    option: {
                        centerMap: true,
                        readOnly: false
                    },
                    config: {}
                })
            );
        }
    }, [dispatch, sampleTripData]);

    return (
        <KeplerGl
            id="covid"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}

export default Map;