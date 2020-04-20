import {applyMiddleware, combineReducers, createStore} from "redux";
import keplerGlReducer from "kepler.gl/reducers";
import {taskMiddleware} from "react-palm/tasks";

// const reducers = combineReducers({
//     keplerGl: keplerGlReducer
// });

const customizedKeplerGlReducer = keplerGlReducer
    .initialState({
        uiState: {
            // hide side panel to disallow user customize the map
            readOnly: true,

            //customize which map control button to show
            mapControls: {
                mapDraw :{
                    active: false
                },

                visibleLayers: {
                    show: false
                },
                mapLegend: {
                    show: false,
                    active: true
                },
                toggle3d: {
                    show: false
                },
                splitMap: {
                    show: false
                }
            }
        }
    });

const reducers = combineReducers({
    keplerGl: customizedKeplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default store;