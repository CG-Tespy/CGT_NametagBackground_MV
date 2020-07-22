import { NaTaBa } from "../NaTaBa";

let old = 
{
    refresh: Window_NameBox.prototype.refresh,
    close: Window_NameBox.prototype.close,
    open: Window_NameBox.prototype.open,
    initialize: Window_NameBox.prototype.initialize,
};

let nameBoxChanges = 
{
    bgSprite:                                  null,

    initialize(parentWindow: Window_Message)
    {
        old.initialize.call(this, parentWindow);
        this.InitSprite();
    },

    InitSprite()
    {
        this.bgSprite = PIXI.Sprite.from(NaTaBa.nametagGraphic.baseTexture);
        this.UpdateSprite();
        this.addChildAt(this.bgSprite, 0);
    },

    refresh(text: string, position: PIXI.Point | PIXI.ObservablePoint): string
    {
        // Note that this function doesn't execute when the name window is closed.
        old.refresh.call(this, text, position);
        
        this.KeepBaseNametagGraphicTransparent();
        // ^ So the custom one can show properly
        this.UpdateSprite();
        return '';
    },

    KeepBaseNametagGraphicTransparent(): void
    {
        this.opacity = 0;
    },

    // New funcs
    UpdateSprite(): void
    {
        this.UpdateSpriteSize();
        this.UpdateSpriteOpacity();
        this.UpdateSpritePosition();
    },

    UpdateSpriteSize(): void
    {
        let newSize = this.GetCorrectSize();

        this.bgSprite.width = newSize.width;
        this.bgSprite.height = newSize.height;;
    },

    GetCorrectSize(): { width: number, height: number }
    {
        let correctSize = 
        {
            width: 0,
            height: 0
        };

        if (NaTaBa.params["Fit Graphic to Nametag"])
        {
            correctSize.width = this.width;
            correctSize.height = this.height;
        }
        else
        {
            correctSize.width = NaTaBa.params["Graphic Width"];
            correctSize.height = NaTaBa.params["Graphic Height"];
        }

        return correctSize;
    },

    UpdateSpriteOpacity(): void
    {
        let newOpacity = this.GetSpriteOpacity();
        this.bgSprite.alpha = newOpacity;
    },

    UpdateSpritePosition(): void
    {
        this.bgSprite.x = NaTaBa.params["Graphic X Offset"];
        this.bgSprite.y = NaTaBa.params["Graphic Y Offset"];
    },

    GetSpriteOpacity(): number
    {
        if (Yanfly.Param.MSGNameBoxClear == true)
            return 0;
        else
            return NaTaBa.params["Graphic Opacity"] / 255.0;
        // ^Pixi Sprite alphas are in a 0-1 format, so we have to map the 0-255 value to 
        // something within that range, when applying it to the Pixi Sprite this works off of.
    },

    close(): void
    {
        old.close.call(this);
        this.bgSprite.alpha = 0;
    },

    open(): void
    {
        old.open.call(this);
        this.bgSprite.alpha = NaTaBa.params["Graphic Opacity"] / 255.0;
    },
    
};

ApplyChanges();

function ApplyChanges()
{
    Window_NameBox.prototype = Object.assign(Window_NameBox.prototype, nameBoxChanges);
}
