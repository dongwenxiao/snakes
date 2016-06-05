// socket url
export const SOCKET_SERVER_URL = 'http://localhost:8080'

// socket msg type
// ACTION 是客户端发起的
// MSG 是服务端反馈的
export const ACTION_JOIN = 100
export const ACTION_LEAVE = 101

export const ACTION_START = 200
export const ACTION_RESTART = 201

export const ACTION_MOVE = 300
export const ACTION_TURN_LEFT = 301
export const ACTION_TURN_RIGHT = 302

export const MSG_BIRTH = 400
export const MSG_DEAD = 401

export const MSG_ALL_STATUS = 500 // 全部蛇的状态
export const MSG_FOODS_STATUS = 501 // 全部豆子的状态