import {SpinBlock} from "./SpinBlock";

@Component("SlotMachineScreen")
export class SlotMachineScreen {}

export class SlotMachine {
    private _slotMachineScreen = new Entity();

    get SlotMachineScreen(): Entity {
        return this._slotMachineScreen;
    }

    private _metalTexture  = new Material();

    public _backPlane = new Entity();
    private _backgroundPlane = new Entity();

    private _topBlock = new Entity();
    private _rightBlock = new Entity();
    private _bottomBlock = new Entity();
    private _leftBlock = new Entity();

    private _spinningBlocks: SpinBlock;

    constructor(position: Vector3 = new Vector3(8, 1, 8), scale: Vector3 = new Vector3(3, 3, 0.06), rotation: Quaternion = new Quaternion(0, 90,0,-45)) {

        this._metalTexture  = new Material();
        this._metalTexture.albedoTexture = new Texture("materials/metalTexture.png");
        this._metalTexture.bumpTexture = new Texture("materials/metalTexture.png");
        this._metalTexture.metallic = 0.8
        this._metalTexture.roughness = 0.4
        this._metalTexture.microSurface = 0.8
        this._metalTexture.specularIntensity = 0.7

        const backPlaneMaterial  = new Material();
        backPlaneMaterial.albedoColor = Color3.Red();

        this._slotMachineScreen.addComponent(new Transform({position: position, rotation: rotation, scale: scale}))

        // this._backgroundPlane.addComponent(new PlaneShape());
        // this._backgroundPlane.addComponent(new Transform({position: new Vector3(0, 0.22, -0.02)})).scale.set(1, 0.415, 0);
        // this._backgroundPlane.addComponent(backPlaneMaterial);

        this._backPlane.addComponent(new BoxShape());
        this._backPlane.addComponent(new Transform({position: new Vector3(0, 0.22, -0.05)})).scale.set(1, 0.415, 0.06);
        this._backPlane.addComponent(this._metalTexture);

        this._topBlock.addComponent(new BoxShape());
        this._topBlock.addComponent(new Transform({position: new Vector3(0, 0.44, 0)})).scale.set(1, 0.15, 5);
        this._topBlock.addComponent(this._metalTexture);

        this._rightBlock.addComponent(new BoxShape());
        this._rightBlock.addComponent(new Transform({position: new Vector3(-0.4, 0.22, 0)})).scale.set(0.20, 0.3, 5);
        this._rightBlock.addComponent(this._metalTexture);

        this._bottomBlock.addComponent(new BoxShape());
        this._bottomBlock.addComponent(new Transform({position: new Vector3(0, 0, 0)})).scale.set(1, 0.15, 5);
        this._bottomBlock.addComponent(this._metalTexture);

        this._leftBlock.addComponent(new BoxShape());
        this._leftBlock.addComponent(new Transform({position: new Vector3(0.4, 0.22, 0)})).scale.set(0.20, 0.3, 5);
        this._leftBlock.addComponent(this._metalTexture);

        // this._backgroundPlane.setParent(this._slotMachineScreen);
        this._backPlane.setParent(this._slotMachineScreen);
        this._topBlock.setParent(this._slotMachineScreen);
        this._rightBlock.setParent(this._slotMachineScreen);
        this._bottomBlock.setParent(this._slotMachineScreen);
        this._leftBlock.setParent(this._slotMachineScreen);

        this._spinningBlocks = new SpinBlock(this._slotMachineScreen);
    }

    public initCreditsText(credits: number) {
        this._spinningBlocks.initText(credits);
    }

    public addCredits(credits: number) {
        this._spinningBlocks.addCredits(credits);
    }

    public setPosition(position: Vector3) {
        this._slotMachineScreen.getComponent(Transform).position = position;
    }

    public startGame(): void {
        this._spinningBlocks.startGame();
    }
}