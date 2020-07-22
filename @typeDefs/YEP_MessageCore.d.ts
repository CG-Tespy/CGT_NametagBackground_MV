// Only to be used for the development of this plugin; this is far from a proper
// type definitions file for any of Yanfly's work.
declare class Window_NameBox extends Window_Base
{
    nameText: string; 
    // ^ These were added to the class through aliasing
    refresh(text: string, position: PIXI.Point | PIXI.ObservablePoint): string;

    DisplayedNewName: CGT.Core.Utils.Event;
    ShowedUp: CGT.Core.Utils.Event;
    Deactivated: CGT.Core.Utils.Event;
}

declare namespace Yanfly
{
    let nameWindow: Window_NameBox;
    let Param:
    {
        MSGNameBoxClear: boolean
    };
}