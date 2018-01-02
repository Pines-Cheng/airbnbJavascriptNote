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

## Table of Notes

  1. [symbol](#note1)
  2. [const,let,block-scoped,function-scoped](#note2)
  3. [call,assign(),...](#note3)
  4. [Array.from()](#note4)
  5. [Destructuring](#note5)
  6. [Default Function Parameter](#note6)          

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

 - 使用 `push()` 来新增元素而不是直接给数组项赋值

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

 - 使用 `...` 将数组对象转换为数组

    ```javascript
    const foo = document.querySelectorAll('.foo');

    // good
    const nodes = Array.from(foo);

    // best
    const nodes = [...foo];
    ```

 - 用 `array.from()` 而不是 `...` 遍历迭代器，这样避免产生了中间变量                                   

    ```javascript
    // bad
    const baz = [...foo].map(bar);

    // good
    const baz = Array.from(foo, bar);
    ```

 - 数组方法的回调中使用return语句，如果函数体由单语句组成，返回值没有副作用，return也可以忽略

    ```javascript
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map(x => x + 1);

    // bad - no returned value means `memo` becomes undefined after the first iteration
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item);
      memo[index] = flatten;
    });

    // good
    [[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
      const flatten = memo.concat(item);
      memo[index] = flatten;
      return flatten;
    });

    // bad
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      } else {
        return false;
      }
    });

    // good
    inbox.filter((msg) => {
      const { subject, author } = msg;
      if (subject === 'Mockingbird') {
        return author === 'Harper Lee';
      }

      return false;
    });
    ```

 - 如果数组有多行，在数组项开始和结束时使用换行符

    ```javascript
    // bad
    const arr = [
      [0, 1], [2, 3], [4, 5],
    ];

    const objectInArray = [{
      id: 1,
    }, {
      id: 2,
    }];

    const numberInArray = [
      1, 2,
    ];

    // good
    const arr = [[0, 1], [2, 3], [4, 5]];

    const objectInArray = [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ];

    const numberInArray = [
      1,
      2,
    ];
    ``` 

**[⬆ back to table](#table-of-contents)**

#### note4

 - Array.from()

 - `Array.from()`方法从一个类似数组（一个对象必须有length属性）或可迭代对象中创建一个新的数组实例，比如 array,map,set,string

    ```javascript
     //数组
     const arr = ['1','2','3'];
     Array.from(arr); 👉 ["1", "2", "3"]

     //字符串
     const str = 'ylone';
     Array.from(str); 👉 ["y", "l", "o", "n", "e"]

     //map对象
     const m1 = new Map();
     m1.set('v1',1);
     m2.set('v2',2);
     m2; 👉 {"v1" => 1, "v2" => 2} 
     Array.from(m2); 👉 [['v1',1],['v2',2]]

     //json对象
     const j = {'v1':1,'v2':2};
     j.length; 👉 undefined
     Array.from(j); 👉 []  
    ```
 - Array.from(arrayLike, mapFn, thisArg)

   - `arrayLike`表示想要转换成数组的伪数组对象或可迭代对象

   - `mapFn（可选参数）`表示新数组中的每个元素会执行该回调函数

   - `thisArg（可选参数）`表示执行回调函数`mapFn`时`this`对象

    ```javascript
    Array.from([1,2,3], function(n){return n+1})
    👇
    [2, 3, 4]
    ```     

**[⬆ back to note](#table-of-note)**

## Destructuring

 - 访问和使用对象的多个属性时，使用对象解构。这样可以避免为这些属性创建临时引用，保持代码的整洁。

    ```javascript
    // bad
    function getFullName(user) {
      const firstName = user.firstName;
      const lastName = user.lastName;

      return `${firstName} ${lastName}`;
    }

    // good
    function getFullName(user) {
      const { firstName, lastName } = user;
      return `${firstName} ${lastName}`;
    }

    // best
    function getFullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    }
    ```

 - 使用数组解构

    ```javascript
    const arr = [1, 2, 3, 4];

    // bad
    const first = arr[0];
    const second = arr[1];

    // good
    const [first, second] = arr;
    ```

 - 使用对象解构而不是数组解构来实现多个返回值。这样，您可以添加新的属性或者更改属性顺序

    ```javascript
    // bad
    function processInput(input) {
      return [left, right, top, bottom];
    }

    // the caller needs to think about the order of return data
    const [left, __, top] = processInput(input);

    // good
    function processInput(input) {
      return { left, right, top, bottom };
    }

    // the caller selects only the data they need
    const { left, top } = processInput(input);
    ``` 

**[⬆ back to table](#table-of-contents)**

#### note4

 - *Destructuring*：解构。解构的作用是可以快速取得数组或对象当中的元素或属性，而无需使用arr[x]或者obj[key]等传统方式进行赋值。

    ```javascript
      //数组解构
      const arr = [1,[2,3],4];
      const [a,[b,c],d] = arr;
      a,b,c,d; 👉 1,2,3,4
      //函数传参
      var arr = [1, 2, 3];
      function fn1([a, b, c]) {
        return a+b+c;
      }
      fn1(arr); 👉 6
    ```  
**[⬆ back to note](#table-of-note)**

## Strings

 - 使用单引号 `''`

    ```javascript
    // bad
    const name = "Capt. Janeway";

    // bad - template literals should contain interpolation or newlines
    const name = `Capt. Janeway`;

    // good
    const name = 'Capt. Janeway';
    ```

 - 如果字符串很长，不要通过字符串连接符进行换行，保持原来的字符串形式就好。因为破坏字符串是一件很不好的事情，同时也减少了代码的可读性

    ```javascript
    // bad
    const errorMessage = 'This is a super long error that was thrown because \
    of Batman. When you stop to think about how Batman had anything to do \
    with this, you would get nowhere \
    fast.';

    // bad
    const errorMessage = 'This is a super long error that was thrown because ' +
      'of Batman. When you stop to think about how Batman had anything to do ' +
      'with this, you would get nowhere fast.';

    // good
    const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    ```

 - 当字符串中有变量时，使用模板字符串而不是连字符。这样代码更加简洁可读。

    ```javascript
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }

    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }

    // bad
    function sayHi(name) {
      return `How are you, ${ name }?`;
    }

    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    ```

 - 不要使用`eval()`方法，因为它有潜在的危险，在不受信任的代码上使用可以打开一个程序多达几种不同的注入攻击。

 - 在字符串中不要随意使用 `\`，因为它影响可读性，同时可能与转义符产生火花

    ```javascript
    // bad
    const foo = '\'this\' \i\s \"quoted\"';

    // good
    const foo = '\'this\' is "quoted"';
    const foo = `my name is '${name}'`;
    ```                

**[⬆ back to table](#table-of-contents)**

## Functions

 - 使用命名函数表达式而不是函数声明。因为如果一个函数声明被挂起之后，很容易在它被定义之前就去引用，这就很影响代码的可读性和可维护性。同时，如果一个函数的功能比较复杂，需要用函数名来对其进行一定的描述

    ```javascript
    // bad
    function foo() {
      // ...
    }

    // bad
    const foo = function () {
      // ...
    };

    // good
    // lexical name distinguished from the variable-referenced invocation(s)
    const short = function longUniqueMoreDescriptiveLexicalFoo() {
      // ...
    };
    ```

 - 在 `()` 创建的函数需要立即调用，自调用函数相当于一个独立模块。事实上，IIFE很少在项目中使用 
 
    ```javascript
    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());
    ```     

 - 不要在非功能模块（`if`,`while`等）里面声明一个函数。将函数分配给一个变量来替代它。因为虽然浏览器支持这种做法，但是他们各自的解析方式并不一样

 - ECMA-262 定义 ‘块’ 表示一个语句列表，函数声明并不是一个语句，跟上一点类似

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }

    // good
    let test;
    if (currentUser) {
      test = () => {
        console.log('Yup.');
      };
    }
    ```

 - 永远不要给参数命名为 `arguments`，这将导致每个函数作用域的 `arguments`对象被优先替换
 
    ```javascript
    // bad
    function foo(name, options, arguments) {
      // ...
    }

    // good
    function foo(name, options, args) {
      // ...
    }
    ```

 - 永远不要使用 `arguments`，而使用 `...`，因为 `arguments` 只是类似数组

    ```javascript
    // bad
    function concatenateAll() {
      const args = Array.prototype.slice.call(arguments);
      return args.join('');
    }

    // good
    function concatenateAll(...args) {
      return args.join('');
    }
    ```

 - 使用函数默认参数语法而不是改变函数的参数

    ```javascript
    // really bad
    function handleThings(opts) {
      // No! We shouldn’t mutate function arguments.
      // Double bad: if opts is falsy it'll be set to an object which may
      // be what you want but it can introduce subtle bugs.
      opts = opts || {};
      // ...
    }

    // still bad
    function handleThings(opts) {
      if (opts === void 0) {
        opts = {};
      }
      // ...
    }

    // good
    function handleThings(opts = {}) {
      // ...
    }
    ```

 - 避免函数默认参数使用不当，使用时要考虑场景

    ```javascript
    var b = 1;
    // bad
    function count(a = b++) {
      console.log(a);
    }
    count();  // 1
    count();  // 2
    count(3); // 3
    count();  // 3
    ```

 - 总是将函数默认参数放在传参的最后

    ```javascript
    // bad
    function handleThings(opts = {}, name) {
      // ...
    }

    // good
    function handleThings(name, opts = {}) {
      // ...
    }
    ```

 - 永远不要使用 `Function` 构造函数来创建一个新的函数，因为它和 `eval()` 沆瀣一气

    ```javascript
    // bad
    var add = new Function('a', 'b', 'return a + b');

    // still bad
    var subtract = Function('a', 'b', 'return a - b');
    ```

 - 函数签名的间距，添加或删除名称时不需要添加或删除空格，保持一致性

    ```javascript
    // bad
    const f = function(){};
    const g = function (){};
    const h = function() {};

    // good
    const x = function () {};
    const y = function a() {};
    ```

 - 不要改变参数，因为操作最为参数传入的对象可能会改变原对象从而对其他调用产生影响

    ```javascript
    // bad
    function f1(obj) {
      obj.key = 1;
    }

    // good
    function f2(obj) {
      const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
    }
    ```

 - 不要重新分配参数，特别是在访问arguments对象时

    ```javascript
    // bad
    function f1(a) {
      a = 1;
      // ...
    }

    function f2(a) {
      if (!a) { a = 1; }
      // ...
    }

    // good
    function f3(a) {
      const b = a || 1;
      // ...
    }

    function f4(a = 1) {
      // ...
    }
    ```

 - 优先使用 `...` 来调用可变参数函数，因为 `...` 很干净，不需要提供上下文环境，并且你不能轻易地使用 `apply()`和 `new`方法
 
    ```javascript
    // bad
    const x = [1, 2, 3, 4, 5];
    console.log.apply(console, x);

    // good
    const x = [1, 2, 3, 4, 5];
    console.log(...x);

    // bad
    new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

    // good
    new Date(...[2016, 8, 5]);
    ```

 - 使用函数如果有多行签名或者调用，应该每个 item 单独放一行，并在最后一项放置一个尾随逗号

    ```javascript
    // bad
    function foo(bar,
                 baz,
                 quux) {
      // ...
    }

    // good
    function foo(
      bar,
      baz,
      quux,
    ) {
      // ...
    }

    // bad
    console.log(foo,
      bar,
      baz);

    // good
    console.log(
      foo,
      bar,
      baz,
    );
    ```                                                            

**[⬆ back to table](#table-of-contents)**

#### note6

 - **函数默认参数**，允许在没有值或undefined被传入时使用默认形参

 - 函数形式：`function(name){param1 = defaultValue1,...,paramN = defaultValueN}`

 - JavaScript中函数的参数默认是 `undefined`

    ```javascript
    const a = function test(v1,v2=1){
        return v1*v2;
    }
    a(5,5); 👉 25
    a(5); 👉 5
    a(void 0,5); 👉 NaN  
    ```

 - 可以看出，当设置了函数默认参数后，如果传参为 `undefined`，则会用默认参数替换，否则为原传参值

 - 有默认值的解构函数，通过解构赋值为参数赋值

    ```javascript
    const b = function test([a,b]=[1,2],{c:c}={c:3}){
      return a+b+c;
    }
    b(); 👉 6
    b([2,3],4); 👉 9
    b(void 0,4); 👉 9
    b([void 0,3],4); 👉 NaN
    ```     

**[⬆ back to note](#table-of-note)** 

## Arrow Functions

 - 当需要使用一个匿名函数时（比如在传递内联回调时），使用箭头函数表示

    ```javascript
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```

 - 如果一个函数的返回值是一个无副作用的单语句，则省略大括号并且隐式返回，否则保留大括号并且使用return声明

    ```javascript
    // bad
    [1, 2, 3].map(number => {
      const nextNumber = number + 1;
      `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map(number => `A string containing the ${number}.`);

    // good
    [1, 2, 3].map((number) => {
      const nextNumber = number + 1;
      return `A string containing the ${nextNumber}.`;
    });

    // good
    [1, 2, 3].map((number, index) => ({
      [index]: number,
    }));

    // No implicit return with side effects
    function foo(callback) {
      const val = callback();
      if (val === true) {
        // Do something if callback returns true
      }
    }

    let bool = false;

    // bad
    foo(() => bool = true);

    // good
    foo(() => {
      bool = true;
    });
    ```

 - 如果函数表达式有多行，用括号将内容包裹起来，以便更好地阅读，因为它清除标记了起始和结束位置

    ```javascript
    // bad
    ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    );

    // good
    ['get', 'post', 'put'].map(httpMethod => (
      Object.prototype.hasOwnProperty.call(
        httpMagicObjectWithAVeryLongName,
        httpMethod,
      )
    ));
    ```

 - 如果函数内始终只有一个参数，则省略括号，否则的话，用括号保护参数

    ```javascript
    // bad
    [1, 2, 3].map((x) => x * x);

    // good
    [1, 2, 3].map(x => x * x);

    // good
    [1, 2, 3].map(number => (
      `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
    ));

    // bad
    [1, 2, 3].map(x => {
      const y = x + 1;
      return x * y;
    });

    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
    ```

 - 避免将箭头函数语法（=>）与比较运算符（<=，>=）混淆

    ```javascript
    // bad
    const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;

    // bad
    const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;

    // good
    const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);

    // good
    const itemHeight = (item) => {
      const { height, largeSize, smallSize } = item;
      return height > 256 ? largeSize : smallSize;
    };
    ```                     

**[⬆ back to table](#table-of-contents)**

#### note6

 - **箭头函数表达式**的语法比函数表达式更短，并且不绑定自己的this，arguments，super或 new.target。这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数

 - `const 函数名 = (参数...) => {函数声明}||表达式`

 - 执行体为函数声明时需要加上 `{}`,参数的规则参看上文内容

    ```javascript
    //支持解构函数
    const f = ([a,b]=[1,2],{c:c}={c:3})=>a+b+c;
    f(); 👉 6;
    ```

**[⬆ back to note](#table-of-note)**
