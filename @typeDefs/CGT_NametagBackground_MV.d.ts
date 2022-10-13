declare namespace CGT
{
    namespace NaTaBa
    {
        let isActive: boolean;
        let version: number;
        let nameTagGraphic: Bitmap;
        namespace Events
        {
            let WidthChanged: CGT.Core.Utils.Event;
            let HeightChanged: CGT.Core.Utils.Event;
            let OpacityChanged: CGT.Core.Utils.Event;
            let GraphicChanged: CGT.Core.Utils.Event;
        }

        let params: NaTaBaParams;

        interface NaTaBaParams
        {
            'Graphic Width': number;
            'Graphic Height': number;
            'Graphic Opacity': number;
            'Fit Graphic to Nametag': boolean;
            'Nametag Graphic': string;
            'Graphic X Offset': number;
            'Graphic Y Offset': number;
        }
    }
    
}