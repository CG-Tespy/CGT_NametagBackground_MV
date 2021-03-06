import { NaTaBa } from '../NaTaBa';

type RawCommandFunc = (args: string[]) => any;

let commands: RawCommandFunc[] = 
[
    function CGT_NaTaBa_SetNametagWidth(args: string[])
    {
        let oldWidth = NaTaBa.params["Graphic Width"];
        let newWidth = Number(args[0]);
        NaTaBa.params["Graphic Width"] = newWidth;
        NaTaBa.Events.WidthChanged.Invoke(oldWidth, newWidth);
    },

    function CGT_NaTaBa_SetNametagHeight(args: string[])
    {
        let oldHeight = NaTaBa.params["Graphic Height"];
        let newHeight = Number(args[0]);
        NaTaBa.params["Graphic Height"] = newHeight;
        NaTaBa.Events.HeightChanged.Invoke(oldHeight, newHeight);
    },

    function CGT_NaTaBa_SetNametagOpacity(args: string[])
    {
        let oldOpacity = NaTaBa.params["Graphic Opacity"];
        let newOpacity = Number(args[0]);
        NaTaBa.params["Graphic Opacity"] = newOpacity;
        NaTaBa.Events.OpacityChanged.Invoke(oldOpacity, newOpacity);
    },

    function CGT_NaTaBa_SetFitGraphicToNametag(args: string[])
    {
        NaTaBa.params["Fit Graphic to Nametag"] = args[0].toLowerCase() === 'true';
    },

    function CGT_NaTaBa_SetNametagGraphic(args: string[])
    {
        let oldGraphicName = NaTaBa.params["Nametag Graphic"];
        let newGraphicName = args[0];
        NaTaBa.params["Nametag Graphic"] = newGraphicName;
        NaTaBa.nametagGraphic = ImageManager.loadPicture(newGraphicName);
        NaTaBa.Events.GraphicChanged.Invoke(oldGraphicName, newGraphicName);
        // ^ The namebox should respond to this so the graphic change
        // is shown to the player
    },

    function CGT_NaTaBa_SetGraphicXOffset(args: string[])
    {
        let oldXOffset = NaTaBa.params["Graphic X Offset"];
        let newXOffset = Number(args[0]);
        NaTaBa.params["Graphic X Offset"] = newXOffset;
        NaTaBa.Events.XOffsetChanged.Invoke(oldXOffset, newXOffset);
    },

    function CGT_NaTaBa_SetGraphicYOffset(args: string[])
    {
        let oldYOffset = NaTaBa.params["Graphic X Offset"];
        let newYOffset = Number(args[0]);
        NaTaBa.params["Graphic Y Offset"] = newYOffset;
        NaTaBa.Events.YOffsetChanged.Invoke(oldYOffset, newYOffset);
    },

];

GetCommandsRegistered();

function GetCommandsRegistered()
{
    let RegisterCommand = CGT.Core.PluginCommands.Register;

    for (let pluginCommand of commands)
    {
        let commandName = pluginCommand.name;
        RegisterCommand(commandName, pluginCommand);
    }
}