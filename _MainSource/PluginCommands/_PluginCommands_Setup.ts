import { NaTaBa } from '../NaTaBa';

type RawCommandFunc = (args: string[]) => any;

let commands: RawCommandFunc[] = 
[
    function SetNametagWidth(args: string[])
    {
        NaTaBa.params["Graphic Width"] = Number(args[0]);
    },

    function SetNametagHeight(args: string[])
    {
        NaTaBa.params["Graphic Height"] = Number(args[0]);
    },

    function SetNametagOpacity(args: string[])
    {
        NaTaBa.params["Graphic Opacity"] = Number(args[0]);
    },

    function SetNametagDynamicSizing(args: string[])
    {
        NaTaBa.params["Fit Graphic to Nametag"] = args[0].toLowerCase() === 'true';
    },

    function SetNametagWidthOffset(args: string[])
    {
        NaTaBa.params["Width Offset"] = Number(args[0]);
    },

    function SetNametagHeightOffset(args: string[])
    {
        NaTaBa.params["Height Offset"] = Number(args[0]);
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