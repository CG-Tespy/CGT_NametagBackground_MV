import { convertParameters } from "fenix-tools";

let pluginName = "CGT_NametagBackground_MV";

let rawParams = PluginManager.parameters(pluginName);
export let parsedParams: NaTaBaParams = convertParameters(rawParams);

interface NaTaBaParams
{
    'Graphic Width': number;
    'Graphic Height': number;
    'Graphic Opacity': number;
    'Fit Graphic to Nametag': boolean;
    'Nametag Graphic': string;
    'Graphic X Offset': number;
    'Graphic Y Offset': number;
}
