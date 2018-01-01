# Airbnb JavaScript Style 阅读注解

*提供一种合理的javascript的规范*

## Table of Contents

  1. [Types](#types)
  2. [References](#references)
  3. [Objects](#objects)
  4. [Arrays](#arrays)
  5. [Destructuring](#destructuring)
  6. [Strings](#strings)
  7. [Functions](#functions)
  8. [Arrow Functions](#arrow-functions)
  9. [Classes & Constructors](#classes--constructors)
  10. [Modules](#modules)
  11. [Iterators and Generators](#iterators-and-generators)
  12. [Properties](#properties)
  13. [Variables](#variables)
  14. [Hoisting](#hoisting)
  15. [Comparison Operators & Equality](#comparison-operators--equality)
  16. [Blocks](#blocks)
  17. [Control Statements](#control-statements)
  18. [Comments](#comments)
  19. [Whitespace](#whitespace)
  20. [Commas](#commas)
  21. [Semicolons](#semicolons)
  22. [Type Casting & Coercion](#type-casting--coercion)
  23. [Naming Conventions](#naming-conventions)
  24. [Accessors](#accessors)
  25. [Events](#events)
  26. [jQuery](#jquery)
  27. [ECMAScript 5 Compatibility](#ecmascript-5-compatibility)
  28. [ECMAScript 6+ (ES 2015+) Styles](#ecmascript-6-es-2015-styles)
  29. [Standard Library](#standard-library)
  30. [Testing](#testing)
  31. [Performance](#performance)
  32. [Resources](#resources)
  33. [In the Wild](#in-the-wild)
  34. [Translation](#translation)
  35. [The JavaScript Style Guide Guide](#the-javascript-style-guide-guide)
  36. [Chat With Us About JavaScript](#chat-with-us-about-javascript)
  37. [Contributors](#contributors)
  38. [License](#license)
  39. [Amendments](#amendments)

## Table of Notes

  1. [symbol](#note1)
  2. [const,let,block-scoped,function-scoped](#note2)
  3. [call,assign(),...](#note3)          

## Types

 - 简单的基本数据类型，直接使用其值

     - `string`
     - `number`
     - `boolean`
     - `null`
     - `undefined`
     - `symbol`

    ```javascript
    const foo = 1;
    let bar = foo;
    bar = 9;
    console.log(foo, bar); // => 1, 9
    ```

 - 复杂的基本数据类型，直接使用其值的引用

     - `object`
     - `array`
     - `function`

    ```javascript
    const foo = [1, 2];
    const bar = foo;
    bar[0] = 9;
    console.log(foo[0], bar[0]); // => 9, 9
    ```      

**[⬆ back to table](#table-of-contents)**

#### note1

 - Symbol

`symbol`自ES6引入，目的是提供一种机制，保证每个属性名都是唯一的，从根本上防止属性名的冲突。在这之前，对象属性名都是字符串。其实看到这里，`string`和`symbol`类型有点`class`和`id`的意思

`Symbol()`的声明，因为 `Symbol()`返回值是一个类似于字符串的基本类型，不是一个对象，所以不能使用 `new` 命令
    
    ```javascript
    let ylone = Symbol();
    typeof(ylone);
    👇   
    "symbol"

    //为声明加上描述
    let ylone1 = Symbol('hello');
    ylone1;
    👇
    Symbol(hello)
    ```

无论是不加描述，还是所加的描述相同， `Symbol()` 函数的返回值都不相同

`Symbol.for('key')` 也会返回一个Symbol,但是`Symbol.for()`采用登记机制（会被登记在**全局环境**中供搜索），如果之前`key`已经存在，则直接返回该值，否则新建一个值。比如，如果你调用 `Symbol.for("cat")`30 次，每次都会返回同一个Symbol值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的Symbol值。

`Symbol`本身不能与其他值进行运算，但是可以转换成字符串和布尔类型

对象中使用`Symbol()`。通过对比之前通过 `a['string']` 的方式，相当于多了一步转换，来保证属性命名的安全。

    ```javascript
    let mySymbol = Symbol();
    // 第一种写法
    let a = {};
    a[mySymbol] = 'Hello!';

    // 第二种写法
    let a = {
        [mySymbol]: 'Hello!'
    };
        
    // 第三种写法
    let a = {};
    Object.defineProperty(a, mySymbol, { value: 'Hello!' });
        
    a[mySymbol]
    👇
    'hello!'    

**注意**，由于 `.` 运算符后面总是字符串，所以`Symbol()` 不支持点式声明对象属性。在对象内部使用 `[symbol]` 这样的写法也是这个道理

**[⬆ back to note](#table-of-note)**

## References

 - 声明创建一个值时用 `const` 而不用 `var`，这样可以保证你声明的值不会被重定义

     ```javascript
    // bad
    var a = 1;
    var b = 2;
    
    // good
    const a = 1;
    const b = 2;
    ```

  - 如果需要改变声明所创建的值，用`let`而不是`var`,因为 `let` 是块级作用域元素， `var` 是函数作用域元素   

      ```javascript
    // bad
    var count = 1;
    if (true) {
      count += 1;
    }
    
    // good, use the let.
    let count = 1;
    if (true) {
      count += 1;
    }
    ```

 - 注意，`let`和`const` 都是块级作用域函数，他们都只存在于他们被定义的块中

     ```javascript
    // const and let only exist in the blocks they are defined in.
    {
      let a = 1;
      const b = 1;
    }
    console.log(a); // ReferenceError
    console.log(b); // ReferenceError
    ```

**[⬆ back to table](#table-of-contents)**

#### note2

 - const

块级作用域的常量，此声明创建一个常量，其作用域可以是全局或本地声明的**块**。声明时需要指定其值作为一个常数的初始化器。一般情况下， `const` 声明的值不能改变，但是对象元素可以改变其属性，数组元素可以向其中添加值，但是不能重新赋值

    ```javascript
    const a = 100;
    a = 10; 👉 Uncaught TypeError: Assignment to constant variable
        
    const a = [];
    a.push('a'); ✔
    a = ['a']; 👉 Uncaught TypeError: Assignment to constant variable
        
    const obj = {'name':'ylone'};
    obj['name'] = 'yh'; ✔
    obj = {'name':'yh'}; 👉 Uncaught TypeError: Assignment to constant variable
    ```
**注意**，chrome30严格模式下不能使用，`const(Uncaught SyntaxError: Use of const in strict mode. )`   

 - let 

let允许你声明一个作用域被限制在块级中的变量、语句或者表达式。let声明的变量只在其声明的块或子块中可用，这一点，与var相似。二者之间最主要的区别在于var声明的变量的作用域是整个封闭函数。

    ```javascript
    var q = 1;
    var w = 2;
    if(true){
    var q = 11;
    let w = 22;
    console.log(q,w); 👉(11,22)
    }
    console.log(q,w); 👉(11,2)

 - block-scoped

在其他类C语言中，由 `{}` 封闭的代码块即为 `block-scoped`,`{..block-scoped..}`

    ```javascript
    if(true){
    var a = 100;
    }
    a; 👉 100
        
    if(true){
    let b = 100;
    }
    b; 👉 Uncaught ReferenceError: b is not defined
    ```
如果是类C语言中，`a`会在if语句执行完毕后销毁，但是在javascript中，if中的变量声明会将变脸那个添加到当前的执行环境中，这里可以看出 `var与let的区别`，`var` 声明的变量会自动被添加到最接近的执行环境中，`let`声明的变量则只会存在与块级作用域中。

 - function-scoped

函数作用域，每个函数被声明时的上下文执行环境，`fucnction(){..function-scoped..}` 

**[⬆ back to note](#table-of-note)**

## Objects

 - 直接使用 `{}` 来创建对象，因为这样更加简洁，性能上和 `new Object()` 也没差

    ```javascript
    // bad
    const item = new Object();

    // good
    const item = {};
    ```

 - 创建拥有动态属性名的对象时，用计算机属性名来表示，这样可以在创建对象时，将所有的属性写在同一个地方

     ```javascript
    function getKey(k) {
      return `a key named ${k}`;
    }

    // bad
    const obj = {
      id: 5,
      name: 'San Francisco',
    };
    obj[getKey('enabled')] = true;

    // good
    const obj = {
      id: 5,
      name: 'San Francisco',
      [getKey('enabled')]: true,
    };
    ```

 - 对象属性中有函数方法时，使用更简洁的对象字面值方法

     ```javascript
    // bad
    const atom = {
      value: 1,
      addValue: function (value) {
        return atom.value + value;
      },
    };

    // good
    const atom = {
      value: 1,
      addValue(value) {
        return atom.value + value;
      },
    };
    ```    

 - 对象属性和属性值一致时，使用更简洁的对象字面值属性

     ```javascript
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      lukeSkywalker: lukeSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
    };
    ```

 - 声明对象时，根据是否使用速记，简单地对对象的属性分下类

     ```javascript
    const anakinSkywalker = 'Anakin Skywalker';
    const lukeSkywalker = 'Luke Skywalker';

    // bad
    const obj = {
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      lukeSkywalker,
      episodeThree: 3,
      mayTheFourth: 4,
      anakinSkywalker,
    };

    // good
    const obj = {
      lukeSkywalker,
      anakinSkywalker,
      episodeOne: 1,
      twoJediWalkIntoACantina: 2,
      episodeThree: 3,
      mayTheFourth: 4,
    };
    ```

 - 仅给有特殊符号的标识符提供引号，实际上对象的属性默认为字符串类型，除非用`[]`标记为符号类型。这样做的好处在于，增强代码高亮，方便阅读，并且对js引擎更加友好

     ```javascript
    // bad
    const bad = {
      'foo': 3,
      'bar': 4,
      'data-blah': 5,
    };

    // good
    const good = {
      foo: 3,
      bar: 4,
      'data-blah': 5,
    };
    ```

 - 不要直接调用`Object.prototype`下的方法，比如 `hasOwnProperty`,`isPrototypeOf`,`propertyIsEnumerable`等，因为这些方法可能被覆盖`{ hasOwnProperty: false }` ，或者对象为空报错

     ```javascript
    // bad
    console.log(object.hasOwnProperty(key));

    // good
    console.log(Object.prototype.hasOwnProperty.call(object, key));

    // best
    const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
    /* or */
    import has from 'has'; // https://www.npmjs.com/package/has
    // ...
    console.log(has.call(object, key));
    ``` 

 - 用对象扩散运算符和对象剩余运算符，而不是 `Object.assign` 来进行浅拷贝操作

     ```javascript
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this

    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

    // good
    const original = { a: 1, b: 2 };
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

     // noA => { b: 2, c: 3 }
    ```

**[⬆ back to table](#table-of-contents)**

#### note3

 - call()

`Function.prototype.call()`,调用一个函数，其具有指定的 `this` 值和参数列表。**注意**，该方法和 `apply()` 方法类似，区别在于 `apply()` 传参为一个包含多个参数的数组。可以让call()中的对象调用当前对象所拥有的function。

使用 `call()` 调用父构造函数,在一个子构造函数中，你可以通过调用父构造函数的 call 方法来实现继承，类似于Java中的写法

    ```javascript
    //父构造函数，写一些公用的方法和属性
    function a(v1,v2){
        this.name = v1;
        this.cool = v2;
    } 
    //子构造函数，可以继承父构造函数的方法和属性，同时可以有私有的方法和属性
    function b(v1,v2,v3){
        a.call(this,v1,v2);
        this.sex = v3;
    }
    var v1 = new a('ylone',true);
    var v2 = new b('ylone',true,'male');
    v1; 👉 {name: "ylone", cool: true}
    v2; 👉 {name: "ylone", cool: true, sex: "male"}
    ``` 

使用 `call()` 调用匿名函数，将参数作为指定的 `this值`，传进匿名函数。同时也可以传递普通参数。

    ```javascript
    var i = 1;
    (function(i){console.log(this,i)}).call(Math.random(),i);
    👉 0.9604319664333041 1
    ```

使用 `call()` 调用函数并且指定执行环境的this

    ```javascript
    function a(){
        console.log(this.name + ' is ' + this.cool);
    };
    var i = {name: 'ylone', cool: 'cool'};
    a.call(i); 👉 ylone is cool
    ``` 

- Object.assign()

和 `$.extend()`类似，用于对象的合并，将源对象内所有可枚举的属性拷贝到目标对象，**注意**如果源数据不是对象，则先会转换成对象；如果是`null`或者`undefined`等不能转换成对象的类型，则根据其位置进行跳过或者报错。

    ```javascript
    Object.assign(null); 👉 Uncaught TypeError: Cannot convert undefined or null to object

    Object.assign(1,null); 👉 Number {1}
    ```

`Object.assign()`仅支持浅拷贝，也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用

    ```javascript
    var v1 = {a:{b:'b'}};
    var v2 = Object.assign({},v1);
    v1.a.b = 'c';
    v2.a.b; 👉 'c'
    ```

`Object.assign()` 处理数组，会先把数组转换成对象，将其视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。

    ```javascript
    Object.assign([1, 2, 3], [4, 5]);
    👇
    Object.assign({0:1,1:2,2:3},{0:4,1:5});
    👇
    {0:4,1:5,2:3}
    👇
    [4,5,3]
    ``` 
 - `...`

对象扩散运算符和对象剩余运算符都用 `...` 表示，可以理解为“脱衣服”方法

数组转换，将数组转换成逗号分隔的参数序列，**注意**，其返回值并不是某个基本类型，所以该方法多用于函数参数设置，代替 `apply()` 方法。对于很多参数不能接受数组的方法提供了便利。

    ```javascript
    ...[1,2,3] 👉 Uncaught SyntaxError: Unexpected number

    [...[1,2,3]] 👉 [1, 2, 3]

    [1,...[2,3],4] 👉 [1, 2, 3, 4]

    //Math.max()不支持数组传参，之前通过apply()进行转换
    Math.max.apply(null,[1,2,3]) 👉 3
    //现在可以利用 ... 直接进行转换
    Math.max(...[1,2,3]) 👉 3
    ```

**[⬆ back to note](#table-of-note)**

## Arrays

 - 使用 `[]` 来创建数组

     ```javascript
    // bad
    const items = new Array();

    // good
    const items = [];
    ```

 - 使用 `push()` 而不是直接给数组项赋值

    ```javascript
    const someStack = [];

    // bad
    someStack[someStack.length] = 'abracadabra';

    // good
    someStack.push('abracadabra');
    ```

 - 使用 `...` 拷贝数组

     ```javascript
    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;

    for (i = 0; i < len; i += 1) {
      itemsCopy[i] = items[i];
    }

    // good
    const itemsCopy = [...items];
    ```                           
