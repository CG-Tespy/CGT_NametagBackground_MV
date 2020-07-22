import { convertParameters } from "fenix-tools";

let pluginName = "CGT_NametagBackground_MV";

let rawParams = PluginManager.parameters(pluginName);
export let parsedParams: NaTaBaParams = convertParameters(rawParams);

console.log(parsedParams);

interface NaTaBaParams
{
    'Graphic Width': number;
    'Graphic Height': number;
    'Graphic Opacity': number;
    'Fit Graphic to Nametag': boolean;
    'Width Offset': number;
    'Height Offset': number;
    'Default Name Tag Graphic': string;
    'Graphic X Offset': number;
    'Graphic Y Offset': number;
}



