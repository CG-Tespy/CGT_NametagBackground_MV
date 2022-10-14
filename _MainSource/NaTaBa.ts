import { parsedParams } from './PluginParams/_PluginParams_Setup';

let nameTagGraphicName = parsedParams["Nametag Graphic"];

export let NaTaBa =
{
    version: "1.02.03",
    params: parsedParams,
    nametagGraphic: ImageManager.loadPicture(nameTagGraphicName),
    Events:
    {
        WidthChanged: new CGT.Core.Utils.Event(2),
        HeightChanged: new CGT.Core.Utils.Event(2),
        OpacityChanged: new CGT.Core.Utils.Event(2),
        GraphicChanged: new CGT.Core.Utils.Event(2),
        XOffsetChanged: new CGT.Core.Utils.Event(2),
        YOffsetChanged: new CGT.Core.Utils.Event(2),
    },

    isActive: true,

    yanflyNameWindow: null,

};