namespace flybit{
    let rxNumberPrev = 0
    let rxNumberCurrent = 0
   
    //% block="Set Radio | Group: $groupNumber"
    export function startRadio(groupNumber: number) {
        radio.setGroup(groupNumber)
        basic.showIcon(IconNames.Happy, 2000)
        basic.showIcon(IconNames.Chessboard, 2000)
        basic.clearScreen()
    }
    //% block="Initialization Animation $animation Time: $time"
    export function initialAnimation(animation: IconNames,time: number){
        basic.showIcon(animation, time)
    }
    //% block="Microbit Manual Flying Controller | Button Decrease $buttonA Button Increase $buttonB |" 
    export function controller(buttonA:Button, buttonB: Button) {
        let b = 0
        let a = 0
        let pressedB = false
        let pressedA = false
       
        let ax = 0
        let ay = 0
        let buttonState = 0
        let axRx = 0
        let ayRx = 0
        let buf = pins.createBuffer(5)
        
        basic.forever(function () {
            ax = input.acceleration(Dimension.X) + 2020
            ay = input.acceleration(Dimension.Y) + 2060
            pressedA = input.buttonIsPressed(buttonA)
            pressedB = input.buttonIsPressed(buttonB)
            if (pressedA) {
                a = 1
            } else {
                a = 0
            }
            if (pressedB) {
                b = 1
            } else {
                b = 0
            }
            buttonState = a + 2 * b
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
        })
    }

     //% block="LED Plot Status IMPORTANT: Need to include if flying manual!" 
    export function returnStatus(){
        radio.onReceivedNumberDeprecated(function (receivedNumber) {
            if (receivedNumber == 1) {
                basic.clearScreen()
            }
            rxNumberCurrent = receivedNumber
            led.plot(receivedNumber % 5, receivedNumber / 5)

            if (rxNumberCurrent < rxNumberPrev) {
                led.unplot((receivedNumber + 1) % 5, (receivedNumber + 1) / 5)
            }
            if (receivedNumber == 0) {
                basic.clearScreen()
                led.plotAll()
            }
            rxNumberPrev = rxNumberCurrent
        })
    }
    //% block="Launch Feature Button: $launchButton" 
    export function launch(launchButton: Button){
        //disarm every time this function is called
        let b = 0
        let a = 0
        let ax = 0
        let ay = 0
        let buttonState = 0
        let axRx = 0
        let ayRx = 0
        let buf = pins.createBuffer(5)
        buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
        buf.setNumber(NumberFormat.Int16LE, 1, ax)
        buf.setNumber(NumberFormat.Int16LE, 3, ay)
        radio.sendBuffer(buf)
        //skip to 9
        for(let i = 0; i<10;i++){
            b = 1 //add in the state machine
            buttonState = a + 2 * b
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            basic.pause(200)
        }
    }
    //% block="Land Feature" 
    export function land(){
        //disarm every time this function is called
        let b = 0
        let a = 0
        let ax = 0
        let ay = 0
        let buttonState = 0
        let axRx = 0
        let ayRx = 0
        let buf = pins.createBuffer(5)
        buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
        buf.setNumber(NumberFormat.Int16LE, 1, ax)
        buf.setNumber(NumberFormat.Int16LE, 3, ay)
        radio.sendBuffer(buf)
        //skip to 9
        for (let i = 0; i < 10; i++) {
            a = 1 //decrease in the state machine
            buttonState = a + 2 * b
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            basic.pause(200)
        }
    }

    //% block="Direction | In tandem with Launch" 
    export function launchFreeDirection() {
        let ax = 0
        let ay = 0
        let buttonState = 0 //just send 0 if you don't want to change status
        let axRx = 0
        let ayRx = 0
        let buf = pins.createBuffer(5)
        radio.setGroup(62)
        basic.clearScreen()
        basic.forever(function () {
            ax = input.acceleration(Dimension.X) + 2020
            ay = input.acceleration(Dimension.Y) + 2060
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            //need to think of break condition
        })
    }
}