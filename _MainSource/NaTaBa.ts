import { parsedParams } from './PluginParams/_PluginParams_Setup';

let nameTagGraphicName = parsedParams["Default Name Tag Graphic"];

export let NaTaBa =
{
    version: "1.01.03",
    params: parsedParams,
    nametagGraphic: ImageManager.loadPicture(nameTagGraphicName),
};