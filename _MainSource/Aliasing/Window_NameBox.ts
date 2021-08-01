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
        this.ListenForGraphicNameChange();
        let placementDelay = 200; // In milliseconds
        setTimeout(this.PutSelfBehindMessageWindow.bind(this), placementDelay);
    },

    InitSprite()
    {
        this.bgSprite = PIXI.Sprite.from(NaTaBa.nametagGraphic.baseTexture);
        this.addChildAt(this.bgSprite, 0);
        this.UpdateSprite();
    },
    
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

    ListenForGraphicNameChange()
    {
        NaTaBa.Events.GraphicChanged.AddListener(this.OnGraphicNameChange, this);
    },

    OnGraphicNameChange(oldName: string, newName: string)
    {
        this.LoadImageAsBGSpriteTexture(newName);
    },

    LoadImageAsBGSpriteTexture(imageName: string)
    {
        let bitmap = ImageManager.loadPicture(imageName);
        let newTex = PIXI.Texture.from(bitmap.baseTexture);
        this.bgSprite.texture = newTex;
    },

    PutSelfBehindMessageWindow(): void
    {
        // This means making sure the name window has a high-enough index
        // among the scene's children.
        let scene: Scene_Base = this.parent;
        scene.removeChild(this);
        let highEnoughIndex = scene.children.length - 1;
        scene.addChildAt(this, highEnoughIndex);
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
