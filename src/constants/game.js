export const BASE_UNIT = 12

// size
export const TILE_WIDTH = BASE_UNIT
export const TILE_HEIGHT = BASE_UNIT
export const TILE_COUNT_H = 100
export const TILE_COUNT_V = 60
export const MAP_WIDTH = TILE_WIDTH * TILE_COUNT_H
export const MAP_HEIGHT = TILE_HEIGHT * TILE_COUNT_V

// logic
export const CPS = 20 // 检测频率  20次/秒

// snake
export const JOINTS_WIDTH = BASE_UNIT
export const JOINTS_HEIGHT = BASE_UNIT
export const SNAKE_SPEED = 4 // 2格/秒
export const DEFAULT_JOINTS_COUNT = 3 // 默认3节关节
export const SNAKE_COLOR = 'red' // 默认红色

// foods
export const MAX_FOOD_COUNT = 15 // 最多显示5个豆子
export const RANDOM_ADD_COUNT = 3 // 每次随机添加3个豆子
export const FOOD_COLORS = ['red', 'blue', 'green', 'pink'] // 豆子颜色

// random user names
export const RANDOM_NAMES = ['二货', '吃货', '能攻能守', 'T', '山炮', '三炮']