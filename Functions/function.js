const codeABC = {
    nameOfthis: "code ABC",
    founder: "Shahjalal rafi",
    established: 2021,

    aboutPlatform: function(month) {
        // console.log(this)
        console.log(`the founder of ${this.nameOfthis} is ${this.founder} and established in ${month} ${this.established}`)
    }
}


const stackLearner = {
    nameOfthis: "Stack Learner",
    founder: "Hm Nayeem",
    established: 2017,
}


let aboutPlatformFunc = codeABC.aboutPlatform

// codeABC.aboutPlatform("october")

// call
// aboutPlatformFunc.call(stackLearner, "January")

// apply
// aboutPlatformFunc.apply(stackLearner, ["february"])

// bind
let platformBound = aboutPlatformFunc.bind(stackLearner)
// platformBound("may")
// platformBound("december")







function sum(price, quantity) {
    return price * quantity
}

// console.log(sum.call(null ,3, 5))
// console.log(sum.apply(null ,[3, 5]))

let boundSum = sum.bind(null, 2)

// console.log(boundSum(10))
// console.log(boundSum(36))