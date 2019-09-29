import {events, onSpinBlockFinishEvent, SlotMachineStateSystem, SlotMachineSystem} from "./SlotMachineStateSystem";
import {getMaterialInstance, SpinTexture} from "./SlotMaterials";
import {cashSoundSource, rect, source, source2, winningSoundSource} from "./game";

@EventConstructor()
export class onRoundFinishEvent {
    constructor() {}
}

export class TimeSystem implements ISystem {
    public functionCall: () => void;
    public start: boolean = false;
    public timeDelayed = 0;
    update(dt: number) {
        if (this.start) {
            this.timeDelayed += dt;

            if (this.timeDelayed > 3) {
                this.timeDelayed = 0;
                this.start = false;
                this.functionCall();
            }
        }
    }
}

export class TextSystem implements ISystem {

    public start: boolean = false;
    public textComponent: UIText;

    public timeDelayed = 0;
    update(dt: number) {
        if (this.start) {
            this.timeDelayed += dt;

            this.textComponent.visible = true;

            if (this.timeDelayed > 3.5) {
                this.timeDelayed = 0;
                this.start = false;

                this.textComponent.visible = false
            }
        }
    }
}

export class SpinBlock extends Entity {

    private _currentCredits = 0;
    private _creditsEntity;

    public addCredits(credits: number) {
        if (this._currentCredits + credits > 10000) {
            return;
        }
        this._currentCredits += credits;
        this._creditsEntity.getComponent(TextShape).value = this._currentCredits;
    }

    public initText(creditsNumber: number) {
        if (creditsNumber > 0) {
            this._currentCredits = creditsNumber;
        }

        this._creditsEntity = new Entity();
        const credits = new TextShape(this._currentCredits.toString())
        credits.fontSize = 2
        credits.color = Color3.White()


        this._creditsEntity.addComponentOrReplace(new Transform({
            position: new Vector3(14.64, 1.3, 13.3),
            rotation: new Quaternion(0, 1, 0, 1),
            scale: new Vector3(0.2, 0.2, 0.2)}));
        this._creditsEntity.addComponentOrReplace(credits);

        engine.addEntity(this._creditsEntity)
    }
    public _won = false;
    public _gameStarted = false;
    public startGame() {
        if (this._currentCredits <= 0 && this._creditsEntity) {
            this._currentCredits = 0;
            return;
        }

        this._gameStarted = true;
        if (!this._firstSpinBlock_2.getComponent(SlotMachineStateSystem).startGame) {


            // Play sound
            source.playOnce();
            source2.playOnce();
            if (this._creditsEntity) {
                this._currentCredits -= 50;
                this._creditsEntity.getComponent(TextShape).value = this._currentCredits;
            }
        }

        this._firstSpinBlock_1.getComponent(SlotMachineStateSystem).startGame = true;
        this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).startGame = true;
        this._thirdSpinBlock_1.getComponent(SlotMachineStateSystem).startGame = true;
        this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).startGame = true;
        this._firstSpinBlock_2.getComponent(SlotMachineStateSystem).startGame = true;
        this._secondSpinBlock_2.getComponent(SlotMachineStateSystem).startGame = true;
        this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).startGame = true;
        this._fourthSpinBlock2.getComponent(SlotMachineStateSystem).startGame = true;
        this._firstSpinBlock_3.getComponent(SlotMachineStateSystem).startGame = true;
        this._secondSpinBlock_3.getComponent(SlotMachineStateSystem).startGame = true;
        this._thirdSpinBlock_3.getComponent(SlotMachineStateSystem).startGame = true;
        this._fourthSpinBlock3.getComponent(SlotMachineStateSystem).startGame = true;

        const delayTimer = new TimeSystem();
        const textSystem = new TextSystem();

        const factTxt = new UIText(rect)

        factTxt.outlineColor = new Color4(0.7, 1, 0.8, 1)
        factTxt.value = 'Yeah, you have won 100 Mana'
        factTxt.fontSize = 50
        factTxt.width = 500
        factTxt.visible = false;
        factTxt.hTextAlign = "center";
        factTxt.height = 800
        factTxt.outlineColor = Color4.Green();
        factTxt.positionX = 800
        factTxt.positionY = 300
        factTxt.color = new Color4(0.7, 1, 0.8, 1)
        factTxt.textWrapping = true

        this._secondSpinBlock_1.getComponent(Material).emissiveColor = null;
        this._secondSpinBlock_2.getComponent(Material).emissiveColor = null;
        this._secondSpinBlock_3.getComponent(Material).emissiveColor = null;
        this._thirdSpinBlock_1.getComponent(Material).emissiveColor = null;
        this._thirdSpinBlock_2.getComponent(Material).emissiveColor = null;
        this._thirdSpinBlock_3.getComponent(Material).emissiveColor = null;
        this._fourthSpinBlock1.getComponent(Material).emissiveColor = null;
        this._fourthSpinBlock2.getComponent(Material).emissiveColor = null;
        this._fourthSpinBlock3.getComponent(Material).emissiveColor = null;

        textSystem.textComponent = factTxt;

        engine.addSystem(delayTimer)

        events.addListener(onSpinBlockFinishEvent, null, () => {
            events.fireEvent( new onRoundFinishEvent())

            if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == this._secondSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._secondSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._secondSpinBlock_3.getComponent(SlotMachineStateSystem).slotIcon) {
                this._won = true;
                playWinningSound();
                this._secondSpinBlock_1.getComponent(Material).emissiveColor = Color3.Green();
                this._secondSpinBlock_2.getComponent(Material).emissiveColor = Color3.Green();
                this._secondSpinBlock_3.getComponent(Material).emissiveColor = Color3.Green();
                let credits = 100;
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Bar) {
                    credits = 250;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Tiger) {
                    credits = 500;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Seven) {
                    credits = 777;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Diamond) {
                    credits = 1000;
                }

                factTxt.value = "Yeah, you have won " + credits + " Mana";
                factTxt.visible  = true;

                delayTimer.functionCall = () => {
                    this._secondSpinBlock_1.getComponent(Material).emissiveColor = null;
                    this._secondSpinBlock_2.getComponent(Material).emissiveColor = null;
                    this._secondSpinBlock_3.getComponent(Material).emissiveColor = null;
                    factTxt.visible  = false;
                    this._won = false;
                    factTxt.value = "100";
                }

                delayTimer.start = true;

                this.addCredits(credits);
            }

            if (this._thirdSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_3.getComponent(SlotMachineStateSystem).slotIcon) {
                this._won = true;
                playWinningSound();
                this._thirdSpinBlock_1.getComponent(Material).emissiveColor = Color3.Green();
                this._thirdSpinBlock_2.getComponent(Material).emissiveColor = Color3.Green();
                this._thirdSpinBlock_3.getComponent(Material).emissiveColor = Color3.Green();

                let credits = 100;

                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Bar) {
                    credits = 250;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Tiger) {
                    credits = 500;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Seven) {
                    credits = 777;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Diamond) {
                    credits = 1000;
                }

                factTxt.value = "Yeah, you have won " + credits + " Mana";
                factTxt.visible  = true;

                delayTimer.functionCall = () => {
                    this._thirdSpinBlock_1.getComponent(Material).emissiveColor = null;
                    this._thirdSpinBlock_2.getComponent(Material).emissiveColor = null;
                    this._thirdSpinBlock_3.getComponent(Material).emissiveColor = null;
                    factTxt.visible  = false;
                    this._won = false;
                    factTxt.value = "100";
                }

                delayTimer.start = true;

                this.addCredits(credits);
            }
            if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == this._fourthSpinBlock2.getComponent(SlotMachineStateSystem).slotIcon && this._fourthSpinBlock2.getComponent(SlotMachineStateSystem).slotIcon == this._fourthSpinBlock3.getComponent(SlotMachineStateSystem).slotIcon) {
                this._won = true;
                playWinningSound();
                this._fourthSpinBlock1.getComponent(Material).emissiveColor = Color3.Green();
                this._fourthSpinBlock2.getComponent(Material).emissiveColor = Color3.Green();
                this._fourthSpinBlock3.getComponent(Material).emissiveColor = Color3.Green();

                let credits = 100;

                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Bar) {
                    credits = 250;
                }
                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Tiger) {
                    credits = 500;
                }
                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Seven) {
                    credits = 777;
                }
                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Diamond) {
                    credits = 1000;
                }

                factTxt.value = "Yeah, you have won " + credits + " Mana";
                factTxt.visible  = true;

                delayTimer.functionCall = () => {
                    this._fourthSpinBlock1.getComponent(Material).emissiveColor = null;
                    this._fourthSpinBlock2.getComponent(Material).emissiveColor = null;
                    this._fourthSpinBlock3.getComponent(Material).emissiveColor = null;
                    factTxt.visible  = false;
                    this._won = false;
                    factTxt.value = "100";
                }

                delayTimer.start = true;

                this.addCredits(credits);
            }
            if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._fourthSpinBlock3.getComponent(SlotMachineStateSystem).slotIcon) {
                this._won = true;
                playWinningSound();
                this._secondSpinBlock_1.getComponent(Material).emissiveColor = Color3.Green();
                this._thirdSpinBlock_2.getComponent(Material).emissiveColor = Color3.Green();
                this._fourthSpinBlock3.getComponent(Material).emissiveColor = Color3.Green();

                let credits = 100;

                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Bar) {
                    credits = 250;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Tiger) {
                    credits = 500;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Seven) {
                    credits = 777;
                }
                if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Diamond) {
                    credits = 1000;
                }

                factTxt.value = "Yeah, you have won " + credits + " Mana";
                factTxt.visible  = true;

                delayTimer.functionCall = () => {
                    this._secondSpinBlock_1.getComponent(Material).emissiveColor = null;
                    this._thirdSpinBlock_2.getComponent(Material).emissiveColor = null;
                    this._fourthSpinBlock3.getComponent(Material).emissiveColor = null;
                    factTxt.visible  = false;
                    this._won = false;
                    factTxt.value = "100";
                }

                delayTimer.start = true;

                this.addCredits(credits);
            }
            if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._secondSpinBlock_3.getComponent(SlotMachineStateSystem).slotIcon) {
                this._won = true;
                playWinningSound();
                this._fourthSpinBlock1.getComponent(Material).emissiveColor = Color3.Green();
                this._thirdSpinBlock_2.getComponent(Material).emissiveColor = Color3.Green();
                this._secondSpinBlock_3.getComponent(Material).emissiveColor = Color3.Green();

                let credits = 100;

                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Bar) {
                    credits = 250;
                    factTxt.value = "250";
                }
                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Tiger) {
                    credits = 500;
                    factTxt.value = "500";
                }
                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Seven) {
                    credits = 777;
                    factTxt.value = "777";
                }
                if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == SpinTexture.Diamond) {
                    credits = 1000;
                    factTxt.value = "1000";
                }

                factTxt.value = "Yeah, you have won " + credits + " Mana";
                factTxt.visible  = true;

                delayTimer.functionCall = () => {
                    this._fourthSpinBlock1.getComponent(Material).emissiveColor = null;
                    this._thirdSpinBlock_2.getComponent(Material).emissiveColor = null;
                    this._secondSpinBlock_3.getComponent(Material).emissiveColor = null;
                    factTxt.visible  = false;
                    this._won = false;
                    factTxt.value = "100";
                }

                delayTimer.start = true;

                this.addCredits(credits);
            }

            this._gameStarted = false;
        })

         function playWinningSound() {

             winningSoundSource.playOnce()

        }

    }



    _firstSpinBlock_1 = new Entity();
    _secondSpinBlock_1 = new Entity();
    _thirdSpinBlock_1 = new Entity();
    _fourthSpinBlock1 = new Entity();
    _firstSpinBlock_2 = new Entity();
    _secondSpinBlock_2 = new Entity();
    _thirdSpinBlock_2 = new Entity();
    _fourthSpinBlock2 = new Entity();
    _firstSpinBlock_3 = new Entity();
    _secondSpinBlock_3 = new Entity();
    _thirdSpinBlock_3 = new Entity();
    _fourthSpinBlock3 = new Entity();

    private roundFinishCallback(): void {
        events.fireEvent(new onSpinBlockFinishEvent());
    };

    private stopSoundCallback(): void {

        const stopSound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const stopSoundSource = new AudioSource(clip)


        // Add AudioSource component to entity
        stopSound.addComponent(stopSoundSource)
        stopSound.addComponent(new Transform({position: new Vector3(10, 1, 8)}))
        engine.addEntity(stopSound);


        // Play sound
        stopSoundSource.playOnce();
    };

    constructor(slotMachineScreen: Entity) {
        super();




        let spinBlockSurface = new PlaneShape();

        this._firstSpinBlock_1.addComponent(new Transform({ position: new Vector3(0.2, 0.415, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._firstSpinBlock_1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._firstSpinBlock_1.addComponent(spinBlockSurface);
        this._firstSpinBlock_1.addComponent(new SlotMachineStateSystem())
        this._firstSpinBlock_1.addComponent(getMaterialInstance(SpinTexture.Tiger))

        this._firstSpinBlock_1.setParent(slotMachineScreen)


        this._secondSpinBlock_1.addComponent(new Transform({ position: new Vector3(0.2, 0.315, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._secondSpinBlock_1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._secondSpinBlock_1.addComponent(spinBlockSurface);
        this._secondSpinBlock_1.addComponent(new SlotMachineStateSystem())
        this._secondSpinBlock_1.addComponent(getMaterialInstance(SpinTexture.Cherry))

        this._secondSpinBlock_1.setParent(slotMachineScreen)


        this._thirdSpinBlock_1.addComponent(new Transform({ position: new Vector3(0.2, 0.215, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._thirdSpinBlock_1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._thirdSpinBlock_1.addComponent(spinBlockSurface);
        this._thirdSpinBlock_1.addComponent(new SlotMachineStateSystem())
        this._thirdSpinBlock_1.addComponent(getMaterialInstance(SpinTexture.Seven))

        this._thirdSpinBlock_1.setParent(slotMachineScreen)


        this._fourthSpinBlock1.addComponent(new Transform({ position: new Vector3(0.2, 0.115, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._fourthSpinBlock1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._fourthSpinBlock1.addComponent(spinBlockSurface);
        this._fourthSpinBlock1.addComponent(new SlotMachineStateSystem())
        this._fourthSpinBlock1.addComponent(getMaterialInstance(SpinTexture.Banana))

        this._fourthSpinBlock1.setParent(slotMachineScreen)


        this._firstSpinBlock_2.addComponent(new Transform({ position: new Vector3(0.0, 0.415, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._firstSpinBlock_2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._firstSpinBlock_2.addComponent(spinBlockSurface);
        this._firstSpinBlock_2.addComponent(new SlotMachineStateSystem())
        this._firstSpinBlock_2.addComponent(getMaterialInstance(SpinTexture.Diamond))

        this._firstSpinBlock_2.setParent(slotMachineScreen)

        //
        this._secondSpinBlock_2.addComponent(new Transform({ position: new Vector3(0.0, 0.315, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._secondSpinBlock_2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._secondSpinBlock_2.addComponent(spinBlockSurface);
        this._secondSpinBlock_2.addComponent(new SlotMachineStateSystem())
        this._secondSpinBlock_2.addComponent(getMaterialInstance(SpinTexture.Plum))

        this._secondSpinBlock_2.setParent(slotMachineScreen)
        //
        //
        this._thirdSpinBlock_2.addComponent(new Transform({ position: new Vector3(0.0, 0.215, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._thirdSpinBlock_2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._thirdSpinBlock_2.addComponent(spinBlockSurface);
        this._thirdSpinBlock_2.addComponent(new SlotMachineStateSystem())
        this._thirdSpinBlock_2.addComponent(getMaterialInstance(SpinTexture.Plum))

        this._thirdSpinBlock_2.setParent(slotMachineScreen)


        this._fourthSpinBlock2.addComponent(new Transform({ position: new Vector3(0.0, 0.115, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._fourthSpinBlock2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._fourthSpinBlock2.addComponent(spinBlockSurface);
        this._fourthSpinBlock2.addComponent(new SlotMachineStateSystem())
        this._fourthSpinBlock2.addComponent(getMaterialInstance(SpinTexture.Seven))

        this._fourthSpinBlock2.setParent(slotMachineScreen)


        this._firstSpinBlock_3.addComponent(new Transform({ position: new Vector3(-0.2, 0.415, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._firstSpinBlock_3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._firstSpinBlock_3.addComponent(spinBlockSurface);
        this._firstSpinBlock_3.addComponent(new SlotMachineStateSystem())
        this._firstSpinBlock_3.addComponent(getMaterialInstance(SpinTexture.Citron))

        this._firstSpinBlock_3.setParent(slotMachineScreen)


        this._secondSpinBlock_3.addComponent(new Transform({ position: new Vector3(-0.2, 0.315, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._secondSpinBlock_3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._secondSpinBlock_3.addComponent(spinBlockSurface);
        this._secondSpinBlock_3.addComponent(new SlotMachineStateSystem())
        this._secondSpinBlock_3.addComponent(getMaterialInstance(SpinTexture.Bar))

        this._secondSpinBlock_3.setParent(slotMachineScreen)


        this._thirdSpinBlock_3.addComponent(new Transform({ position: new Vector3(-0.2, 0.215, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._thirdSpinBlock_3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._thirdSpinBlock_3.addComponent(spinBlockSurface);
        this._thirdSpinBlock_3.addComponent(new SlotMachineStateSystem())
        this._thirdSpinBlock_3.addComponent(getMaterialInstance(SpinTexture.Citron))

        this._thirdSpinBlock_3.setParent(slotMachineScreen)


        this._fourthSpinBlock3.addComponent(new Transform({ position: new Vector3(-0.2, 0.115, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._fourthSpinBlock3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._fourthSpinBlock3.addComponent(spinBlockSurface);
        this._fourthSpinBlock3.addComponent(new SlotMachineStateSystem())
        this._fourthSpinBlock3.addComponent(getMaterialInstance(SpinTexture.Banana))

        this._fourthSpinBlock3.setParent(slotMachineScreen)

        engine.addEntity(slotMachineScreen);
        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_1, 3));
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_1, 3))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_1, 3))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock1, 3, this.stopSoundCallback))

        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_2, 4))
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_2, 4))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_2, 4))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock2, 4, this.stopSoundCallback))

        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_3, 5))
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_3, 5))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_3, 5))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock3, 5, this.roundFinishCallback))
    }
}