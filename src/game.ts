import {SlotMachine} from "./SlotMachineScreen";
import {events, onSpinBlockFinishEvent} from "./SlotMachineStateSystem";
import {onRoundFinishEvent} from "./SpinBlock";

const input = Input.instance;

let slotMachine = new SlotMachine();

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
});