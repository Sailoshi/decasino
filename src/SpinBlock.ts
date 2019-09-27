import {events, onSpinBlockFinishEvent, SlotMachineStateSystem, SlotMachineSystem} from "./SlotMachineStateSystem";
import {getMaterialInstance, SpinTexture} from "./SlotMaterials";

@EventConstructor()
export class onRoundFinishEvent {
    constructor() {}
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

    public startGame() {
        if (this._currentCredits <= 0 && this._creditsEntity) {
            this._currentCredits = 0;
            return;
        }
        if (!this._firstSpinBlock_2.getComponent(SlotMachineStateSystem).startGame) {
            const sound = new Entity()
            const sound2 = new Entity()
            // Create AudioClip object, holding sounds file
            const clip = new AudioClip('sounds/startSound.wav')
            const clip2 = new AudioClip('sounds/spinningSound.mp3')
            // Create AudioSource component, referencing `clip`
            const source = new AudioSource(clip)
            const source2 = new AudioSource(clip2)

            // Add AudioSource component to entity
            sound.addComponent(source)
            sound2.addComponent(source2)
            engine.addEntity(sound);
            engine.addEntity(sound2);

            // Play sound
            source.playing = true
            source2.playing = true
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




        events.addListener(onSpinBlockFinishEvent, null, () => {
            events.fireEvent(new onRoundFinishEvent())
            let won = false;

            if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == this._secondSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._secondSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._secondSpinBlock_3.getComponent(SlotMachineStateSystem).slotIcon) {
                won = true;
                this.addCredits(100);
            }

            if (this._thirdSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_3.getComponent(SlotMachineStateSystem).slotIcon) {
                won = true;
                this.addCredits(100);
            }
            if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == this._fourthSpinBlock2.getComponent(SlotMachineStateSystem).slotIcon && this._fourthSpinBlock2.getComponent(SlotMachineStateSystem).slotIcon == this._fourthSpinBlock3.getComponent(SlotMachineStateSystem).slotIcon) {
                won = true;
                this.addCredits(100);
            }
            if (this._secondSpinBlock_1.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._fourthSpinBlock3.getComponent(SlotMachineStateSystem).slotIcon) {
                won = true;
                this.addCredits(100);
            }
            if (this._fourthSpinBlock1.getComponent(SlotMachineStateSystem).slotIcon == this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon && this._thirdSpinBlock_2.getComponent(SlotMachineStateSystem).slotIcon == this._secondSpinBlock_3.getComponent(SlotMachineStateSystem).slotIcon) {
                won = true;
                this.addCredits(100);
            }

            if (won) {
                const sound = new Entity()
                // Create AudioClip object, holding sounds file
                const clip = new AudioClip('sounds/winningSound.mp3')
                // Create AudioSource component, referencing `clip`
                const source = new AudioSource(clip)

                // Add AudioSource component to entity
                sound.addComponent(source)
                engine.addEntity(sound);

                // Play sound
                source.playing = true


            }
        })

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
        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_1));
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_1))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_1))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock1, this.roundFinishCallback))

        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_2))
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_2))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_2))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock2))

        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_3))
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_3))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_3))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock3))
    }
}