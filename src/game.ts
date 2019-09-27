import {SlotMachine} from "./SlotMachineScreen";
import {events, onSpinBlockFinishEvent} from "./SlotMachineStateSystem";
import {onRoundFinishEvent} from "./SpinBlock";
import utils from "../node_modules/decentraland-ecs-utils/index"

const input = Input.instance;


const  floorTexture  = new Material();
floorTexture.albedoTexture = new Texture("materials/casinoFloor.png");
floorTexture.alphaTexture = new Texture("materials/casinoFloor.png");
floorTexture.roughness = 1
floorTexture.microSurface = 0.8

const  wallTexture  = new Material();
wallTexture.albedoTexture = new Texture("materials/casinoWall.png");
wallTexture.alphaTexture = new Texture("materials/casinoWall.png");
wallTexture.roughness = 1
wallTexture.microSurface = 0.8

const  wallTextureTop  = new Material();
wallTextureTop.albedoColor = Color3.Black();
wallTextureTop.roughness = 1
wallTextureTop.microSurface = 0.8

const  roofTexture  = new Material();
roofTexture.albedoTexture = new Texture("materials/metalTexture.png");
roofTexture.roughness = 1
roofTexture.microSurface = 0.8

// create canvas
const canvas = new UICanvas()
// create container inside canvas
const rect = new UIContainerRect(canvas)
rect.adaptHeight = true
rect.adaptWidth = true
rect.hAlign = 'left'
rect.vAlign = 'top'
rect.opacity = 0.8

const factTxt = new UIText(rect)
factTxt.outlineColor = new Color4(0.7, 1, 0.8, 1)
factTxt.value = 'WELCOME to the Tivoli Casino World, purchase mana to start playing!'
factTxt.fontSize = 22
factTxt.width = 500
factTxt.height = 205
factTxt.positionX = 455
factTxt.positionY = 0
factTxt.color = new Color4(0.7, 1, 0.8, 1)
factTxt.textWrapping = true

const manaPurchaseBlock = new Entity();
manaPurchaseBlock.addComponent(new BoxShape())
manaPurchaseBlock.addComponent(new Transform({position: new Vector3(12, 0, 8), scale: new Vector3(1, 6, 1)}))
engine.addEntity(manaPurchaseBlock);
manaPurchaseBlock.addComponent(roofTexture);
const purchaseText = new TextShape("Purchase 1000 Mana")
purchaseText.fontSize = 4
purchaseText.color = Color3.White()

let purchaseEntity = new Entity();

purchaseEntity.addComponentOrReplace(new Transform({
    position: new Vector3(11.49, 1.7, 8),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(0.2, 0.2, 0.2)}));
purchaseEntity.addComponentOrReplace(purchaseText);

engine.addEntity(purchaseEntity);

// let sunUITexture = new Texture("materials/1.png")
// const sunImgScreen = new UIImage(rect, sunUITexture)
// sunImgScreen.hAlign = 'left'
// sunImgScreen.vAlign = 'top'
// sunImgScreen.sourceLeft = 0
// sunImgScreen.sourceTop = 0
// sunImgScreen.sourceWidth = 1024
// sunImgScreen.sourceHeight = 483
// sunImgScreen.width = 1024
// sunImgScreen.height = 512

const scene = new Entity()
const transform = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)
engine.addEntity(scene)

const myText = new TextShape("Mana:")
myText.fontSize = 2
myText.color = Color3.White()

let textEntity = new Entity();

const button = new Entity()
button.addComponent(new SphereShape())
button.addComponentOrReplace(new Transform({
    position: new Vector3(14.70, 1.34, 12.5),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(0.05, 0.05, 0.05)}));
button.addComponentOrReplace(new Material()).albedoColor = Color3.Red();
engine.addEntity(button);

manaPurchaseBlock.addComponentOrReplace(
    new OnPointerDown(e => {
        slotMachine.addCredits(1000);
        factTxt.visible = false;
    }));

const button2 = new Entity()
button2.addComponent(new SphereShape())
button2.addComponentOrReplace(new Transform({
    position: new Vector3(14.70, 1.34, 9.5),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(0.05, 0.05, 0.05)}));
button2.addComponentOrReplace(new Material()).albedoColor = Color3.Red();
engine.addEntity(button2);

const button3 = new Entity()
button3.addComponent(new SphereShape())
button3.addComponentOrReplace(new Transform({
    position: new Vector3(14.70, 1.34, 6.5),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(0.05, 0.05, 0.05)}));
button3.addComponentOrReplace(new Material()).albedoColor = Color3.Red();
engine.addEntity(button3);

const button4 = new Entity()
button4.addComponent(new SphereShape())
button4.addComponentOrReplace(new Transform({
    position: new Vector3(14.70, 1.34, 3.5),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(0.05, 0.05, 0.05)}));
button4.addComponentOrReplace(new Material()).albedoColor = Color3.Red();
engine.addEntity(button4);

textEntity.addComponentOrReplace(new Transform({
    position: new Vector3(14.64, 1.3, 13.5),
    rotation: new Quaternion(0, 1, 0, 1),
    scale: new Vector3(0.2, 0.2, 0.2)}));
textEntity.addComponentOrReplace(myText);
engine.addEntity(textEntity)


const floorBasePebbles_01 = new Entity()
floorBasePebbles_01.setParent(scene)
const gltfShape = new GLTFShape('models/FloorBasePebbles_01/FloorBasePebbles_01.glb')
floorBasePebbles_01.addComponentOrReplace(gltfShape)
const transform_2 = new Transform({
    position: new Vector3(8, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
floorBasePebbles_01.addComponentOrReplace(transform_2)
engine.addEntity(floorBasePebbles_01)

const flower_01 = new Entity()
flower_01.setParent(scene)
const gltfShape_2 = new GLTFShape('models/Flower_01/Flower_01.glb')
flower_01.addComponentOrReplace(gltfShape_2)
const transform_3 = new Transform({
    position: new Vector3(1, 0, 6),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
flower_01.addComponentOrReplace(transform_3)
engine.addEntity(flower_01)

const flower_01_2 = new Entity()
flower_01_2.setParent(scene)
flower_01_2.addComponentOrReplace(gltfShape_2)
const transform_4 = new Transform({
    position: new Vector3(1, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
flower_01_2.addComponentOrReplace(transform_4)
engine.addEntity(flower_01_2)

const plantPot_01 = new Entity()
plantPot_01.setParent(scene)
const gltfShape_3 = new GLTFShape('models/PlantPot_01/PlantPot_01.glb')
plantPot_01.addComponentOrReplace(gltfShape_3)
const transform_5 = new Transform({
    position: new Vector3(5, 0, 9),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
plantPot_01.addComponentOrReplace(transform_5)
engine.addEntity(plantPot_01)

const sign_03 = new Entity()
sign_03.setParent(scene)
const gltfShape_4 = new GLTFShape('models/Sign_03/Sign_03.glb')
sign_03.addComponentOrReplace(gltfShape_4)
const transform_6 = new Transform({
    position: new Vector3(1, 0, 4),
    rotation: new Quaternion(0, 0, 0, 0),
    scale: new Vector3(1, 1, 1)
})
sign_03.addComponentOrReplace(transform_6)
engine.addEntity(sign_03)


const floorBlock_01 = new Entity()
floorBlock_01.setParent(scene)
const gltfShape_5 = new GLTFShape('models/FloorBlock_01/FloorBlock_01.glb')
floorBlock_01.addComponentOrReplace(gltfShape_5)
const transform_7 = new Transform({
    position: new Vector3(1.7, 0, 7.1),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
floorBlock_01.addComponentOrReplace(transform_7)
engine.addEntity(floorBlock_01)




let slotMachine = new SlotMachine(new Vector3(14.8, 1.2, 13), new Vector3(2, 2, 0.06), new Quaternion(0, -45,0,45));
slotMachine.initCreditsText(0);
let slotMachine2 = new SlotMachine(new Vector3(14.8, 1.2, 10), new Vector3(2, 2, 0.06), new Quaternion(0, -45,0,45));
let slotMachine3 = new SlotMachine(new Vector3(14.8, 1.2, 7), new Vector3(2, 2, 0.06), new Quaternion(0, -45,0,45));
let slotMachine4 = new SlotMachine(new Vector3(14.8, 1.2, 4), new Vector3(2, 2, 0.06), new Quaternion(0, -45,0,45));

let wall = new Entity()
wall.addComponent(new BoxShape());
wall.addComponent(new Transform({position: new Vector3(9, 0, 2.1), scale: new Vector3(0.2, 8, 13), rotation: new Quaternion(0, 45, 0, 45)}))
wall.addComponent(wallTexture);

let wall2 = new Entity()
wall2.addComponent(new BoxShape());
wall2.addComponent(new Transform({position: new Vector3(15, 0, 8), scale: new Vector3(0.2, 8, 12), rotation: new Quaternion(0, 0, 0, 0)}))
wall2.addComponent(wallTexture);

let wall3 = new Entity()
wall3.addComponent(new BoxShape());
wall3.addComponent(new Transform({position: new Vector3(9, 0, 14.1), scale: new Vector3(0.2, 8, 13), rotation: new Quaternion(0, 45, 0, 45)}))
wall3.addComponent(wallTexture);

let wall4 = new Entity()
wall4.addComponent(new BoxShape());
wall4.addComponent(new Transform({position: new Vector3(2.6, 0, 11.1), scale: new Vector3(0.2, 8, 6), rotation: new Quaternion(0, 0, 0, 0)}))
wall4.addComponent(wallTexture);

let wall4_top = new Entity()
wall4_top.addComponent(new BoxShape());
wall4_top.addComponent(new Transform({position: new Vector3(2.6, 3.25, 7.1), scale: new Vector3(0.2, 1.5, 2), rotation: new Quaternion(0, 0, 0, 0)}))
wall4_top.addComponent(wallTextureTop);

let door = new Entity()
door.addComponent(new BoxShape());
door.addComponent(new Transform({position: new Vector3(0, 0, 1), scale: new Vector3(0.1, 2.6, 2), rotation: new Quaternion(0, 0, 0, 0)}))
door.addComponent(wallTextureTop);

let wall5 = new Entity()
wall5.addComponent(new BoxShape());
wall5.addComponent(new Transform({position: new Vector3(2.6, 0, 4.1), scale: new Vector3(0.2, 8, 4), rotation: new Quaternion(0, 0, 0, 0)}))
wall5.addComponent(wallTexture);

let roof = new Entity()
roof.addComponent(new BoxShape());
roof.addComponent(new Transform({position: new Vector3(8.75, 4.0, 8.1), scale: new Vector3(13.5, 0.2, 12.2), rotation: new Quaternion(0, 0, 0, 0)}))
roof.addComponent(roofTexture);

let ground = new Entity()
ground.addComponent(new BoxShape());
ground.addComponent(new Transform({position: new Vector3(8.8, 0.1, 8.1), scale: new Vector3(12.2, 0.001, 12.2), rotation: new Quaternion(0, 0, 0, 0)}))
ground.addComponent(floorTexture);

let openPos: Quaternion = Quaternion.Euler(0, 90, 0)
let closedPos: Quaternion = Quaternion.Euler(0, 0, 0)

const doorPivot = new Entity()
doorPivot.addComponent(new Transform({
    position: new Vector3(2.65, 1.2, 6.1),
    rotation: closedPos
}))

//toggle behavior for door
    door.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
        if (value == utils.ToggleState.On){
            doorPivot.addComponentOrReplace(
                new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, openPos, 0.5)
            )
        }
        else{
            doorPivot.addComponentOrReplace(
                new utils.RotateTransformComponent(doorPivot.getComponent(Transform).rotation, closedPos, 0.5)
            )
        }
    }))

// Set the click behavior for the door
door.addComponent(
    new OnClick(e => {
        door.getComponent(utils.ToggleComponent).toggle()
    })
)

door.setParent(doorPivot)
//doorPivot.addComponent(new DoorState())
engine.addEntity(doorPivot)

engine.addEntity(wall);
engine.addEntity(wall2);
engine.addEntity(wall3);
engine.addEntity(wall4);
engine.addEntity(wall5);
engine.addEntity(wall4_top);
engine.addEntity(roof);
engine.addEntity(ground);
engine.addEntity(door);

// input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, e => {

var startGameEvent = new OnPointerDown(e => {

    slotMachine.startGame();

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })
})

var startGameEvent2 = new OnPointerDown(e => {

    slotMachine2.startGame();

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })
});

var startGameEvent3 = new OnPointerDown(e => {

    slotMachine3.startGame();

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })
});

var startGameEvent4 = new OnPointerDown(e => {

    slotMachine4.startGame();

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })

    events.addListener(onRoundFinishEvent, null, () => {
        const sound = new Entity()

        // Create AudioClip object, holding sounds file
        const clip = new AudioClip('sounds/stopSound.mp3')

        // Create AudioSource component, referencing `clip`
        const source = new AudioSource(clip)


        // Add AudioSource component to entity
        sound.addComponent(source)

        engine.addEntity(sound);


        // Play sound
        source.playing = true

    })
});

slotMachine._backPlane.addComponentOrReplace(startGameEvent);
button.addComponentOrReplace(startGameEvent);

slotMachine2._backPlane.addComponentOrReplace(startGameEvent2);
button2.addComponentOrReplace(startGameEvent2);

slotMachine3._backPlane.addComponentOrReplace(startGameEvent3);
button3.addComponentOrReplace(startGameEvent3);

slotMachine4._backPlane.addComponentOrReplace(startGameEvent4);
button4.addComponentOrReplace(startGameEvent4);