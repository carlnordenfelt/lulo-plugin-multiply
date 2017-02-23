# lulo multiply

lulo multiply is a plugin for [lulo](https://github.com/carlnordenfelt/lulo).
It takes two factors, multiplies them and responds with the product.

# Installation
```
$ npm install lulo-plugin-multiply --save
```

## Usage
### Properties
* `LeftFactor`: The left factor of the multiplication. Required
* `RightFactor`: The right factor of the multiplication. Required
* `DecimalPoints`: The number of decimals to include in the product. Optional. Default is all.

### Return Values
#### Fn::GetAtt
Product The product

Fn::GetAtt["Multiply", "Product"]
### Required IAM Permissions
The Custom Resource Lambda requires no additional IAM Permissions.

## License
[The MIT License (MIT)](/LICENSE)

## Change Log
[Change Log](/CHANGELOG.md)
