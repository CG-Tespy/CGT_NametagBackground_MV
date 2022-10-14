
import { pluginName } from "../Shared/Shared";
import { ZPositioning } from "../Structures/ZPositioning";

let rawParams = PluginManager.parameters(pluginName);

let paramNames = 
{
    GraphicWidth: 'Graphic Width',
    GraphicHeight: 'Graphic Height',
    GraphicOpacity: 'Graphic Opacity',
    FitGraphicToNametag: 'Fit Graphic to Nametag',
    NametagGraphic: 'Nametag Graphic',
    GraphicXOffset: 'Graphic X Offset',
    GraphicYOffset: 'Graphic Y Offset',
    ZPositioning: 'Z Positioning',
};

export let parsedParams = GetParsedParams();

function GetParsedParams()
{
    let parsedParams: NaTaBaParams = 
    {
        'Graphic Width': Number(rawParams[paramNames.GraphicWidth]) || 100,
        'Graphic Height': Number(rawParams[paramNames.GraphicHeight]) || 100,

        'Graphic Opacity': Number(rawParams[paramNames.GraphicOpacity]) || 192,

        'Fit Graphic to Nametag': rawParams[paramNames.FitGraphicToNametag] === 'true',

        'Nametag Graphic': rawParams[paramNames.NametagGraphic],

        'Graphic X Offset': Number(rawParams[paramNames.GraphicXOffset]) || 0,
        'Graphic Y Offset': Number(rawParams[paramNames.GraphicYOffset]) || 0,

        'Z Positioning': rawParams[paramNames.ZPositioning] || ZPositioning.Behind,
    };

    return parsedParams;
}

interface NaTaBaParams
{
    'Graphic Width': number;
    'Graphic Height': number;

    'Graphic Opacity': number;

    'Fit Graphic to Nametag': boolean;

    'Nametag Graphic': string;

    'Graphic X Offset': number;
    'Graphic Y Offset': number;

    'Z Positioning': ZPositioning;
}


