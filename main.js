import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import LayerGroup from 'ol/layer/Group'
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS'
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Circle, Fill, Stroke} from 'ol/style';

import LayerSwitcher, {GroupLayerOptions} from 'ol-layerswitcher';

const OSMLayer = new TileLayer({
    source: new OSM(),
    type: 'base',
    visible: 'true'
})

const LCMosaicSource = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:CO_NLCD',
        'TILED': true,
        'VERSION': '1.1.1',
    }
})

const W3MosaicSource = new TileWMS({
    url: 'https://geo.spatstats.com/geoserver/CO_LD_Map/wms',
    params: {'LAYERS': 'CO_LD_Map:COForestFragW3',
        'TILED': true,
        'VERSION': '1.1.1',
    }
})

let layerSwitcher = new LayerSwitcher({
    reverse: true,
    groupSelectStyle: 'group'
})

const LCMosaicMap = new TileLayer({
    title: 'Colorado Land Cover',
    attribution: "Robert Ross Wardrup",
    visible: false,
    source: LCMosaicSource,
})

const W3MosaicMap = new TileLayer({
    title: 'Forest Fragmentation',
    attribution: "Robert Ross Wardrup",
    visible: true,
    source: W3MosaicSource,
})

const LCMaps = new LayerGroup({
    title: "Land Cover",
    layers: [LCMosaicMap, W3MosaicMap]
})

const map = new Map({
    target: 'map',
    layers: [OSMLayer, LCMaps],
    view: new View({
        center: [-11754222,4728294],
        zoom: 7,
    })
});

map.setView(new View({
    center: map.getView().getCenter(),
    extent: map.getView().calculateExtent(map.getSize()),
    zoom: 7
}))

map.addControl(layerSwitcher);

LayerSwitcher.forEachRecursive(map, function (l, idx, a) {
    console.log(l);
    // Determine if layer is visible and, if so, make the slider point to it (if it's a forestfrag object)
})

function displayLegend(layer_name) {
    // Display legend depending on layer

    document.getElementById("map-legend").innerHTML = "";

    if (layer_name === "Forest Fragmentation") {
        document.getElementById('map-legend').innerHTML =
            "<table class=\"styled-legend\">\n" +
            "    <thead>\n" +
            "      <tr><th colspan='3' class='table-title'>Legend</th></tr>" +
            "        <tr>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "        </tr>" +
            "    </thead>\n" +
            "    <tbody>\n" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='patch_square'</td>\n" +
            "            <td>Patch</td>" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='transitional_square'></td>\n" +
            "            <td>Transitional</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='edge_square'</td>\n" +
            "            <td>Edge</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='perforated_square'</td>\n" +
            "            <td>Perforated</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='interior_square'</td>\n" +
            "            <td>Interior</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='undetermined_square'</td>\n" +
            "            <td>Undetermined</td>\n" +
            "            <td></td>" +
            "        </tr>" +
        "        </tr>\n" +
        "    </tbody>\n" +
        "</table>"
    }

    else if (layer_name === "Colorado Land Cover") {
        document.getElementById('map-legend').innerHTML =
            "<table class=\"styled-legend\">\n" +
            "    <thead>\n" +
            "      <tr><th colspan='3' class='table-title'>Legend</th></tr>" +
            "        <tr>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "            <th></th>\n" +
            "        </tr>" +
            "    </thead>\n" +
            "    <tbody>\n" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='patch_square'</td>\n" +
            "            <td>Patch</td>" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='transitional_square'></td>\n" +
            "            <td>Transitional</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='edge_square'</td>\n" +
            "            <td>Edge</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='perforated_square'</td>\n" +
            "            <td>Perforated</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='interior_square'</td>\n" +
            "            <td>Interior</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        <tr class=\"active-row\">\n" +
            "            <td><hr class='undetermined_square'</td>\n" +
            "            <td>Undetermined</td>\n" +
            "            <td></td>" +
            "        </tr>" +
            "        </tr>\n" +
            "    </tbody>\n" +
            "</table>"
    }

}

window.onload = function () {
    const dates = ['2001-01-01T00:00:00.000Z', '2004-01-01T00:00:00.000Z', '2006-01-01T00:00:00.000Z',
        '2008-01-01T00:00:00.000Z', '2011-01-01T00:00:00.000Z', '2013-01-01T00:00:00.000Z', '2016-01-01T00:00:00.000Z']
    const sliderRange = document.getElementById('yearRange');
    sliderRange.max = dates.length - 1;
    sliderRange.value="6";

    const dateValue = document.getElementById('date_value');
    dateValue.innerHTML = dates[sliderRange.value].slice(0, 10).substring(0,4)
    W3MosaicMap.getSource().updateParams({'TIME': dates[this.value]});
    LCMosaicMap.getSource().updateParams({'TIME': dates[this.value]});

    sliderRange.oninput = function () {
        dateValue.innerHTML = dates[sliderRange.value].slice(0, 10).substring(0,4)
        console.log(dates[this.value].slice(0, 10));
        W3MosaicMap.getSource().updateParams({'TIME': dates[this.value]});
        LCMosaicMap.getSource().updateParams({'TIME': dates[this.value]});
    }

    if (document.addEventListener) {
        document.addEventListener("click", function(event) {
            let targetElement = event.target || event.srcElement;
            let clicked_element = targetElement.innerText

            // Determine when user selects a layer item
            if (clicked_element === "Forest Fragmentation" || clicked_element === "Colorado Land Cover") {
                console.log("Clicked and element");
                displayLegend(clicked_element);
            }
        })
    }
}
