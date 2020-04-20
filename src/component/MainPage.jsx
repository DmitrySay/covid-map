import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import store from '../lib/store';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import KeplerGl from 'kepler.gl';
// Kepler.gl actions
import {addDataToMap} from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
// Sample data
import covidData from '../data/04-16-2020.csv';
import config from '../data/covid-config';
// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
// Component and helpers
import downloadJsonFile from "./File-download";

//const MAPBOX_TOKEN = process.env.MapboxAccessToken;
const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2R2MSIsImEiOiJjazh5cDFzY2Ywa2MyM2V0YWMwbjIyc253In0.zrh-D0UvFa2b-fe2hBToLQ';


class MainPage extends Component {

    constructor(props) {
        super(props);
        this.setStore = this.setStore.bind(this);
    }

    componentDidMount() {
        this.setStore();

    }

    setStore() {
        // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
        const data = Processors.processCsvData(covidData);

        // Create dataset structure
        const dataset = {
            data: data,
            info: {
                // `info` property are optional, adding an `id` associate with this dataset makes it easier
                // to replace it later
                id: 'my_data'
            },

        };

        const options = {
            centerMap: true,
            readOnly: true
        };

        // addDataToMap action to inject dataset into kepler.gl instance
        store.dispatch(addDataToMap({datasets: dataset, option: options, config: config}));

    }

    // This method is used as reference to show how to export the current kepler.gl instance configuration
    // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
    getMapConfig() {
        // retrieve kepler.gl store
        const {keplerGl} = store.getState();
        // retrieve current kepler.gl instance store
        const {map} = keplerGl;

        // create the config object
        return KeplerGlSchema.getConfigToSave(map);
    }

    // This method is used as reference to show how to export the current kepler.gl instance configuration
    // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
    exportMapConfig = () => {
        // create the config object
        const mapConfig = this.getMapConfig();
        // save it as a json file
        downloadJsonFile(mapConfig, 'kepler.gl.json');
    };

    render() {
        return (
            <div style={{position: 'absolute', width: '100%', height: '100%', minHeight: '70vh'}}>
                {/*<Button onClick={this.exportMapConfig}>Export Config</Button>*/}
                <AutoSizer>
                    {({height, width}) => (
                        <KeplerGl
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            id="map"
                            width={width}
                            height={height}
                        />
                    )}
                </AutoSizer>
            </div>
        );
    }
}

export default MainPage;
