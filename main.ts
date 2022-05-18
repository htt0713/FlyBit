namespace flybit{

    //% block="Initialization Animation $animation Time: $time"
    export function initialAnimation(animation: IconNames,time: number){
        basic.showIcon(animation, time)
    }
    //% block="Microbit Controller Button Decrease $buttonA Button Increase $buttonB"
    export function controller(buttonA:Button, buttonB: Button) {
        let b = 0
        let a = 0
        let pressedB = false
        let pressedA = false
        let rxNumberPrev = 0
        let rxNumberCurrent = 0
        let ax = 0
        let ay = 0
        let buttonState = 0
        let axRx = 0
        let ayRx = 0
        let buf = pins.createBuffer(5)
        radio.setGroup(62)
        basic.showIcon(IconNames.Happy, 2000)
        basic.showIcon(IconNames.Chessboard, 2000)
        basic.clearScreen()
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
}