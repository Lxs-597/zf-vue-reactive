export const isObject = (val: unknown) => typeof val === 'object' && val !== null

export const isSymbol = (val: unknown) => typeof val === 'symbol'

export const isArray = (val: unknown) => Array.isArray(val)

export const hasOwn = (target: any, key: string) => Object.prototype.hasOwnProperty.call(target, key)

export const isInteger = (val: string) => '' + parseInt(val, 10) === val