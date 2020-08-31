radio.onReceivedNumber(function (receivedNumber) {
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) + 128 > 43) {
        _１m以内 = 1
    } else {
        _１m以内 = 0
    }
})
input.onButtonPressed(Button.A, function () {
    _１m以内 = 1 - _１m以内
})
function _15分経っているか確認 () {
    if (_15分計測中 == 1) {
        if (input.runningTime() - _15分タイマー開始時間 > _15分ミリ秒) {
            music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
            basic.showIcon(IconNames.Confused)
            if (!(_１m以内 == 1)) {
                _15分計測中 = 0
            }
        }
    }
}
function リセットするか確認 () {
    if (離れている時間を計測中 == 1) {
        if (input.runningTime() - 一時的に離れているかタイマー開始時間 > 一時的に離れている時間のミリ秒) {
            _15分計測中 = 0
            離れている時間を計測中 = 0
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        }
    }
}
let 一時的に離れているかタイマー開始時間 = 0
let 離れている時間を計測中 = 0
let _15分タイマー開始時間 = 0
let _15分計測中 = 0
let 一時的に離れている時間のミリ秒 = 0
let _15分ミリ秒 = 0
let _１m以内 = 0
radio.setGroup(1)
radio.setTransmitPower(1)
_１m以内 = 0
_15分ミリ秒 = 3 * 60 * 1000
一時的に離れている時間のミリ秒 = 1 * 60 * 1000
basic.forever(function () {
    radio.sendNumber(0)
    if (_１m以内 == 1) {
        if (_15分計測中 == 0) {
            _15分タイマー開始時間 = input.runningTime()
            _15分計測中 = 1
            basic.showIcon(IconNames.Yes)
        }
        離れている時間を計測中 = 0
        basic.showLeds(`
            . # # # .
            # . # . #
            # . # # #
            # . . . #
            . # # # .
            `)
    } else {
        if (離れている時間を計測中 == 0) {
            一時的に離れているかタイマー開始時間 = input.runningTimeMicros()
            離れている時間を計測中 = 1
            basic.showIcon(IconNames.SmallHeart)
        }
        basic.showIcon(IconNames.Happy)
    }
    _15分経っているか確認()
    リセットするか確認()
})
