//: Playground - noun: a place where people can play

import UIKit

let str = "00000"

for index in 101...200 {
    let len = str.lengthOfBytes(using: String.Encoding.utf8)
    let num2 = Int(str, radix: 16)! + index
    let newStr = NSString(format: "%0\(len)X" as NSString, num2) as String

    print("0520001\(newStr)")
}
