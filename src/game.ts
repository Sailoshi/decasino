/// --- Set up a system ---
import utils from "../node_modules/decentraland-ecs-utils/index";
//
// export class SlotElement {
//   private _startPos: Vector3;
//   private _endPosition: Vector3;
//
//   private _cube = new Entity();
//
//   constructor(startPos: Vector3, endPosition: Vector3) {
//     this._startPos = startPos;
//     this._endPosition = endPosition;
//
//     // add a transform to the entity
//     this._cube.addComponent(new Transform({ position: new Vector3(this._startPos.x, this._startPos.y, this._startPos.z) }))
//     this._cube.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
//     const that = this;
//
//     const move = new utils.MoveTransformComponent(this._startPos, this._endPosition, 0.2, function() {
//       that._cube.addComponent(new utils.ExpireIn(10))
//       // let testElement = new SlotElement(new Vector3(2, 1, 2), new Vector3(2, 3, 2));
//       // testElement.Spawn()
//     }, utils.InterpolationType.EASEQUAD);
//     // add a shape to the entity
//     this._cube.addComponent(new BoxShape())
//
//     this._cube.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
//       if (value == utils.ToggleState.On){
//         //set color to green
//
//         this._cube.addComponent(move)
//
//       }
//       else{
//         //set color to red
//       }
//     }))
//
//
//   }
//
//   Move() {
//     this._cube.getComponent(utils.ToggleComponent).toggle()
//   }
//
//
//   Spawn() {
//     // add the entity to the engine
//     engine.addEntity(this._cube)
//   }
//
// }

// const button = new Entity();
// button.addComponent(new Transform({ position: new Vector3(2, 1.2, 2) }))
// button.getComponent(Transform).scale.set(0.5, 0.5, 0.2)
// button.addComponent(new BoxShape())
// button.addComponent(
//     new OnClick(() => {
//       testElement.Move();
//       testElement2.Move();
//       testElement3.Move();
//       testElement4.Move();
//     })
// )

//
// engine.addEntity(button);


// let testElement = new SlotElement(new Vector3(2, 2, 2), new Vector3(2, 1, 2));
// let testElement2 = new SlotElement(new Vector3(2, 2.1, 2), new Vector3(2, 0.9, 2));
// let testElement3 = new SlotElement(new Vector3(2, 2.2, 2), new Vector3(2, 0.8, 2));
// let testElement4 = new SlotElement(new Vector3(2, 2.3, 2), new Vector3(2, 0.7, 2));
//
// testElement.Spawn();
// testElement2.Spawn();
// testElement3.Spawn();

const tigerTexture = new Texture("materials/1.png");
const cherryTexture = new Texture("materials/2.png");
const sevenTexture = new Texture("materials/3.png");
const bananaTexture = new Texture("materials/4.png");
const plumTexture = new Texture("materials/5.png");
const melonTexture = new Texture("materials/6.png");
const diamondTexture = new Texture("materials/7.png");
const citronTexture = new Texture("materials/8.png");
const barTexture = new Texture("materials/9.png");

const materialsArray: Array<Texture> = [tigerTexture, cherryTexture, sevenTexture, bananaTexture, plumTexture, melonTexture, diamondTexture, citronTexture, barTexture];

enum SpinTexture {
    Tiger = 0,
    Cherry,
    Seven,
    Banana,
    Plum,
    Melon,
    Diamond,
    Citron,
    Bar
}

function getMaterialInstance(material: SpinTexture): BasicMaterial {
    let result  = new BasicMaterial();
    // result.metallic = 0.2
    // result.roughness = 0.8
    // result.microSurface = 0.8
    // result.specularIntensity = 0.7

    switch(material) {
        case SpinTexture.Tiger: {
            result.texture = tigerTexture;
            // result.alphaTexture = tigerTexture;
            break;
        }
        case SpinTexture.Cherry: {
            result.texture = cherryTexture;
            // result.alphaTexture = cherryTexture;
            break;
        }
        case SpinTexture.Seven: {
            result.texture = sevenTexture;
            // result.alphaTexture = sevenTexture;
            break;
        }
        case SpinTexture.Banana: {
            result.texture = bananaTexture;
            // result.alphaTexture = bananaTexture;
            break;
        }
        case SpinTexture.Plum: {
            result.texture = plumTexture;
            // result.alphaTexture = plumTexture;
            break;
        }
        case SpinTexture.Melon: {
            result.texture = melonTexture;
            // result.alphaTexture = melonTexture;
            break;
        }
        case SpinTexture.Diamond: {
            result.texture = diamondTexture;
            // result.alphaTexture = diamondTexture;
            break;
        }
        case SpinTexture.Citron: {
            result.texture = citronTexture;
            // result.alphaTexture = citronTexture;
            break;
        }
        case SpinTexture.Bar: {
            result.texture = barTexture;
            // result.alphaTexture = barTexture;
            break;
        }
        default: {
            result.texture = tigerTexture;
            // result.alphaTexture = tigerTexture;
            break;
        }
    }

    return result;
}

@Component("SlotMachineScreen")
export class SlotMachineScreen {}

let slotMachineScreen = new Entity();
slotMachineScreen.addComponent(new Transform({position: new Vector3(3, 1.5, 3), rotation: new Quaternion(0, 90,0,-45), scale: new Vector3(3, 3, 0.06)}))

let backgroundPlane = new Entity();
backgroundPlane.addComponent(new PlaneShape());
backgroundPlane.addComponent(new Transform({position: new Vector3(0, 0.22, -0.02)})).scale.set(1, 0.415, 0);
let backPlane = new Entity();
backPlane.addComponent(new BoxShape());
backPlane.addComponent(new Transform({position: new Vector3(0, 0.22, -2)})).scale.set(1, 0.415, 0.06);

let topBlock = new Entity();
topBlock.addComponent(new BoxShape());
topBlock.addComponent(new Transform({position: new Vector3(0, 0.44, 0)})).scale.set(1, 0.15, 5);

let rightBlock = new Entity();
rightBlock.addComponent(new BoxShape());
rightBlock.addComponent(new Transform({position: new Vector3(-0.4, 0.22, 0)})).scale.set(0.20, 0.3, 5);

let bottomBlock = new Entity();
bottomBlock.addComponent(new BoxShape());
bottomBlock.addComponent(new Transform({position: new Vector3(0, 0, 0)})).scale.set(1, 0.15, 5);

let leftBlock = new Entity();
leftBlock.addComponent(new BoxShape());
leftBlock.addComponent(new Transform({position: new Vector3(0.4, 0.22, 0)})).scale.set(0.20, 0.3, 5);

backgroundPlane.setParent(slotMachineScreen);
backPlane.setParent(slotMachineScreen);
topBlock.setParent(slotMachineScreen);
rightBlock.setParent(slotMachineScreen);
bottomBlock.setParent(slotMachineScreen);
leftBlock.setParent(slotMachineScreen);


@Component("slotMachineStateSystem")
export class SlotMachineStateSystem implements ISystem {
    startGame: Boolean = false;
    isLastBlock: Boolean = false;
}

export class SlotMachineSystem implements ISystem {

    private _cube: Entity
    private _transform;
    private _material;

    constructor(cubeComponent: Entity){
        this._cube = cubeComponent
        this._startPosition = this._cube.getComponent(Transform).position;
        this._transform = this._cube.getComponent(Transform)
        this._material = this._cube.getComponent(BasicMaterial)
        this._endPosition = new Vector3(this._startPosition.x, 0.015, this._startPosition.z);
        this._stopPosition = this._endPosition;
        this._maxMovement = this._rounds * 4 * this._transform.scale.y;
    }


    private _counter = 0;
    private _rounds = 5;
    private _startPosition;
    private _minSpeed = 0.08;
    private _maxSpeed = 1.6;
    private _delta = 0;
    private _velocity = 0.033333* this._minSpeed;
    private _maxMovement = 0
    private _movementCounter = 0;

    private _endPosition;
    private _stopPosition;

    update(dt: number) {
        let lerp = this._cube.getComponent(SlotMachineStateSystem);
        if (lerp.startGame) {

            if ((this._movementCounter * 100) / this._maxMovement >= 1 && (this._movementCounter * 100) / this._maxMovement <= 10 && this._velocity <= this._maxSpeed) {
                this._velocity *= 1.3;
            }

            if ((this._movementCounter * 100) / this._maxMovement >= 80 && this._velocity <= this._maxSpeed) {
                this._velocity *= 0.90;
            }

            let diff = Math.abs(this._transform.position.y - this._endPosition.y);
                let step = (diff - this._velocity) >= 0 ? this._velocity : diff % this._velocity;

                if (diff != 0) {
                    this._delta = this._velocity-step;
                }

                this._transform.position = this._transform.position.add(new Vector3(0, -step, 0));
                this._movementCounter += Math.abs(step + this._delta);

                if (this._transform.position.y - this._endPosition.y <= 0) {
                    if (this._counter < this._rounds) {
                        let diff = Math.abs(this._transform.position.y - this._endPosition.y);

                        if (this._counter == this._rounds - 1) {
                            let random = Math.floor(Math.random() * 6);
                            this._material.texture = materialsArray[random];
                        }
                        this._transform.position = this._transform.position.set(this._startPosition.x, 0.415 - this._delta, this._startPosition.z);

                        this._counter++;

                    } else {
                        this._transform.position.set(this._startPosition.x, this._startPosition.y, this._startPosition.z)

                        this._counter = 0;
                        this._endPosition = this._stopPosition;
                        lerp.startGame = false;
                        this._velocity = 0.033333* this._minSpeed;
                        this._movementCounter = 0;
                    }

                }

             if (this._rounds == this._counter) {
                 this._endPosition = this._startPosition;
             }
        }
     }
}


 let testShape = new PlaneShape();
// testShape.uvs = [
//     // ONE FACE
//     0.33,  // (B) Horizontal width right end position
//     0,  // (C) Vertical height bottom start position
//     0,  // (A) Horizontal width left start position
//     0,  // (C) Vertical height bottom start position
//
//     0,  // (A) Horizontal width left start position
//     0.33,  // (D) Vertical top height end position
//     0.33,  // (B) Horizontal width right end position
//     0.33,  // (D) Vertical top height end position
//
//     // OTHER FACE
//     0.66,  // (B) Horizontal width right end position
//     0.0,  // (C) Vertical height bottom start position
//     0.33,  // (A) Horizontal width left start position
//     0.0,  // (C) Vertical height bottom start position
//
//
//     0.33,  // (A) Horizontal width left start position
//     0.33,  // (D) Vertical top height end position
//     0.66,  // (B) Horizontal width right end position
//     0.33  // (D) Vertical top height end position
// ];



class SpinBlock extends Entity {

    public startGame() {
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

    constructor() {
        super();
        this._firstSpinBlock_1.addComponent(new Transform({ position: new Vector3(0.2, 0.415, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._firstSpinBlock_1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._firstSpinBlock_1.addComponent(testShape);
        this._firstSpinBlock_1.addComponent(new SlotMachineStateSystem())
        this._firstSpinBlock_1.addComponent(getMaterialInstance(SpinTexture.Tiger))

        this._firstSpinBlock_1.setParent(slotMachineScreen)


        this._secondSpinBlock_1.addComponent(new Transform({ position: new Vector3(0.2, 0.315, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._secondSpinBlock_1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._secondSpinBlock_1.addComponent(testShape);
        this._secondSpinBlock_1.addComponent(new SlotMachineStateSystem())
        this._secondSpinBlock_1.addComponent(getMaterialInstance(SpinTexture.Cherry))

        this._secondSpinBlock_1.setParent(slotMachineScreen)


        this._thirdSpinBlock_1.addComponent(new Transform({ position: new Vector3(0.2, 0.215, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._thirdSpinBlock_1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._thirdSpinBlock_1.addComponent(testShape);
        this._thirdSpinBlock_1.addComponent(new SlotMachineStateSystem())
        this._thirdSpinBlock_1.addComponent(getMaterialInstance(SpinTexture.Seven))

        this._thirdSpinBlock_1.setParent(slotMachineScreen)


        this._fourthSpinBlock1.addComponent(new Transform({ position: new Vector3(0.2, 0.115, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._fourthSpinBlock1.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._fourthSpinBlock1.addComponent(testShape);
        this._fourthSpinBlock1.addComponent(new SlotMachineStateSystem())
        this._fourthSpinBlock1.addComponent(getMaterialInstance(SpinTexture.Banana))

        this._fourthSpinBlock1.setParent(slotMachineScreen)


        this._firstSpinBlock_2.addComponent(new Transform({ position: new Vector3(0.0, 0.415, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._firstSpinBlock_2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._firstSpinBlock_2.addComponent(testShape);
        this._firstSpinBlock_2.addComponent(new SlotMachineStateSystem())
        this._firstSpinBlock_2.addComponent(getMaterialInstance(SpinTexture.Diamond))

         this._firstSpinBlock_2.setParent(slotMachineScreen)

        //
        this._secondSpinBlock_2.addComponent(new Transform({ position: new Vector3(0.0, 0.315, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._secondSpinBlock_2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._secondSpinBlock_2.addComponent(testShape);
        this._secondSpinBlock_2.addComponent(new SlotMachineStateSystem())
        this._secondSpinBlock_2.addComponent(getMaterialInstance(SpinTexture.Plum))

        this._secondSpinBlock_2.setParent(slotMachineScreen)
        //
        //
        this._thirdSpinBlock_2.addComponent(new Transform({ position: new Vector3(0.0, 0.215, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._thirdSpinBlock_2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._thirdSpinBlock_2.addComponent(testShape);
        this._thirdSpinBlock_2.addComponent(new SlotMachineStateSystem())
        this._thirdSpinBlock_2.addComponent(getMaterialInstance(SpinTexture.Plum))

        this._thirdSpinBlock_2.setParent(slotMachineScreen)


        this._fourthSpinBlock2.addComponent(new Transform({ position: new Vector3(0.0, 0.115, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._fourthSpinBlock2.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._fourthSpinBlock2.addComponent(testShape);
        this._fourthSpinBlock2.addComponent(new SlotMachineStateSystem())
        this._fourthSpinBlock2.addComponent(getMaterialInstance(SpinTexture.Seven))

        this._fourthSpinBlock2.setParent(slotMachineScreen)


        this._firstSpinBlock_3.addComponent(new Transform({ position: new Vector3(-0.2, 0.415, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._firstSpinBlock_3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._firstSpinBlock_3.addComponent(testShape);
        this._firstSpinBlock_3.addComponent(new SlotMachineStateSystem())
        this._firstSpinBlock_3.addComponent(getMaterialInstance(SpinTexture.Citron))

        this._firstSpinBlock_3.setParent(slotMachineScreen)


        this._secondSpinBlock_3.addComponent(new Transform({ position: new Vector3(-0.2, 0.315, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._secondSpinBlock_3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._secondSpinBlock_3.addComponent(testShape);
        this._secondSpinBlock_3.addComponent(new SlotMachineStateSystem())
        this._secondSpinBlock_3.addComponent(getMaterialInstance(SpinTexture.Bar))

        this._secondSpinBlock_3.setParent(slotMachineScreen)


        this._thirdSpinBlock_3.addComponent(new Transform({ position: new Vector3(-0.2, 0.215, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._thirdSpinBlock_3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._thirdSpinBlock_3.addComponent(testShape);
        this._thirdSpinBlock_3.addComponent(new SlotMachineStateSystem())
        this._thirdSpinBlock_3.addComponent(getMaterialInstance(SpinTexture.Citron))

        this._thirdSpinBlock_3.setParent(slotMachineScreen)


        this._fourthSpinBlock3.addComponent(new Transform({ position: new Vector3(-0.2, 0.115, -0.01), rotation: new Quaternion(180, 0, 0, 0) }))
        this._fourthSpinBlock3.getComponent(Transform).scale.set(0.1, 0.1, 0.001)
        this._fourthSpinBlock3.addComponent(testShape);
        this._fourthSpinBlock3.addComponent(new SlotMachineStateSystem())
        this._fourthSpinBlock3.addComponent(getMaterialInstance(SpinTexture.Banana))

        this._fourthSpinBlock3.setParent(slotMachineScreen)


        engine.addEntity(slotMachineScreen);
        engine.addSystem(new SlotMachineSystem(this._firstSpinBlock_1))
        engine.addSystem(new SlotMachineSystem(this._secondSpinBlock_1))
        engine.addSystem(new SlotMachineSystem(this._thirdSpinBlock_1))
        engine.addSystem(new SlotMachineSystem(this._fourthSpinBlock1))

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

const input = Input.instance;
let test = new SpinBlock();

input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, e => {
    test.startGame();
});
// engine.addSystem(new SlotMachineSystem(cube4))
// engine.addSystem(new SlotMachineSystem(cube5))




// export class SlotMachine extends Entity {
//
//   private _topBlock: Entity = new Entity();
//   private _rightBlock: Entity = new Entity();
//   private _bottomBlock: Entity = new Entity();
//   private _leftBlock: Entity = new Entity();
//
//   private _size: Vector3;
//
//   constructor() {
//     super("SlotMachine");
//
//     this._topBlock.addComponent(new BoxShape());
//     this._topBlock.addComponent(new SlotMachineScreen());
//     this._topBlock.addComponent(new Transform({position: new Vector3(0, 0, 0)})).scale.set(0.88, 0.1, 0.01);
//
//     this._rightBlock.addComponent(new BoxShape());
//     this._rightBlock.addComponent(new SlotMachineScreen());
//     this._rightBlock.addComponent(new Transform({position: new Vector3(0, 0, 0)})).scale.set(0.1, 0.5, 0.01);
//
//     this._bottomBlock.addComponent(new BoxShape());
//     this._bottomBlock.addComponent(new SlotMachineScreen());
//     this._bottomBlock.addComponent(new Transform({position: new Vector3(0, 0, 0)})).scale.set(0.1, 0.5, 0.01);
//
//     this._leftBlock.addComponent(new BoxShape());
//     this._leftBlock.addComponent(new SlotMachineScreen());
//     this._leftBlock.addComponent(new Transform({position: new Vector3(0, 0, 0)})).scale.set(0.88, 0.1, 0.01);
//   }
//
//   addComponent<T extends object>(component: T): any {
//     if (component instanceof Transform) {
//       this._topBlock.getComponent(Transform).position = component.position;
//       this._topBlock.getComponent(Transform).position.add(new Vector3(0, 0, 0));
//
//       this._rightBlock.getComponent(Transform).position = component.position;
//       this._rightBlock.getComponent(Transform).position.add(new Vector3(2.88, 0.1, 0));
//
//       this._bottomBlock.getComponent(Transform).position = component.position;
//       this._bottomBlock.getComponent(Transform).position.add(new Vector3(0.5, 0.1, 1));
//
//       this._leftBlock.getComponent(Transform).position = component.position;
//       this._leftBlock.getComponent(Transform).position.add(new Vector3(0, 0.1, 0));
//
//       engine.addEntity(this._topBlock)
//       engine.addEntity(this._rightBlock)
//       engine.addEntity(this._bottomBlock)
//       engine.addEntity(this._leftBlock)
//     }
//
//
//
//      //engine.addEntity(this._rightBlock)
//     // engine.addEntity(this._bottomBlock)
//     // engine.addEntity(this._leftBlock)
//   }
// }

// let test = new SlotMachine();
// test.addComponent(new Transform({ position: new Vector3(2,1,3) }));
// engine.addEntity(test);





/// --- Spawn a cube ---



