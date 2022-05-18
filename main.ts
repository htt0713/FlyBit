namespace area{
    //% block="circle radius $radius"
    //% radius.defl=100
    //% radius.min=0 radius.max=1000
    export function circle(radius:number) {
        return radius*radius*Math.PI;
    }
}