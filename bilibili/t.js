const semver = require('semver')
semver.minVersion("^3.0.1").version

console.log(semver.minVersion("^5.0.0"))
console.log(semver.satisfies('2.0.0', '1.x.x'))
console.log(semver.minVersion(">=1.0.0").version)
console.log(semver.minVersion(">=4.0.0 <4.1.0-0").version)
console.log(semver.minVersion("1.1.x").version)