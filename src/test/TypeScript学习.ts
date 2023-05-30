const str: string = 'ok'
const num: number = 123
const bool: boolean = true
const sym: symbol = Symbol()
const big: bigint = 100n
const nu: null = null
const un: undefined = undefined

// 泛型
const arr: Array<number | string> = [1, 2, 3, 4, 5, '6']

// 元组
const tup1: [string, number] = ['hello', 2]
tup1.push('hello')
console.log(tup1)
