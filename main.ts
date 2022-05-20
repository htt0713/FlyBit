//% weight=100 color=#037c28 icon="\uf0b2"
namespace flybit{
    let rxNumberPrev = 0
    let rxNumberCurrent = 0
   
    //% block="Set Radio | Group: $groupNumber"
    export function startRadio(groupNumber: number) {
        radio.setGroup(groupNumber)
        radio.setTransmitPower(7)
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
    //% block="Launch Feature Button: $buttonA Land Feature  Button: $buttonB" 
    export function launch(buttonA: Button, buttonB: Button){
        //disarm every time this function is called
/*
        let b = 0
        let a = 0
        let ax = 0
        let ay = 0
        let buttonState = 0
        let axRx = 0
        let ayRx = 0
        let pressed = false
        let buf = pins.createBuffer(5)
        pressed = input.buttonIsPressed(launchButton)
        if (pressed) {
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            //skip to 9
            for (let i = 0; i < 10; i++) {
                b = 1 //add in the state machine
                buttonState = a + 2 * b
                buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
                buf.setNumber(NumberFormat.Int16LE, 1, ax)
                buf.setNumber(NumberFormat.Int16LE, 3, ay)
                radio.sendBuffer(buf)
                basic.showNumber(i)
                basic.pause(200)
            }
        } else {
            buttonState = 0
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            basic.pause(200)
        }*/

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


        ax = input.acceleration(Dimension.X) + 2020
        ay = input.acceleration(Dimension.Y) + 2060
        pressedA = input.buttonIsPressed(buttonA)
        pressedB = input.buttonIsPressed(buttonB)
        if (pressedA) {
            for (let i = 0; i < 10; i++) {
                //b = 1 //add in the state machine
                buttonState = 2
                ax = 0
                ay = 0
                buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
                buf.setNumber(NumberFormat.Int16LE, 1, ax)
                buf.setNumber(NumberFormat.Int16LE, 3, ay)
                radio.sendBuffer(buf)
                basic.showNumber(i)
                //basic.pause(200)
            }
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
    }
    //%block="launchBlock"
    export function launchBlock(){
        let ax = 0
        let ay = 0
        let buttonState = 2
        let buf = pins.createBuffer(5)

        //ax = input.acceleration(Dimension.X) + 2020
        //ay = input.acceleration(Dimension.Y) + 2060
        ax = 2040
        ay = 2040 //so that the remote reading is 0
            buttonState = 2
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            basic.pause(100)

            buttonState = 0
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)

            basic.pause(100)

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


    //%block="launchTest | Button Decrease $buttonA Button Increase $buttonB |"
    export function launchTest(buttonA: Button, buttonB: Button){
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


        //ax = input.acceleration(Dimension.X) + 2020
        //ay = input.acceleration(Dimension.Y) + 2060
        ax = 0
        ay = 0
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

    //% block="landBlock" 
    export function land(){
        let ax = 0
        let ay = 0
        let buttonState = 2
        let buf = pins.createBuffer(5)

        //ax = input.acceleration(Dimension.X) + 2020
        //ay = input.acceleration(Dimension.Y) + 2060
        ax = 2040
        ay = 2040
        buttonState = 1
        buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
        buf.setNumber(NumberFormat.Int16LE, 1, ax)
        buf.setNumber(NumberFormat.Int16LE, 3, ay)
        radio.sendBuffer(buf)
        basic.pause(100)

        buttonState = 0
        buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
        buf.setNumber(NumberFormat.Int16LE, 1, ax)
        buf.setNumber(NumberFormat.Int16LE, 3, ay)
        radio.sendBuffer(buf)

        basic.pause(100)

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

    //% block="Direction | In tandem with Launch" 
    export function launchFreeDirection() {
        let ax = 0
        let ay = 0
        let buttonState = 0 //just send 0 if you don't want to change status
        let axRx = 0
        let ayRx = 0
        let buf = pins.createBuffer(5)
        //radio.setGroup(62)
        //basic.clearScreen()
        
            ax = input.acceleration(Dimension.X) + 2020
            ay = input.acceleration(Dimension.Y) + 2060
            buf.setNumber(NumberFormat.Int16LE, 0, buttonState)
            buf.setNumber(NumberFormat.Int16LE, 1, ax)
            buf.setNumber(NumberFormat.Int16LE, 3, ay)
            radio.sendBuffer(buf)
            //need to think of break condition
        
    }
}