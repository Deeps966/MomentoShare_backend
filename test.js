const _ = require('underscore')

members = [
  {
    "memberID": "64f42c3867ee08d0d4814fb4",
    "memberRole": "ADMIN",
    "uploadAccess": false,
    "isLeft": false,
    "isNotificationMute": false,
    "_id": "64f479a3c042565a0eadc4ed",
    "joinedAt": "2023-09-03T12:18:43.434Z"
  },
  {
    "memberID": "64ee123dbe5a1224cef1f96e",
    "memberRole": "MEMBER",
    "uploadAccess": false,
    "isLeft": false,
    "isNotificationMute": false,
    "_id": "64f479a3c042565a0eadc4ee",
    "joinedAt": "2023-09-03T12:18:43.434Z"
  }
]

const data = _.find(members, (m) => m.memberRole == "ADMIN" && m.memberID == "64f42c3867ee08d0d4814fb4")
console.log(data)

const mongoose = require('mongoose')
const id = new mongoose.Types.ObjectId('64f42c3867ee08d0d4814fb4')

console.log(id)

const path = require('path')
let ext = path.extname(`public\\uploads\\video\\64f4cee83d4da5c49434cca5\\1693841814765_X-Men.10.Logan.(2017).mkv`)
console.log(ext)