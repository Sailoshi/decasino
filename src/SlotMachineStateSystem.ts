import {materialsArray, SpinTexture} from "./SlotMaterials";


 export const events = new EventManager();


@EventConstructor()
export class onSpinBlockFinishEvent {
    constructor() {}
}



@Component("slotMachineStateSystem")
export class SlotMachineStateSystem implements ISystem {
    startGame: Boolean = false;
    isLastBlock: Boolean = false;
    slotIcon: SpinTexture;
}

export class SlotMachineSystem implements ISystem {

    private _cube: Entity
    private _transform;
    private _material;
    private _onRoundFinishedCallback;

    constructor(cubeComponent: Entity, onRoundFinishedCallback: () => void = null){
        this._cube = cubeComponent
        this._startPosition = this._cube.getComponent(Transform).position;
        this._transform = this._cube.getComponent(Transform)
        this._material = this._cube.getComponent(Material)
        this._endPosition = new Vector3(this._startPosition.x, 0.015, this._startPosition.z);
        this._stopPosition = this._endPosition;
        this._maxMovement = this._rounds * 4 * this._transform.scale.y;
        this._onRoundFinishedCallback = onRoundFinishedCallback;
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

            if (this._counter == this._rounds && (this._movementCounter * 100) / this._maxMovement >= 99.85 && this._velocity <= this._maxSpeed) {
                if (this._onRoundFinishedCallback) {
                    this._onRoundFinishedCallback();
                }
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
                        this._material.albedoTexture = materialsArray[random];
                        lerp.slotIcon = random
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