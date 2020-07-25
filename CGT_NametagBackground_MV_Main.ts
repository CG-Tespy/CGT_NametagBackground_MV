/*:

@plugindesc Lets you use a whole image as a texture for the background graphic of a nametag, instead of having it draw from a window.png.

@author CG-Tespy https://github.com/CG-Tespy

@help This is version 1.01.03 of this plugin. This relies on the YEP_MessageCore and
CGT_CoreEngine (v1.01.03+) plugins.

Other contributors:
FeniXTools - FeniXEngine Contributors

If you want to edit this plugin, you may be better off editing and 
building the source: https://github.com/CG-Tespy/CGT_NametagBackground_MV

@param Graphic Width
@type number
@min 1
@default 300
@desc Sets the width of the nametag graphic. Ignored if Fit Graphic to Nametag is active.

@param Graphic Height
@type number
@min 1
@default 100
@desc Sets the height of the nametag graphic. Ignored if Fit Graphic to Nametag is active.

@param Graphic Opacity
@type number
@min 0
@max 255
@default 192
@desc Sets the opacity of the nametag graphic on a scale of 0 to 255.

@param Fit Graphic to Nametag
@type boolean
@default false
@desc Whether the name box graphic's dimensions should be scaled to the nametag's dimensions.

@param Nametag Graphic
@type file
@dir img/system

@param Graphic X Offset
@type number
@default 0
@desc Positional offset of the Nametag graphic on the X axis.

@param Graphic Y Offset
@type number
@default 0
@desc Positional offset of the Nametag graphic on the Y axis.

*/

"use strict";

import { NaTaBa } from './_MainSource/_CGT_NametagBackground_MV_Setup';

let plugin = 
{
    NaTaBa: NaTaBa
};

Object.assign(CGT, plugin);
