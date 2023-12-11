import getDirection from '../../utils/getDirection'

import getCompassDirection from './getCompassDirection'
import getDiagonalDirection from './getDiagonalDirection'
import getDPadDiagonalDirection from './getDPadDiagonalDirection'
import getNormalizedStickPosition from './getNormalizedStickPosition'
import getStickIntensity from './getStickIntensity'
import normalizeButtonValue from './normalizeButtonValue'

export default (gamepad, { leftStickInnerDeadzone, leftStickOuterDeadzone, rightStickInnerDeadzone, rightStickOuterDeadzone }) => {
  const leftStickX = getNormalizedStickPosition(gamepad.axes[0], leftStickInnerDeadzone, leftStickOuterDeadzone)
  const leftStickY = getNormalizedStickPosition(gamepad.axes[1], leftStickInnerDeadzone, leftStickOuterDeadzone)
  const leftStickDirection = getDirection(leftStickX, leftStickY)

  const rightStickX = getNormalizedStickPosition(gamepad.axes[2], rightStickInnerDeadzone, rightStickOuterDeadzone)
  const rightStickY = getNormalizedStickPosition(gamepad.axes[3], rightStickInnerDeadzone, rightStickOuterDeadzone)
  const rightStickDirection = getDirection(rightStickX, rightStickY)

  const dPadUp = normalizeButtonValue(gamepad.buttons[12])
  const dPadDown = normalizeButtonValue(gamepad.buttons[13])
  const dPadLeft = normalizeButtonValue(gamepad.buttons[14])
  const dPadRight = normalizeButtonValue(gamepad.buttons[15])

  const dPadDiagonalDirection = getDPadDiagonalDirection(dPadUp, dPadDown, dPadLeft, dPadRight)

  return {
    leftStickX,
    leftStickY,
    leftStickIntensity: getStickIntensity(leftStickX, leftStickY),
    leftStickDirection,
    leftStickCompassDirection: getCompassDirection(leftStickDirection),
    leftStickDiagonalDirection: getDiagonalDirection(leftStickDirection),

    rightStickX,
    rightStickY,
    rightStickIntensity: getStickIntensity(rightStickX, rightStickY),
    rightStickDirection,
    rightStickCompassDirection: getCompassDirection(rightStickDirection),
    rightStickDiagonalDirection: getDiagonalDirection(rightStickDirection),

    faceButtonA: normalizeButtonValue(gamepad.buttons[0]),
    faceButtonX: normalizeButtonValue(gamepad.buttons[2]),
    faceButtonY: normalizeButtonValue(gamepad.buttons[3]),
    faceButtonB: normalizeButtonValue(gamepad.buttons[1]),

    dPadUp,
    dPadDown,
    dPadLeft,
    dPadRight,

    dPadDirection: dPadDiagonalDirection * 45,
    dPadCompassDirection: Math.floor(dPadDiagonalDirection / 2),
    dPadDiagonalDirection,

    leftTrigger: normalizeButtonValue(gamepad.buttons[6]),
    rightTrigger: normalizeButtonValue(gamepad.buttons[7]),

    leftBumper: normalizeButtonValue(gamepad.buttons[4]),
    rightBumper: normalizeButtonValue(gamepad.buttons[5]),

    leftStickButton: normalizeButtonValue(gamepad.buttons[10]),
    rightStickButton: normalizeButtonValue(gamepad.buttons[11]),

    select: normalizeButtonValue(gamepad.buttons[8]),
    start: normalizeButtonValue(gamepad.buttons[9]),

    vendor: normalizeButtonValue(gamepad.buttons[16])
  }
}
