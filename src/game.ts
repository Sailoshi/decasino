import {SlotMachine} from "./SlotMachineScreen";
import {events, onSpinBlockFinishEvent} from "./SlotMachineStateSystem";
import {onRoundFinishEvent} from "./SpinBlock";
import utils from "../node_modules/decentraland-ecs-utils/index"

const input = Input.instance;


const scene = new Entity()
const transform = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
scene.addComponentOrReplace(transform)
engine.addEntity(scene)

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
    position: new Vector3(13.5, 0, 3.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})
floorBlock_01.addComponentOrReplace(transform_7)
engine.addEntity(floorBlock_01)


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
roofTexture.alphaTexture = new Texture("materials/metalTexture.png");
roofTexture.roughness = 1
roofTexture.microSurface = 0.8

let slotMachine = new SlotMachine(new Vector3(14.8, 1.2, 13), new Vector3(2, 2, 0.06), new Quaternion(0, -45,0,45));
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

let ground = new Entity()
ground.addComponent(new BoxShape());
ground.addComponent(new Transform({position: new Vector3(8.8, 0.1, 8.1), scale: new Vector3(12.2, 0.001, 12.2), rotation: new Quaternion(0, 0, 0, 0)}))
ground.addComponent(floorTexture);

let openPos: Quaternion = Quaternion.Euler(0, 90, 0)
let closedPos: Quaternion = Quaternion.Euler(0, 0, 0)

const doorPivot = new Entity()
doorPivot.addComponent(new Transform({
    position: new Vector3(2.5, 1.2, 6.1),
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

input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, e => {
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
});