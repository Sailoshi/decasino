/// --- Set up a system ---
import utils from "../node_modules/decentraland-ecs-utils/index";

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))
  cube.getComponent(Transform).scale.set(0.1, 0.1, 0.01)

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
    this._cube.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
    const that = this;


    const move = new utils.MoveTransformComponent(this._startPos, this._endPosition, 0.2, function() {
      that._cube.addComponent(new utils.ExpireIn(10))
      // let testElement = new SlotElement(new Vector3(2, 1, 2), new Vector3(2, 3, 2));
      // testElement.Spawn()
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
button.addComponent(new Transform({ position: new Vector3(2, 1.2, 2) }))
button.getComponent(Transform).scale.set(0.5, 0.5, 0.2)
button.addComponent(new BoxShape())
button.addComponent(
    new OnClick(() => {
      testElement.Move();
      testElement2.Move();
      testElement3.Move();
      testElement4.Move();
    })
)

//
// engine.addEntity(button);
const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, e => {
  // testElement.Move();
  // testElement2.Move();
  // testElement3.Move();
  // testElement4.Move();
  startRound = true;
})

let testElement = new SlotElement(new Vector3(2, 2, 2), new Vector3(2, 1, 2));
let testElement2 = new SlotElement(new Vector3(2, 2.1, 2), new Vector3(2, 0.9, 2));
let testElement3 = new SlotElement(new Vector3(2, 2.2, 2), new Vector3(2, 0.8, 2));
let testElement4 = new SlotElement(new Vector3(2, 2.3, 2), new Vector3(2, 0.7, 2));

testElement.Spawn();
testElement2.Spawn();
testElement3.Spawn();


@Component("lerpData")
export class LerpData implements ISystem {
  origin: Vector3 = Vector3.Zero()
  target: Vector3 = Vector3.Zero()
  fraction: number = 0
}

let startRound = false;

export class LerpMove {
  private _speed = 1;
  private _counter = 1;
  private _rounds = 5;
  update(dt: number) {
    if (startRound) {
      let transform = cube.getComponent(Transform)
      let lerp = cube.getComponent(LerpData)
      if (lerp.fraction < 1) {
        if (lerp.fraction > 0.01 && this._counter == 1) {
          this._speed = 10;
        }
        if (lerp.fraction > 0.1 && this._counter == 1) {
          this._speed = 20;
        }

        if ( this._counter == 2) {
          this._speed = 40;
        }

        transform.position = Vector3.Lerp(
            lerp.origin,
            lerp.target,
            lerp.fraction
        )
        lerp.fraction += (dt / 50) * this._speed;
      } else {
        cube.getComponent(Transform).position.set(1, 1, 1);
        if (this._rounds == this._counter) {
          startRound = false;
          this._speed = 1;
          this._counter = 0;
        }
        this._counter++;

        lerp.fraction = 0;
      }
    }
  }
}


var cube = new Entity();
cube.addComponent(new Transform({ position: new Vector3(1, 1, 1) }))
cube.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
cube.addComponent(new BoxShape());
cube.addComponent(new LerpData())
cube.getComponent(LerpData).origin = new Vector3(1, 1, 1)
cube.getComponent(LerpData).target = new Vector3(1, 5, 1)

var cube1 = new Entity();
cube1.addComponent(new Transform({ position: new Vector3(1, 1.1, 1) }))
cube1.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
cube1.addComponent(new BoxShape());
cube1.addComponent(new LerpData())
cube1.getComponent(LerpData).origin = new Vector3(1, 1.1, 1)
cube1.getComponent(LerpData).target = new Vector3(1, 5.1, 1)

var cube2 = new Entity();
cube2.addComponent(new Transform({ position: new Vector3(1, 1.2, 1) }))
cube2.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
cube2.addComponent(new BoxShape());
cube2.addComponent(new LerpData())
cube2.getComponent(LerpData).origin = new Vector3(1, 1.2, 1)
cube2.getComponent(LerpData).target = new Vector3(1, 5.2, 1)

var cube3 = new Entity();
cube3.addComponent(new Transform({ position: new Vector3(1, 1.3, 1) }))
cube3.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
cube3.addComponent(new BoxShape());
cube3.addComponent(new LerpData())
cube3.getComponent(LerpData).origin = new Vector3(1, 1.3, 1)
cube3.getComponent(LerpData).target = new Vector3(1, 5.3, 1)

var cube4 = new Entity();
cube4.addComponent(new Transform({ position: new Vector3(1, 1.4, 1) }))
cube4.getComponent(Transform).scale.set(0.1, 0.1, 0.01)
cube4.addComponent(new BoxShape());
cube4.addComponent(new LerpData())
cube4.getComponent(LerpData).origin = new Vector3(1, 1.4, 1)
cube4.getComponent(LerpData).target = new Vector3(1, 5.4, 1)

engine.addEntity(cube)
engine.addEntity(cube1)
engine.addEntity(cube2)
engine.addEntity(cube3)
engine.addEntity(cube4)

engine.addSystem(new LerpMove())



/// --- Spawn a cube ---



