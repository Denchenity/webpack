

const unusedErr = 42

class Util {
    static id = Date.now
}





console.log('Util.id:', Util.id)
console.log(unusedErr)

import('lodash').then(_=>{
    console.log('lodash', _.random(0,42,true))
})