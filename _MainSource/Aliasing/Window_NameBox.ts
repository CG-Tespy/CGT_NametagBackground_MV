import { NaTaBa } from "../NaTaBa";
import { fullyOpaqueForWindow, fullyOpaqueForSprite, fullyTransparent } from "../Shared/Shared";
import { ZPositioning } from "../Structures/ZPositioning";

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
        NaTaBa.yanflyNameWindow = this;
        this.InitSprite();
        this.ListenForGraphicNameChange();
        let placementDelay = 200; // In milliseconds
        setTimeout(this.UpdateZPositioning.bind(this), placementDelay);
        // ^Since nameboxes don't get attached to parents right away
    },

    InitSprite()
    {
        this.bgSprite = PIXI.Sprite.from(NaTaBa.nametagGraphic.baseTexture);
        this.addChildAt(this.bgSprite, 0);
        this.UpdateSprite();
    },
    
    UpdateSprite(): void
    {
        this.UpdateSpriteOpacity();

        if (NaTaBa.isActive)
        {
            this.UpdateSpriteSize();
            this.UpdateSpritePosition();
        }
        else
        {
            this.ShowRegularNametagGraphic();
        }
    },

    UpdateSpriteOpacity(): void
    {
        let newOpacity = this.GetSpriteOpacity();
        this.bgSprite.alpha = newOpacity;
    },

    GetSpriteOpacity(): number
    {
        if (Yanfly.Param.MSGNameBoxClear == true || !NaTaBa.isActive)
            return fullyTransparent;
        else
            return NaTaBa.params["Graphic Opacity"] / 255.0;
        // ^Pixi Sprite alphas are in a 0-1 format, so we have to map the 0-255 value to 
        // something within that range, when applying it to the Pixi Sprite this works off of.
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

    UpdateSpritePosition(): void
    {
        this.bgSprite.x = NaTaBa.params["Graphic X Offset"];
        this.bgSprite.y = NaTaBa.params["Graphic Y Offset"];
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
        let bitmap = ImageManager.loadSystem(imageName);
        let newTex = PIXI.Texture.from(bitmap.baseTexture);
        this.bgSprite.texture = newTex;
    },

    UpdateZPositioning(): void
    {
        let scene: Scene_Base = this.parent;
        scene.removeChild(this);
        let zIndex = this.DecideZIndexRelativeTo(scene);
        
        scene.addChildAt(this, zIndex);
    },

    DecideZIndexRelativeTo(this: Window_NameBox, scene: Scene_Base)
    {
        let behindIndex = 1;
        let frontIndex = scene.children.length - 1;
        let indexToGoWith = 0;

        if (CGT.NaTaBa.params["Z Positioning"] == ZPositioning.Front)
            indexToGoWith = frontIndex;
        else
            indexToGoWith = behindIndex;
    },

    refresh(text: string, position: PIXI.Point | PIXI.ObservablePoint): string
    {
        // Note that this function doesn't execute when the name window is closed.
        old.refresh.call(this, text, position);
        
        if (NaTaBa.isActive)
            this.KeepBaseNametagGraphicTransparent();
            // ^ So the custom one can show properly
            
        this.UpdateSprite();
        return '';
    },

    ShowRegularNametagGraphic()
    {
        this.opacity = fullyOpaqueForWindow;
    },

    KeepBaseNametagGraphicTransparent(): void
    {
        this.opacity = fullyTransparent;
    },

    // New funcs

    close(): void
    {
        old.close.call(this);
        this.bgSprite.alpha = fullyTransparent;
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
