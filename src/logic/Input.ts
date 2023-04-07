export enum Action {
    Left = 'Left',
    FastDrop = 'FastDrop',
    Pause = 'Pause',
    Right = 'Right',
    Rotate = 'Rotate',
    SlowDrop = 'SlowDrop'
}

export const Key: {[key: string]: Action} = {
    ArrowUp: Action.Rotate,
    ArrowDown: Action.SlowDrop,
    ArrowLeft: Action.Left,
    ArrowRight: Action.Right,
    KeyP: Action.Pause,
    Space: Action.FastDrop
};

export const actionForKey = (keyCode: string) => Key[keyCode];
