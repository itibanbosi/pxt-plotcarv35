/* plot_car Ver3.4*/

let wait = 0;
let Tugi_R = 0;
let Tugi_L = 0;
let T1 = 0;
let PremotionR = 0;
let PremotionL = 0;
let con_kaiten = 1.61;



let cond_Distance = 1;
let cond_degree = 1;
let microbit_wait = 750;

let Stepping = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let Stepping_non = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let Stepping1 = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let SteppingF_0 = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
];
let SteppingF_1 = [
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
];
let SteppingF_2 = [
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
];
let SteppingF_3 = [
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
];

let SteppingB_0 = [
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
];
let SteppingB_1 = [

    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
];

let SteppingB_2 = [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
];
let SteppingB_3 = [

    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
];

let Stepping_R = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let Stepping_L = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

//LED不使用
led.enable(false)

pins.digitalWritePin(DigitalPin.P3, 0)
pins.digitalWritePin(DigitalPin.P4, 0)
pins.digitalWritePin(DigitalPin.P6, 0)
pins.digitalWritePin(DigitalPin.P7, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P16, 0)

let moter_number = 0;
let io_neo = neopixel.create(DigitalPin.P9, 4, NeoPixelMode.RGB);
io_neo.showRainbow(1,360)
pins.servoWritePin(AnalogPin.P8, 90);
basic.pause(100);

//バージョンの判定
let first = input.runningTimeMicros()
let sum = 0
for (let index = 0; index < 1000; index++) {
    sum += 1
}
//basic.showNumber(input.runningTimeMicros() - first);
if ((input.runningTimeMicros() - first) < 2000 ){
    microbit_wait = 5000; 
//    basic.showString("V2");

    }
else
    {
    microbit_wait = 900;
//    basic.showString("V1");
    }


//% color="#3943c6" block="Plotcar Ver3.5" weight=95 icon="\uf1b9"
namespace eureka_plotter_car {

    export enum pen_updown {
        //% block="down"
        down,
        //% block="up"
        up
    }

    export enum plotter_houkou {
        //% block="forward"
        forward,
        //% block="back"
        back
    }
    
    export enum plotter_RL {
        //% block="Right"
        Right,
        //% block="Left"
        Left
    }
    
    
    export enum microbit_LED {
        //% block="invalid"
        invalid,
        //% block="effective"
        effective
    }
    
    export enum houkou {
        //% block="Right_right_angle"
        Right_right_angle,
        //% block="left_right_angle"
        left_right_angle,
        //% block="Diagonal_right"
        Diagonal_right,
        //% block="Diagonal_left"
        Diagonal_left
    }

    
    export enum kyori {
        //% block="long"
        long,
        //% block="short",
        short
    }
    export enum sence_select {
        //% block="normal30"
        normal30,
        //% block="High_sensitivity"
        High_sensitivity,
        //% block="Low_sensitivity",
        Low_sensitivity
    }
    export enum microbit_version {
        //% block="Version1"
        Version1,
        //% block="Version2"
        Version2,
        //% block="Test_A"
        Test_A,
        //% block="Test_B"
        Test_B,
        //% block="V1_Turbo"
        V1_Turbo,
        //% block="V2_Turbo"
        V2_Turbo
    }
    
    export enum onoff {
        //% block="ON"
        ON,
        //% block="OFF"
        OFF
    }
    export enum whiteblack {
        //% block="black"
        black,
        //% block="white"
        white
    }
    







    function moter(kyori: number, R_zengo: number, L_zengo: number) {
        led.enable(false);
        let i = 0;
        /* 端数の計算計算  */

        let kyori_hasuu = kyori % 1;
        serial.writeValue("kyori_hasuu", kyori_hasuu);
        let kyori_seisuu = Math.floor(kyori);
        /*    serial.writeValue("kyori_seisuu", kyori_seisuu);*/


        /* forward回の動作との比較と処理  */
        serial.writeValue("1Tugi_L", Tugi_L);
        if (PremotionR == R_zengo) {
            Tugi_R = Tugi_R + 1;
        }
        if (PremotionR > R_zengo) {
            Tugi_R = 3 - Tugi_R + 1;
        }
        if (PremotionR < R_zengo) {
            Tugi_R = 3 - Tugi_R + 1;
        }

        if (PremotionL == L_zengo) {
            Tugi_L = Tugi_L + 1;
        }
        if (PremotionL > L_zengo) {
            Tugi_L = 3 - Tugi_L + 1;
        }
        if (PremotionL < L_zengo) {
            Tugi_L = 3 - Tugi_L + 1;
        }


        /*   次のstep*/
        Tugi_L = (Tugi_L) % 4;
        Tugi_R = (Tugi_R) % 4;

        /*右ステッピングの処理*/
        switch (R_zengo) {
            case 0:
                Stepping_R = Stepping_non;
                break;
                if (Tugi_R == 0) {
                    Stepping_R = SteppingF_0
                }
                break;
            case 1:

                if (Tugi_R == 0) {
                    Stepping_R = SteppingB_0
                }
                if (Tugi_R == 1) {
                    Stepping_R = SteppingB_1
                }
                if (Tugi_R == 2) {
                    Stepping_R = SteppingB_2
                }
                if (Tugi_R == 3) {
                    Stepping_R = SteppingB_3
                }
                break;
            case 2:
                if (Tugi_R == 0) {
                    Stepping_R = SteppingF_0
                }
                if (Tugi_R == 1) {
                    Stepping_R = SteppingF_1
                }
                if (Tugi_R == 2) {
                    Stepping_R = SteppingF_2
                }
                if (Tugi_R == 3) {
                    Stepping_R = SteppingF_3
                }
                break;

        }
        Stepping_L = SteppingF_0
        /*左ステッピングの処理*/
        switch (L_zengo) {
            case 0:
                Stepping_L = Stepping_non;
                break;
            case 1:
                if (Tugi_L == 0) {
                    Stepping_L = SteppingF_0
                }
                if (Tugi_L == 1) {
                    Stepping_L = SteppingF_1
                }
                if (Tugi_L == 2) {
                    Stepping_L = SteppingF_2
                }
                if (Tugi_L == 3) {
                    Stepping_L = SteppingF_3
                }
                break;
            case 2:
                if (Tugi_L == 0) {
                    Stepping_L = SteppingB_0
                }
                if (Tugi_L == 1) {
                    Stepping_L = SteppingB_1
                }
                if (Tugi_L == 2) {
                    Stepping_L = SteppingB_2
                }
                if (Tugi_L == 3) {
                    Stepping_L = SteppingB_3
                }
                break;
        }

        /*  バックラッシュの処理　Right_wheel*/
        if (PremotionR != R_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            for (let index = 0; index < 3; index++) {
                let Data1 = 0;
                while (Data1 < 4) {
                    pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
                    pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
                    pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
                    pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
                    Data1 = Data1 + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
        }


        /*  バックラッシュの処理　Left_wheel*/
        if (PremotionL != L_zengo) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
            for (let index = 0; index < 3; index++) {
                let Data1 = 0;
                while (Data1 < 4) {
                    pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
                    pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
                    pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
                    pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
                    Data1 = Data1 + 1;
                    for (i = 0; i < microbit_wait; i++);
                    {
                    }
                }
            }
        }


        /*  整数部の処理　 */
        for (let index = 0; index < kyori_seisuu; index++) {
            let Data1 = 0;
            while (Data1 < 4) {

                pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
                pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
                pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
                pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
                pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
                pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
                pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
                pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
                Data1 = Data1 + 1;
                for (i = 0; i < microbit_wait; i++);
                {
                }
            }
        }

        /* 端数分の進み方と処理  */
        let Step_number = Math.floor(kyori_hasuu * 10 / 2.5);
        let Data1 = 0;
        while (Data1 < Step_number) {
            serial.writeValue("Data1", Data1);
            pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
            pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
            pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
            pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
            pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
            pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
            pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
            pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
            Data1 = Data1 + 1;
            for (i = 0; i < microbit_wait; i++);
            {
            }
        }

        Tugi_L = (Tugi_L + Data1 - 1) % 4;
        Tugi_R = (Tugi_R + Data1 - 1) % 4;

        PremotionR = R_zengo;
        PremotionL = L_zengo;

    }


    //% color="#009CA0" weight=96 blockId=eureka_relay block="pen |%mode| " group="1 pen condition"
    export function plottercar_pen(mode: pen_updown) {
        if (mode == pen_updown.down) {
            pins.servoWritePin(AnalogPin.P8, 0);
            basic.pause(1000);
        }
        if (mode == pen_updown.up) {
            pins.servoWritePin(AnalogPin.P8, 90);
            basic.pause(100);
        }
    }


    //% color="#3943c6" weight=80 blockId=plottercar_zengo
    //% block="To|%zengo| |%F_cm| cm" group="2 Basic movement"
    export function plottercar_zengo(zengo: plotter_houkou, F_cm: number): void {
        switch (zengo) {
            case plotter_houkou.forward:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 1, 1);
                break;

            case plotter_houkou.back:
                moter_number = F_cm / (18.9 * cond_Distance) * 512;
                moter(moter_number, 2, 2);
                break;
        }
    }

    //% color="#3943c6" weight=76 blockId=plottercar_RL_cycle
    //% block="|%RorL| roll degree |%L_degree| " group="2 Basic movement"
    export function plottercar_RL_cycle(RorL: plotter_RL, RL_degree: number): void {
        switch (RorL) {
            case plotter_RL.Left:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 1, 2);
                break;
            case plotter_RL.Right:
                moter_number = RL_degree / 360 * 512 * con_kaiten * cond_degree;
                moter(moter_number, 2, 1);
                break;
        }
    }


    //% color="#ff4940" weight=71 blockId=plottercar_rest
    //% block="Power off" group="2 Basic movement"
    export function plottercar_frest(): void {
        moter_number = 1;
        moter(moter_number, 0, 1);
    }

 


//% color="#3943c6" weight=72 blockId=plottercar_houkou
//% block="change direction |%muki|   " group="2 Basic movement"
export function plottercar_houkou(muki: houkou): void {
    switch (muki) {
        case houkou.Right_right_angle:
            return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Right, 90);
        case houkou.left_right_angle:
            return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Left, 90);
        case houkou.Diagonal_right:
            return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Right, 45);
        case houkou.Diagonal_left:
            return eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Left, 45);
    }
}



    //% color="#009A00" weight=40 blockId=polygon
    //% block="Polygon work |%digree_step| polygon   One side length |%Edge_Num|cm  |%RorL|roll " group="3 Shape"
    export function polygon(digree_step: number, Edge_Num: number, RorL: plotter_RL): void {
        switch (RorL) {
            case plotter_RL.Right:
                for (let index = 0; index < digree_step; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.forward, Edge_Num)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Right, 360 / digree_step)
                }
                break;
            case plotter_RL.Left:
                for (let index = 0; index < digree_step; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.forward, Edge_Num)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Left, 360 / digree_step)
                }
                break;
        }
    }


    //% color="#009A00" weight=39 blockId=cycle
    //% block="circlework diameter |%D_Num|cm  |%RorL|roll" group="3 Shape"
    export function cycle(D_Num: number, RorL: plotter_RL): void {
        let cir = D_Num * 3.14
        let forward_D = cir / 30
        switch (RorL) {
            case plotter_RL.Right:
                for (let index = 0; index < 30; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.forward, forward_D)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Right, 360 / 30)
                }
                break;
            case plotter_RL.Left:
                for (let index = 0; index < 30; index++) {
                    eureka_plotter_car.plottercar_zengo(plotter_houkou.forward, forward_D)
                    eureka_plotter_car.plottercar_RL_cycle(plotter_RL.Left, 360 / 30)
                }

        }
    }



    //% color="#ff3d03" weight=34 blockId=Microbit_Version_info block="micro:bit_Version |%Version_info|" group="4 Initial setting"
    export function microbit_version_info(Version_info: microbit_version) {
        switch (Version_info) {
            case microbit_version.Version1:
                microbit_wait = 900;
                break;
            case microbit_version.Version2:
                microbit_wait = 5000;
                break;
            case microbit_version.Test_A:
                microbit_wait = 10000;
                break;
            case microbit_version.Test_B:
                microbit_wait = 90000;
                break;
            case microbit_version.V1_Turbo:
                microbit_wait = 600;
                break;
            case microbit_version.V2_Turbo:
                microbit_wait = 2500;
                break;


        }
    }



    //% color="#ff3d03" weight=35 blockId=auto_led_off block="micro:bit LED |%Matrix_LED|" group="4 Initial setting"
    export function auto_led_off(Matrix_LED: microbit_LED) {
        switch (Matrix_LED) {
            case microbit_LED.invalid:
                led.enable(false);
                break;
            case microbit_LED.effective:
                led.enable(true);
        }
    }






    //% color="#ffa800" weight=20 blockId=plotter_Distance
    //% block="distance adjustment  short|%Dis|long" group="5 adjustment"
    //% Dis.min=-30 Dis.max=30
    export function plotter_Distance(Dis: number): void {
        cond_Distance = (1 + Dis / 1000);
    }

    //% color="#ffa800" weight=18 blockId=plotter_degree
    //% block="Rotation angle adjustment  Less|%Deg|Many" group="5 adjustment"
    //% Deg.min=-30 Deg.max=30
    export function plotter_degree(Deg: number): void {
        cond_degree = (1 + Deg / 1000);
    }

   //% color="#3943c6" weight=55 blockId=plottercar_R_step
    //% block="Right_wheel|%R_step|step |%houkou|direction" group="5 adjustment"

    export function plottercar_R_step(R_step: number, houkou: plotter_houkou): void {
        moter_number = R_step;
        switch (houkou) {
            case plotter_houkou.forward:
                moter(R_step / 4, 1, 0);
                return;
            case plotter_houkou.back:
                moter(R_step / 4, 2, 0);
                return;
        }
    }
    //% color="#3943c6" weight=58 blockId=plottercar_L_step
    //% block="Left_wheel|%L_step|step |%houkou|direction" group="5 adjustment"
    export function plottercar_L_step(L_step: number, houkou: plotter_houkou): void {
        moter_number = L_step;
        switch (houkou) {
            case plotter_houkou.forward:
                moter(L_step / 4, 0, 1);
                return;
            case plotter_houkou.back:
                moter(L_step / 4, 0, 2);
                return;
        }
    }





    //% color="#009A00" weight=22 blockId=sonar_ping_2 block="Distance sensor" group="6 Ultrasonic_Distance sensor"
    //% advanced=true
    export function sonar_ping_2(): number {
        let d1 = 0;
        let d2 = 0;

        for (let i = 0; i < 5; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P2, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P0, PulseValue.High, 500 * 58);
            d2 = d2 + d1;
        }
        return Math.round(Math.idiv(d2 / 5, 58) * 1.5);
    }

    /*
        //% color="#009A00" weight=21 blockId=sonar_ping_LED block="Display distance" group="6 Ultrasonic_Distance sensor"
        //% advanced=true
        export function sonar_ping_LED() {
            basic.showNumber(sonar_ping_2());
        }
    */





    //% color="#009A00" weight=30 block="(minimam 5cm) dstance |%limit| cm  |%nagasa| " group="6 Ultrasonic_Distance sensor"
    //% limit.min=8 limit.max=30
    //% advanced=true
    export function sonar_ping_3(limit: number, nagasa: kyori): boolean {
        let d1 = 0;
        let d2 = 0;
        if (limit < 8) {
            limit = 8
        }
        for (let i = 0; i < 5; i++) {
            // send
            basic.pause(5);
            pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
            pins.digitalWritePin(DigitalPin.P2, 0);
            control.waitMicros(2);
            pins.digitalWritePin(DigitalPin.P2, 1);
            control.waitMicros(10);
            pins.digitalWritePin(DigitalPin.P2, 0);
            // read
            d1 = pins.pulseIn(DigitalPin.P0, PulseValue.High, 500 * 58);
            d2 = d1 + d2;
        }
        switch (nagasa) {
            case kyori.short:
                if (Math.idiv(d2 / 5, 58) * 1.5 < limit) {
                    return true;
                } else {
                    return false;
                }
                break;
            case kyori.long:
                if (Math.idiv(d2 / 5, 58) * 1.5 < limit) {
                    return false;
                } else {
                    return true;
                }
                break;
        }
    }


    //% color="#f071bd" weight=30 blockId=auto_photo_R block="Right_photoreflector" group="7 photoreflector"
    //% advanced=true
    export function phto_R() {
        return Math.round((pins.analogReadPin(AnalogPin.P10) / 1023) * 100);
    }

    //% color="#f071bd" weight=28 blockId=auto_photo_L block="Left_photoreflector" group="7 photoreflector"
    //% advanced=true
    export function phto_L() {
        return Math.round((pins.analogReadPin(AnalogPin.P1) / 1023) * 100);
    }

    //% color="#d4b41f"  weight=26 block="Right_photoreflector |%limit_R| small" group="7 photoreflector"
    //% limit_R.min=0 limit_R.max=100
    //% advanced=true
    export function photo_R(limit_R: number): boolean {
        if (eureka_plotter_car.phto_R() <= limit_R) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= limit_R) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < limit_R) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#d4b41f"  weight=27 block="Left_photoreflector |%limit_L| small" group="7 photoreflector"
    //% limit_L.min=0 limit_L.max=100
    //% advanced=true
    export function photo_L(limit_L: number): boolean {
        if (eureka_plotter_car.phto_R() <= limit_L) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= limit_L) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < limit_L) {
            return true;
        } else {
            return false;
        }
    }

    //% color="#6041f1"  weight=33 block="only Right |%wb| stepping on  |%sikii| " group="7 photoreflector"
    //% sence.min=10 sence.max=40
    //% advanced=true
    export function photo_R_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.Low_sensitivity) {
            sikii = 40;
        }
        if (sikii == sence_select.normal30) {
            sikii = 30;
        }
        if (sikii == sence_select.High_sensitivity) {
            sikii = 20;
        }
        if (eureka_plotter_car.phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.black:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.white:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }

    //% color="#6041f1"  weight=34 block="onle left |%wb| stepping on threshold |%sikii| " group="7 photoreflector" 
    //% advanced=true
    export function photo_L_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.Low_sensitivity) {
            sikii = 40;
        }
        if (sikii == sence_select.normal30) {
            sikii = 30;
        }
        if (sikii == sence_select.High_sensitivity) {
            sikii = 20;
        }
        if (eureka_plotter_car.phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.black:
                if (

                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 < sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 > sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
            case whiteblack.white:
                if ((pins.analogReadPin(AnalogPin.P1) / 1023) * 100 > sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 < sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }
    }
    //% color="#6041f1"  weight=35 block="Both |%wb| stepping on threshold threshold |%sikii| " group="7 photoreflector"
    //% advanced=true
    export function photo_LR_out(wb: whiteblack, sikii: sence_select): boolean {
        if (sikii == sence_select.Low_sensitivity) {
            sikii = 40;
        }
        if (sikii == sence_select.normal30) {
            sikii = 30;
        }
        if (sikii == sence_select.High_sensitivity) {
            sikii = 20;
        }
        if (eureka_plotter_car.phto_R() <= sikii) {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Red))
        }
        if (eureka_plotter_car.phto_L() <= sikii) {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Green))
        } else {
            io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        }
        io_neo.show()
        switch (wb) {
            case whiteblack.black:
                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 <= sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 <= sikii) {
                    return true;
                } else {
                    return false;
                }
                break;

            case whiteblack.white:

                if (
                    (pins.analogReadPin(AnalogPin.P1) / 1023) * 100 >= sikii && (pins.analogReadPin(AnalogPin.P10) / 1023) * 100 >= sikii) {
                    return true;
                } else {
                    return false;
                }
                break;
        }

    }

    //% color="#009A00"  weight=19 blockId=microbit2_decideLight block="m:bitOptical sensor value |%limit| Darker" group="8 microbit Optical_sensor"
    //% limit.min=0 limit.max=100
    //% advanced=true
    export function microbit2_decideLight(limit: number): boolean {
        if (input.lightLevel() / 254 * 100 < limit) {
            return true;
        } else {
            return false;
        }
    }



    //% color="#009A00"  weight=17 blockId=microbit2_denkitemp block="m:bitOptical sensor value" group="8 microbit Optical_sensor"
    //% advanced=true
    export function microbit2_denkitemp(): number {

        return Math.round(input.lightLevel() / 254 * 100);

    }

    /*
        //% color="#228b22"  weight=16 blockId=microbit2_denkiLED block="m:bit Optical sensor value" group="8 microbit Optical_sensor"
        //% advanced=true
        export function microbit2_denkiLED() {
            basic.showNumber(Math.round(input.lightLevel() / 254 * 100));
        }
    */




}

//% color="#ff4500" weight=94 block="Plotcar_LED"

namespace plotLED_blocks {

    export enum neoLED_color {
        //% block="white
        white,
        //% block="red"
        red,
        //% block="yellow"
        yellow,
        //% block="green"
        green,
        //% block="blue"
        blue,
        //% block="orange"
        orange,
        //% block="indigo"
        indigo,
        //% block="violet"
        violet,
        //% block="purple"
        purple,
        //% block="black"
        black
    }




    //% color="#20b2aa" weight=82 blockId=neopixel_select block="FullcolorLED color|%neo_color| " group="PlotcarLED"
     export function neopixel_select_block(neo_color: neoLED_color) {

        switch (neo_color) {
            case neoLED_color.red:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Red))
                break;
            case neoLED_color.orange:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Orange))
                break;
            case neoLED_color.yellow:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Yellow))
                break;
            case neoLED_color.green:

                    io_neo.showColor(neopixel.colors(NeoPixelColors.Green))
                break;
            case neoLED_color.blue:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Blue))
                break;
            case neoLED_color.indigo:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Indigo))
                break;
            case neoLED_color.violet:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Violet))
                break;
            case neoLED_color.purple:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Purple))
                break;
            case neoLED_color.white:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.White))
                break;
            case neoLED_color.black:
                    io_neo.showColor(neopixel.colors(NeoPixelColors.Black))
                break;
        }
    }

    //% color="#9400d3" weight=81 blockId=neopixel_reinbow block="reinbow" group="PlotcarLED"
    export function neopixel_rainbow() {
        io_neo.showRainbow(1, 180)
    }

    //% color="#cd853f" weight=80 blockId=neopixel_erace block="FullcolorLED All_Erease" group="PlotcarLED"
    export function neopixel_erace_block() {
        for (let n = 0; n < 4; n++) {
            io_neo.showColor(neopixel.colors(NeoPixelColors.Black))
        }
    }

    //% color="#1E90FF" weight=83 block="wait_time(sec)|%second|" group="PlotcarLED"
    //% second.min=0 second.max=10
    export function driveForwards(second: number): void {
        basic.pause(second * 1000);
    }




}



