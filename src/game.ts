/// --- Set up a system ---
import utils from "../node_modules/decentraland-ecs-utils/index";





/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))
  cube.getComponent(Transform).scale.set(1, 1, 0.01)

  // add a shape to the entity
  cube.addComponent(new BoxShape())

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

export class SlotElement {
  private _startPos: Vector3;
  private _endPosition: Vector3;

  private _cube = new Entity();

  constructor(startPos: Vector3, endPosition: Vector3) {
    this._startPos = startPos;
    this._endPosition = endPosition;

    // add a transform to the entity
    this._cube.addComponent(new Transform({ position: new Vector3(this._startPos.x, this._startPos.y, this._startPos.z) }))
    this._cube.getComponent(Transform).scale.set(1, 1, 0.01)
    const that = this;
    const move = new utils.MoveTransformComponent(this._startPos, this._endPosition, 2, function() {
      that._cube.addComponent(new utils.ExpireIn(10))
      let testElement = new SlotElement(new Vector3(2, 1, 2), new Vector3(2, 3, 2));
      testElement.Spawn()
    }, utils.InterpolationType.EASEQUAD);
    // add a shape to the entity
    this._cube.addComponent(new BoxShape())

    this._cube.addComponent(new utils.ToggleComponent(utils.ToggleState.Off, value =>{
      if (value == utils.ToggleState.On){
        //set color to green

        this._cube.addComponent(move)

      }
      else{
        //set color to red
      }
    }))


  }

  Move() {
    this._cube.getComponent(utils.ToggleComponent).toggle()
  }


  Spawn() {
    // add the entity to the engine
    engine.addEntity(this._cube)
  }

}
const button = new Entity();
button.addComponent(new Transform({ position: new Vector3(5, 1, 5) }))
button.getComponent(Transform).scale.set(0.5, 0.5, 0.2)
button.addComponent(new BoxShape())
button.addComponent(
    new OnClick(() => {
      testElement.Move();
      testElement2.Move();
      testElement3.Move();
    })
)
engine.addEntity(button);

let testElement = new SlotElement(new Vector3(2, 1, 2), new Vector3(2, 3, 2));
let testElement2 = new SlotElement(new Vector3(2, 2, 2), new Vector3(2, 4, 2));
let testElement3 = new SlotElement(new Vector3(2, 3, 2), new Vector3(2, 5, 2));
let testElement4 = new SlotElement(new Vector3(2, 4, 2), new Vector3(2, 6, 2));

testElement.Spawn();
testElement2.Spawn();
testElement3.Spawn();




/// --- Spawn a cube ---



