# Airbnb JavaScript Style 阅读注解

*提供一种合理的javascript的规范，对原文主要内容进行翻译，同时对部分内容进行注释*

> **注意**：本文假定你正在使用 [Babel](https://babeljs.io)，并且要求你使用 [babel-preset-airbnb](https://npmjs.com/babel-preset-airbnb)或者其替代品。同时，假定你已经通过[airbnb-browser-shims](https://npmjs.com/airbnb-browser-shims)或者其替代品安装 shims/polyfills 在你的app内。

## 原文

 - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Table of Contents

  1. [Types（数据类型）](#types)
  2. [References（引用）](#references)
  3. [Objects（对象）](#objects)
  4. [Arrays（数组）](#arrays)
  5. [Destructuring（解构）](#destructuring)
  6. [Strings（字符串）](#strings)
  7. [Functions（函数）](#functions)
  8. [Arrow Functions（箭头函数）](#arrow-functions)
  9. [Classes & Constructors（类与构造函数）](#classes--constructors)
  10. [Modules（模块）](#modules)
  11. [Iterators and Generators（迭代器和发生器）](#iterators-and-generators)
  12. [Properties（属性）](#properties)
  13. [Variables（变量）](#variables)
  14. [Hoisting（变量提升）](#hoisting)
  15. [Comparison Operators & Equality（比较操作符和等号）](#comparison-operators--equality)
  16. [Blocks（块）](#blocks)
  17. [Control Statements（控制语句）](#control-statements)
  18. [Comments（注释）](#comments)
  19. [Whitespace（空格）](#whitespace)
  20. [Commas（逗号）](#commas)
  21. [Semicolons（分号）](#semicolons)
  22. [Type Casting & Coercion（强制类型转换）](#type-casting--coercion)
  23. [Naming Conventions（命名协议）](#naming-conventions)
  24. [Accessors（访问方法）](#accessors)
  25. [Events（事件）](#events)
  26. [jQuery](#jquery)
  27. [Standard Library（标准程序库）](#standard-library)
  28. [Testing（测试）](#testing)

## Table of Notes

  1. [symbol](#note1)
  2. [const,let,block-scoped,function-scoped](#note2)
  3. [call,assign(),...](#note3)
  4. [Array.from()](#note4)
  5. [Destructuring](#note5)
  6. [Default Function Parameter](#note6)
  7. [arrow Function](#note7)          

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

**[⬆ back to note](#table-of-notes)**

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

**[⬆ back to note](#table-of-notes)**

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

**[⬆ back to note](#table-of-notes)**

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

**[⬆ back to note](#table-of-notes)**

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
**[⬆ back to note](#table-of-notes)**

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

**[⬆ back to note](#table-of-notes)** 

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

#### note7

 - **箭头函数表达式**的语法比函数表达式更短，并且不绑定自己的this，arguments，super或 new.target。这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数

 - `const 函数名 = (参数...) => {函数声明}||表达式`

 - 执行体为函数声明时需要加上 `{}`,参数的规则参看上文内容

    ```javascript
    //支持解构函数
    const f = ([a,b]=[1,2],{c:c}={c:3})=>a+b+c;
    f(); 👉 6;
    ```   

**[⬆ back to note](#table-of-notes)**

## Classes & Constructors

 - 避免直接使用 `prototype` , 多用 `class`。因为 `class`语法更加简洁和且阅读性更棒

    ```javascript
    // bad
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    };

    // good
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        const value = this.queue[0];
        this.queue.splice(0, 1);
        return value;
      }
    }
    ```

 - 使用 `extends` 实现继承，因为这是继承原型的内置功能

    ```javascript
    // bad
    const inherits = require('inherits');
    function PeekableQueue(contents) {
      Queue.apply(this, contents);
    }
    inherits(PeekableQueue, Queue);
    PeekableQueue.prototype.peek = function () {
      return this.queue[0];
    };

    // good
    class PeekableQueue extends Queue {
      peek() {
        return this.queue[0];
      }
    }
    ```

 - 方法可以通过返回 `this` 来优化方法链

    ```javascript
    // bad
    Jedi.prototype.jump = function () {
      this.jumping = true;
      return true;
    };

    Jedi.prototype.setHeight = function (height) {
      this.height = height;
    };

    const luke = new Jedi();
    luke.jump(); // => true
    luke.setHeight(20); // => undefined

    // good
    class Jedi {
      jump() {
        this.jumping = true;
        return this;
      }

      setHeight(height) {
        this.height = height;
        return this;
      }
    }

    const luke = new Jedi();

    luke.jump()
    luke.setHeight(20);
    ```

 - 写一个通用的 `toString()` 方法也没问题，但是需要保证其能执行且没有其他影响

    ```javascript
    class Jedi {
      constructor(options = {}) {
        this.name = options.name || 'no name';
      }

      getName() {
        return this.name;
      }

      toString() {
        return `Jedi - ${this.getName()}`;
      }
    }
    ```

 - 如果没有指定类，那么类需要有一个默认的构造方法。一个空的构造函数或者只是委托给父类是没有必要的

    ```javascript
    // bad
    class Jedi {
      constructor() {}

      getName() {
        return this.name;
      }
    }

    // bad
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
      }
    }

    // good
    class Rey extends Jedi {
      constructor(...args) {
        super(...args);
        this.name = 'Rey';
      }
    }
    ```

 - 避免出现两个一样的类成员，因为前一个成员会被覆盖从而导致错误

    ```javascript
    // bad
    class Foo {
      bar() { return 1; }
      bar() { return 2; }
    }

    // good
    class Foo {
      bar() { return 1; }
    }

    // good
    class Foo {
      bar() { return 2; }
    }
    ```                             

**[⬆ back to table](#table-of-contents)**

## Modules

 - 始终使用模块(`import`/`export`)来代替非标准的模块系统。你可以选择你喜欢的模块系统，因为模块代表未来

    ```javascript
    // bad
    const AirbnbStyleGuide = require('./AirbnbStyleGuide');
    module.exports = AirbnbStyleGuide.es6;

    // ok
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    export default AirbnbStyleGuide.es6;

    // best
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

 - 不要使用通配符进行导出，从而保证你输出一个独立的导出

    ```javascript
    // bad
    import * as AirbnbStyleGuide from './AirbnbStyleGuide';

    // good
    import AirbnbStyleGuide from './AirbnbStyleGuide';
    ```

 - 不要把导入和导出写在一起，虽然一行简明扼要，但是我们更需要明确的导入方式和导出方式，保持其一致性 
 
    ```javascript
    // bad
    // filename es6.js
    export { es6 as default } from './AirbnbStyleGuide';

    // good
    // filename es6.js
    import { es6 } from './AirbnbStyleGuide';
    export default es6;
    ```

 - 一个路径一次支持一个导入，因为一个路径一次支持有多个导入，会使代码变得难以维护

    ```javascript
    // bad
    import foo from 'foo';
    // … some other imports … //
    import { named1, named2 } from 'foo';

    // good
    import foo, { named1, named2 } from 'foo';

    // good
    import foo, {
      named1,
      named2,
    } from 'foo';
    ```

 - 拒绝导出可变绑定，这种方式通常应该避免，但是不排除有某些特殊情况需要这么做，但是应该记住，通常只导出常量引用

    ```javascript
    // bad
    let foo = 3;
    export { foo };

    // good
    const foo = 3;
    export { foo };
    ``` 

 - 在具有单一导出的模块中，建议使用默认导出而不是命名导出，这样对于代码的可读性和可维护性更加友好

    ```javascript
    // bad
    export function foo() {}

    // good
    export default function foo() {}
    ```

 - 把所有的导入语句放在一起

    ```javascript
    // bad
    import foo from 'foo';
    foo.init();

    import bar from 'bar';

    // good
    import foo from 'foo';
    import bar from 'bar';

    foo.init();
    ```

 - 多行导入应该项多行数组和对象一样缩进，这样保持 `{}` 内容的一致性

    ```javascript
    // bad
    import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

    // good
    import {
      longNameA,
      longNameB,
      longNameC,
      longNameD,
      longNameE,
    } from 'path';
    ```

 - 导出语句中不允许出现 `webpack` 加载器语法。因为导入中使用加载器语法会将代码耦合到模块打包器中，，更建议使用 `webpack.config.js` 
 
    ```javascript
    // bad
    import fooSass from 'css!sass!foo.scss';
    import barCss from 'style!css!bar.css';

    // good
    import fooSass from 'foo.scss';
    import barCss from 'bar.css';
    ```              

**[⬆ back to table](#table-of-contents)**

## Iterators and Generators

 - 不要使用迭代器，更推荐使用javascript的高阶方法而不是 `for-in`，`for-of` 这些。使用 `map()`，`every()`，`filter()`，`find()`，`findIndex()`，`reduce()`，`some()` 等遍历数组，以及`Object.keys()`，`Object.values()`，`Object.entries()`去生成数组，以便迭代对象。因为处理返回值的纯函数更容易定位问题

    ```javascript
    const numbers = [1, 2, 3, 4, 5];

    // bad
    let sum = 0;
    for (let num of numbers) {
      sum += num;
    }
    sum === 15;

    // good
    let sum = 0;
    numbers.forEach((num) => {
      sum += num;
    });
    sum === 15;

    // best (use the functional force)
    const sum = numbers.reduce((total, num) => total + num, 0);
    sum === 15;

    // bad
    const increasedByOne = [];
    for (let i = 0; i < numbers.length; i++) {
      increasedByOne.push(numbers[i] + 1);
    }

    // good
    const increasedByOne = [];
    numbers.forEach((num) => {
      increasedByOne.push(num + 1);
    });

    // best (keeping it functional)
    const increasedByOne = numbers.map(num => num + 1);
    ```

 - 不要使用发生器，因为他们还没有很好的兼容

 - 如果你一定要用发生器，一定要注意关键字符的间距，举个例子，`function*` 是一个不同于 `function` 的独特构造，并且 `*`是其构造的一部分

    ```javascript
    // bad
    function * foo() {
      // ...
    }

    // bad
    const bar = function * () {
      // ...
    };

    // bad
    const baz = function *() {
      // ...
    };

    // bad
    const quux = function*() {
      // ...
    };

    // bad
    function*foo() {
      // ...
    }

    // bad
    function *foo() {
      // ...
    }

    // very bad
    function
    *
    foo() {
      // ...
    }

    // very bad
    const wat = function
    *
    () {
      // ...
    };

    // good
    function* foo() {
      // ...
    }

    // good
    const foo = function* () {
      // ...
    };
    ```      

**[⬆ back to table](#table-of-contents)**

## Properties

 - 通过常量访问属性的时候使用 `.`

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    // bad
    const isJedi = luke['jedi'];

    // good
    const isJedi = luke.jedi;
    ```

 - 通过变量访问属性的时候用 `[]`

    ```javascript
    const luke = {
      jedi: true,
      age: 28,
    };

    function getProp(prop) {
      return luke[prop];
    }

    const isJedi = getProp('jedi');
    ```

 - 使用 `**` 进行指数运算

    ```javascript
    // bad
    const binary = Math.pow(2, 10);

    // good
    const binary = 2 ** 10;
    ```           

**[⬆ back to table](#table-of-contents)**

## Variables

 - 总是使用 `const` 或者 `let` 来声明变量，这样做可以避免污染全局命名空间

    ```javascript
    // bad
    superPower = new SuperPower();

    // good
    const superPower = new SuperPower();
    ```

 - 每个变量声明都对应一个 `const` 或者 `let`。这样做，可以独立的声明每一个变量，而不需要考虑 `;`和`,`的关系，同时也方便对每个声明进行调试，而不是跳过所有的声明

    ```javascript
    // bad
    const items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';

    // bad
    // (compare to above, and try to spot the mistake)
    const items = getItems(),
        goSportsTeam = true;
        dragonball = 'z';

    // good
    const items = getItems();
    const goSportsTeam = true;
    const dragonball = 'z';
    ```

 - 对 `let` 和 `const` 进行分组，这样增强代码可读性

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;

    // bad
    let i;
    const items = getItems();
    let dragonball;
    const goSportsTeam = true;
    let len;

    // good
    const goSportsTeam = true;
    const items = getItems();
    let dragonball;
    let i;
    let length;
    ```

 - 在需要的地方声明变量，因为 `const` 和 `let` 是块作用域而不是函数作用域

    ```javascript
    // bad - unnecessary function call
    function checkName(hasName) {
      const name = getName();

      if (hasName === 'test') {
        return false;
      }

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }

    // good
    function checkName(hasName) {
      if (hasName === 'test') {
        return false;
      }

      const name = getName();

      if (name === 'test') {
        this.setName('');
        return false;
      }

      return name;
    }
    ```

 - 不要进行链式声明变量的操作，这样可能创建隐式的全局变量

    ```javascript
    // bad
    (function example() {
      // JavaScript interprets this as
      // let a = ( b = ( c = 1 ) );
      // The let keyword only applies to variable a; variables b and c become
      // global variables.
      let a = b = c = 1;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // 1
    console.log(c); // 1

    // good
    (function example() {
      let a = 1;
      let b = a;
      let c = a;
    }());

    console.log(a); // throws ReferenceError
    console.log(b); // throws ReferenceError
    console.log(c); // throws ReferenceError

    // the same applies for `const`
    ```

 - 不要使用一元递增和递减操作符（++，--），因为一元递增和一元递减可能受到分号插入的影响，并且可能导致应用中的值递增或者递减，并且不会报错。使用 `num += 1` 类似的语句也更加有表现力，并且可以避免预先递增或者递减从而导致程序发生意外

    ```javascript
    // bad

    const array = [1, 2, 3];
    let num = 1;
    num++;
    --num;

    let sum = 0;
    let truthyCount = 0;
    for (let i = 0; i < array.length; i++) {
      let value = array[i];
      sum += value;
      if (value) {
        truthyCount++;
      }
    }

    // good

    const array = [1, 2, 3];
    let num = 1;
    num += 1;
    num -= 1;

    const sum = array.reduce((a, b) => a + b, 0);
    const truthyCount = array.filter(Boolean).length;
    ```                          

**[⬆ back to table](#table-of-contents)**

## Hoisting

 -  `var` 声明被置于函数作用域的顶部，但是他们的赋值不是， `const`和`let`声明会被置于一个新概念**TDZ**内。因此， `typeof()` 方法不再安全

    ```javascript
    // we know this wouldn’t work (assuming there
    // is no notDefined global variable)
    function example() {
      console.log(notDefined); // => throws a ReferenceError
    }

    // creating a variable declaration after you
    // reference the variable will work due to
    // variable hoisting. Note: the assignment
    // value of `true` is not hoisted.
    function example() {
      console.log(declaredButNotAssigned); // => undefined
      var declaredButNotAssigned = true;
    }

    // the interpreter is hoisting the variable
    // declaration to the top of the scope,
    // which means our example could be rewritten as:
    function example() {
      let declaredButNotAssigned;
      console.log(declaredButNotAssigned); // => undefined
      declaredButNotAssigned = true;
    }

    // using const and let
    function example() {
      console.log(declaredButNotAssigned); // => throws a ReferenceError
      console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
      const declaredButNotAssigned = true;
    }
    ```

 - 匿名函数表达式会提升变量名，而不是函数赋值

    ```javascript
    function example() {
      console.log(anonymous); // => undefined

      anonymous(); // => TypeError anonymous is not a function

      var anonymous = function () {
        console.log('anonymous function expression');
      };
    }
    ```

 - 命名函数表达式提升变量名，而不是函数名或者函数体

    ```javascript
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      superPower(); // => ReferenceError superPower is not defined

      var named = function superPower() {
        console.log('Flying');
      };
    }

    // the same is true when the function name
    // is the same as the variable name.
    function example() {
      console.log(named); // => undefined

      named(); // => TypeError named is not a function

      var named = function named() {
        console.log('named');
      };
    }
    ```

 - 函数声明提升其名字和函数体

    ```javascript
    function example() {
      superPower(); // => Flying

      function superPower() {
        console.log('Flying');
      }
    }
    ```               

**[⬆ back to table](#table-of-contents)**

## Comparison Operators & Equality

 - 使用 `===`,`!==` 取代 `==`,`!=`

 - 条件语句比如 `if` 会强制使用 `ToBoolean` 抽象方法来进行转换，并且遵循以下规则：

    - **Objects** 转换为 **true**
    - **Undefined** 转换为 **false**
    - **Null** 转换为 **false**
    - **Booleans** 转换为 **the value of the boolean**
    - **Numbers** 转换为 **false** 如果是 **+0, -0, or NaN**, 其余为 **true**
    - **Strings** 转换为 **false** 如果是空字符串 `''`, 其余为 **true**

    ```javascript
    if ([0] && []) {
      // true
      // an array (even an empty one) is an object, objects will evaluate to true
    }
    ```

 - 使用布尔值的快捷比较方式，但是显示比较字符串和数字

    ```javascript
    // bad
    if (isValid === true) {
      // ...
    }

    // good
    if (isValid) {
      // ...
    }

    // bad
    if (name) {
      // ...
    }

    // good
    if (name !== '') {
      // ...
    }

    // bad
    if (collection.length) {
      // ...
    }

    // good
    if (collection.length > 0) {
      // ...
    }
    ```

 - 在 `switch` 语句中的 `case` 和 `default` 使用 `{}` 来创建块，比如`let`, `const`, `function`, `class` 也是如此。因为在整个 `switch` 块中词法声明是随处可见的，但是只有在赋值时才会被初始化，且只有 `case` 值达到时才会发生。但是当多个 `case` 子句试图定义相同的东西时，就会发生问题
 
    ```javascript
    // bad
    switch (foo) {
      case 1:
        let x = 1;
        break;
      case 2:
        const y = 2;
        break;
      case 3:
        function f() {
          // ...
        }
        break;
      default:
        class C {}
    }

    // good
    switch (foo) {
      case 1: {
        let x = 1;
        break;
      }
      case 2: {
        const y = 2;
        break;
      }
      case 3: {
        function f() {
          // ...
        }
        break;
      }
      case 4:
        bar();
        break;
      default: {
        class C {}
      }
    }
    ```

 - 三元表达式不应该嵌套，而应该单行表达

    ```javascript
    // bad
    const foo = maybe1 > maybe2
      ? "bar"
      : value1 > value2 ? "baz" : null;

    // split into 2 separated ternary expressions
    const maybeNull = value1 > value2 ? 'baz' : null;

    // better
    const foo = maybe1 > maybe2
      ? 'bar'
      : maybeNull;

    // best
    const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
    ```

 - 没事不要随便用三元表达式

    ```javascript
    // bad
    const foo = a ? a : b;
    const bar = c ? true : false;
    const baz = c ? false : true;

    // good
    const foo = a || b;
    const bar = !!c;
    const baz = !c;
    ```

 - 当多个运算符混在一个语句中时，将需要的运算符括在括号里面，并且用括号区分开 `**`,`%`与 `+`,`-`,`*`,`/`,这样代码更加有可读性，并且澄清了开发者的意图

    ```javascript
    // bad
    const foo = a && b < 0 || c > 0 || d + 1 === 0;

    // bad
    const bar = a ** b - 5 % d;

    // bad
    // one may be confused into thinking (a || b) && c
    if (a || b && c) {
      return d;
    }

    // good
    const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

    // good
    const bar = (a ** b) - (5 % d);

    // good
    if (a || (b && c)) {
      return d;
    }

    // good
    const bar = a + b / c * d;
    ```                              

**[⬆ back to table](#table-of-contents)**

## Blocks

 - 所有的多行块都要用 `{}`

    ```javascript
    // bad
    if (test)
      return false;

    // good
    if (test) return false;

    // good
    if (test) {
      return false;
    }

    // bad
    function foo() { return false; }

    // good
    function bar() {
      return false;
    }
    ```

 - 如果使用 `if else`, `else` 需要和 `if` 的 `}` 在同一行

    ```javascript
    // bad
    if (test) {
      thing1();
      thing2();
    }
    else {
      thing3();
    }

    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    ```

 - 如果一个 `if else` 语句内每个代码块都用了 `return` 语句，那么 `else` 语句就没有必要，分成多个 `if` 语句就行了

    ```javascript
    // bad
    function foo() {
      if (x) {
        return x;
      } else {
        return y;
      }
    }

    // bad
    function cats() {
      if (x) {
        return x;
      } else if (y) {
        return y;
      }
    }

    // bad
    function dogs() {
      if (x) {
        return x;
      } else {
        if (y) {
          return y;
        }
      }
    }

    // good
    function foo() {
      if (x) {
        return x;
      }

      return y;
    }

    // good
    function cats() {
      if (x) {
        return x;
      }

      if (y) {
        return y;
      }
    }

    //good
    function dogs(x) {
      if (x) {
        if (z) {
          return y;
        }
      } else {
        return z;
      }
    }
    ```           

**[⬆ back to table](#table-of-contents)**

## Control Statements

 - 如果你的控制语句，比如 `if`,`while`等很长，或者超过了行宽，你可以对其中的内容进行换行，但是需要注意，逻辑运算符需要放在行首

    ```javascript
    // bad
    if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
      thing1();
    }

    // bad
    if (foo === 123 &&
      bar === 'abc') {
      thing1();
    }

    // bad
    if (foo === 123
      && bar === 'abc') {
      thing1();
    }

    // bad
    if (
      foo === 123 &&
      bar === 'abc'
    ) {
      thing1();
    }

    // good
    if (
      foo === 123
      && bar === 'abc'
    ) {
      thing1();
    }

    // good
    if (
      (foo === 123 || bar === "abc")
      && doesItLookGoodWhenItBecomesThatLong()
      && isThisReallyHappening()
    ) {
      thing1();
    }

    // good
    if (foo === 123 && bar === 'abc') {
      thing1();
    }
    ```     

**[⬆ back to table](#table-of-contents)**

## Comments

 - 多行注释使用 `/** ... */`

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param {String} tag
    // @return {Element} element
    function make(tag) {

      // ...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
        function make(tag) {

      // ...

      return element;
    }
    ```

 - 单行注释用 `//`,并且在注释内容的上一行，在注释语句之前要空一行，当然，如果注释在文件的第一行就不需要空行了

    ```javascript
    // bad
    const active = true;  // is current tab

    // good
    // is current tab
    const active = true;

    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      const type = this.type || 'no type';

      return type;
    }

    // good
    function getType() {
      console.log('fetching type...');

      // set the default type to 'no type'
      const type = this.type || 'no type';

      return type;
    }

    // also good
    function getType() {
      // set the default type to 'no type'
      const type = this.type || 'no type';

      return type;
    }
    ```

 - 注释文字以空格作为开始，方便阅读

    ```javascript
    // bad
    //is current tab
    const active = true;

    // good
    // is current tab
    const active = true;

    // bad
    /**
     *make() returns a new element
     *based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }

    // good
    /**
     * make() returns a new element
     * based on the passed-in tag name
     */
    function make(tag) {

      // ...

      return element;
    }
    ```

 - 为你的提交或者评论加上 `FIXME` 或者 `TODO` 的前缀，好让其他开发者迅速明白你的意思。 `FIXME`表示这个问题需要弄清楚，`TODO`表示这个问题需要解决

 - 使用 `// FIXME` 去注释问题

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // FIXME: shouldn’t use a global here
        total = 0;
      }
    }
    ```

 - 使用 `// TODO` 去注释问题的解决方法

    ```javascript
    class Calculator extends Abacus {
      constructor() {
        super();

        // TODO: total should be configurable by an options param
        this.total = 0;
      }
    }
    ```                     

**[⬆ back to table](#table-of-contents)**

## Whitespace

 - 使用 `tab` 去设置两个空格

    ```javascript
    // bad
    function foo() {
    ∙∙∙∙let name;
    }

    // bad
    function bar() {
    ∙let name;
    }

    // good
    function baz() {
    ∙∙let name;
    }
    ```

 - 使用 `{}` 之前空一格

    ```javascript
    // bad
    function test(){
      console.log('test');
    }

    // good
    function test() {
      console.log('test');
    }

    // bad
    dog.set('attr',{
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });

    // good
    dog.set('attr', {
      age: '1 year',
      breed: 'Bernese Mountain Dog',
    });
    ```

 - 判断语句（if,while）左括号之前加一个空格，在函数声明，函数调用，参数列表的 `()` 不需要空格

    ```javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ('Swooosh!');
    }

    // good
    function fight() {
      console.log('Swooosh!');
    }
    ```

 - 操作符之间要加空格

    ```javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
    ```

 - 文件导出通过换行符结束

    ```javascript
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;
    ```

    ```javascript
    // bad
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ↵
    ```

    ```javascript
    // good
    import { es6 } from './AirbnbStyleGuide';
      // ...
    export default es6;↵
    ```

 - 如果写一个长的方法链（连续使用超过三个方法）时，使用缩进来表示层级关系。使用前导点来表示该行是一个方法调用而不是一个新的语句

    ```javascript
    // bad
    $('#items').find('.selected').highlight().end().find('.open').updateCount();

    // bad
    $('#items').
      find('.selected').
        highlight().
        end().
      find('.open').
        updateCount();

    // good
    $('#items')
      .find('.selected')
        .highlight()
        .end()
      .find('.open')
        .updateCount();

    // bad
    const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
        .attr('width', (radius + margin) * 2).append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .classed('led', true)
        .attr('width', (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);

    // good
    const leds = stage.selectAll('.led').data(data);
    ```
 - 块与块，块与语句之间需要空一行

    ```javascript
    // bad
    if (foo) {
      return bar;
    }
    return baz;
    
    // good
    if (foo) {
      return bar;
    }
    
    return baz;
    
    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;
    
    // good
    const obj = {
      foo() {
      },
    
      bar() {
      },
    };
    
    return obj;
    
    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;
    
    // good
    const arr = [
      function foo() {
      },
    
      function bar() {
      },
    ];
    
    return arr;
    ``` 

 - 块内不要空行

    ```javascript
    // bad
    function bar() {
    
      console.log(foo);
    
    }
    
    // bad
    if (baz) {
    
      console.log(qux);
    } else {
      console.log(foo);
    
    }
    
    // bad  
    class Foo {
    
      constructor(bar) {
        this.bar = bar;
      }
    }
    
    // good
    function bar() {
      console.log(foo);
    }
    
    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
    ``` 

 - `()` 里面不要加空格

    ```javascript
    // bad
    function bar( foo ) {
      return foo;
    }
    
    // good
    function bar(foo) {
      return foo;
    }
    
    // bad
    if ( foo ) {
      console.log(foo);
    }
    
    // good
    if (foo) {
      console.log(foo);
    }
    ```

 - `[]` 不要随意加空格

    ```javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
    ```

 - `{}` 里面要加空格

    ```javascript
    // bad
    const foo = {clark: 'kent'};

    // good
    const foo = { clark: 'kent' };
    ```

 - 除了之前提到的长字符串，避免出现一行代码超过100个字符的情况，这样确保了可维护性和可读性

    ```javascript
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

    // bad
    $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

    // good
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
      method: 'POST',
      url: 'https://airbnb.com/',
      data: { name: 'John' },
    })
      .done(() => console.log('Congratulations!'))
      .fail(() => console.log('You have failed this city.'));
    ```               

**[⬆ back to table](#table-of-contents)**

## Commas

 - 逗号不要放在行首

    ```javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: 'Ada'
      , lastName: 'Lovelace'
      , birthYear: 1815
      , superPower: 'computers'
    };

    // good
    const hero = {
      firstName: 'Ada',
      lastName: 'Lovelace',
      birthYear: 1815,
      superPower: 'computers',
    };
    ```

 - 有时需要附加的逗号，一是为了在 `git` 上能保持一致，因为 `git` 在增减之后都会带上逗号，二是一些像Babel这样的转译器会自动删除不必要的逗号，这意味着不必担心传统浏览器中的逗号尾随问题

    ```diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: 'Florence',
    -    lastName: 'Nightingale'
    +    lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing']
    };

    // good - git diff with trailing comma
    const hero = {
         firstName: 'Florence',
         lastName: 'Nightingale',
    +    inventorOf: ['coxcomb chart', 'modern nursing'],
    };
    ```

    ```javascript
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };

    const heroes = [
      'Batman',
      'Superman'
    ];

    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };

    const heroes = [
      'Batman',
      'Superman',
    ];

    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }

    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }

    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }

    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );

    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );

    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    );
    ```          

**[⬆ back to table](#table-of-contents)**

## Semicolons

 - 在代码的结尾一定要用 `;` 结尾，防止javascript的自动分号插入机制使整个程序报错

    ```javascript
    // bad - raises exception
    const luke = {}
    const leia = {}
    [luke, leia].forEach(jedi => jedi.father = 'vader')

    // bad - raises exception
    const reaction = "No! That's impossible!"
    (async function meanwhileOnTheFalcon(){
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }())

    // bad - returns `undefined` instead of the value on the next line - always happens when `return` is on a line by itself because of ASI!
    function foo() {
      return
        'search your feelings, you know it to be foo'
    }

    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach((jedi) => {
      jedi.father = 'vader';
    });

    // good
    const reaction = "No! That's impossible!";
    (async function meanwhileOnTheFalcon(){
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }());

    // good
    function foo() {
      return 'search your feelings, you know it to be foo';
    }
    ``` 

**[⬆ back to table](#table-of-contents)**

## Type Casting & Coercion

 - 在语句开始进行强制类型转换

 - `String` 类型

    ```javascript
    // => this.reviewScore = 9;

    // bad
    const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

    // bad
    const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

    // bad
    const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

    // good
    const totalScore = String(this.reviewScore);
    ```

 - `Number` 类型，用 `Number` 或者 `parseInt` 进行强制转换，通常 `parseInt` 需要一个基数来解析字符串

    ```javascript
    const inputValue = '4';

    // bad
    const val = new Number(inputValue);

    // bad
    const val = +inputValue;

    // bad
    const val = inputValue >> 0;

    // bad
    const val = parseInt(inputValue);

    // good
    const val = Number(inputValue);

    // good
    const val = parseInt(inputValue, 10);
    ```

 - 如果 `parseInt` 是你代码的瓶颈，你不得不使用移位符来进行转换时，一定要在注释里面说明

    ```javascript
    // good
    /**
     * parseInt was the reason my code was slow.
     * Bitshifting the String to coerce it to a
     * Number made it a lot faster.
     */
    const val = inputValue >> 0;
    ```

 - 使用移位操作符时需要注意，数字可以表示为64位，但是移位操作符始终返回32位的源，对于大于32位的整数，移位操作可能会导致意外发生。最大的32位支持是 2,147,483,647
 
    ```javascript
    2147483647 >> 0; // => 2147483647
    2147483648 >> 0; // => -2147483648
    2147483649 >> 0; // => -2147483647
    ``` 

- `Booleans` 类型

    ```javascript
    const age = 0;

    // bad
    const hasAge = new Boolean(age);

    // good
    const hasAge = Boolean(age);

    // best
    const hasAge = !!age;
    ```                  

**[⬆ back to table](#table-of-contents)**

## Naming Conventions

 - 避免使用单字符命名，注意命名描述

    ```javascript
    // bad
    function q() {
      // ...
    }

    // good
    function query() {
      // ...
    }
    ```

 - 命名对象，函数和实例时都使用驼峰命名

    ```javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    ```

 - 对命名对象和构造函数时使用帕斯卡命名

    ```javascript
    // bad
    function user(options) {
      this.name = options.name;
    }

    const bad = new user({
      name: 'nope',
    });

    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }

    const good = new User({
      name: 'yup',
    });
    ```

 - 头部，尾部不要使用下划线，因为JavaScript的属性或者方法没有隐私的概念。前导下换线是一个常见的惯例，表示“私人”，事实上，这些属性是完全公开的，这样会让人产生误解

    ```javascript
    // bad
    this.__firstName__ = 'Panda';
    this.firstName_ = 'Panda';
    this._firstName = 'Panda';

    // good
    this.firstName = 'Panda';
    ```

 - 不要保存 `this` 指针，使用箭头函数或者 `#` 绑定来取代

    ```javascript
    // bad
    function foo() {
      const self = this;
      return function () {
        console.log(self);
      };
    }

    // bad
    function foo() {
      const that = this;
      return function () {
        console.log(that);
      };
    }

    // good
    function foo() {
      return () => {
        console.log(this);
      };
    }
    ```

 - 基本文件名应该与其导出名字对应

    ```javascript
    // file 1 contents
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // file 2 contents
    export default function fortyTwo() { return 42; }

    // file 3 contents
    export default function insideDirectory() {}

    // in some other file
    // bad
    import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
    import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
    import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export

    // bad
    import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
    import forty_two from './forty_two'; // snake_case import/filename, camelCase export
    import inside_directory from './inside_directory'; // snake_case import, camelCase export
    import index from './inside_directory/index'; // requiring the index file explicitly
    import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly

    // good
    import CheckBox from './CheckBox'; // PascalCase export/import/filename
    import fortyTwo from './fortyTwo'; // camelCase export/import/filename
    import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js
    ```

 - 默认导出一个方法时，使用驼峰命名表示。同时，你的文件名应该与方法名一致

    ```javascript
    function makeStyleGuide() {
      // ...
    }

    export default makeStyleGuide;
    ```

 - 导出构造函数，类，单例，函数库等时，使用帕斯卡命名

    ```javascript
    const AirbnbStyleGuide = {
      es6: {
      },
    };

    export default AirbnbStyleGuide;
    ```

 - 缩略词应该全是大小字母或者全是小写字母构成，这样才有可读性

    ```javascript
    // bad
    import SmsContainer from './containers/SmsContainer';

    // bad
    const HttpRequests = [
      // ...
    ];

    // good
    import SMSContainer from './containers/SMSContainer';

    // good
    const HTTPRequests = [
      // ...
    ];

    // also good
    const httpRequests = [
      // ...
    ];

    // best
    import TextMessageContainer from './containers/TextMessageContainer';

    // best
    const requests = [
      // ...
    ];
    ```                                         

**[⬆ back to table](#table-of-contents)**

## Accessors

 - 属性的访问方法不是必须的

 - 不要使用JavaScript的 getters/setters，因为它们会造成意想不到的坏的影响，并且很难去测试，定位。所以如果你要用访问函数，使用 `getVal()`和 `setVal()` 这样的方式

    ```javascript
    // bad
    class Dragon {
      get age() {
        // ...
      }

      set age(value) {
        // ...
      }
    }

    // good
    class Dragon {
      getAge() {
        // ...
      }

      setAge(value) {
        // ...
      }
    }
    ```

 - 如果一个属性值或者方法返回值是布尔类型，使用 `isVal()`或者 `hasVal()`这样的形式

    ```javascript
    // bad
    if (!dragon.age()) {
      return false;
    }

    // good
    if (!dragon.hasAge()) {
      return false;
    }
    ```

 - 可以创建类似 `get()` 和 `set()` 这样的函数方法，但是要注意保持一致

    ```javascript
    class Jedi {
      constructor(options = {}) {
        const lightsaber = options.lightsaber || 'blue';
        this.set('lightsaber', lightsaber);
      }

      set(key, val) {
        this[key] = val;
      }

      get(key) {
        return this[key];
      }
    }
    ```           

**[⬆ back to table](#table-of-contents)**

## Events

 - 当将数据传递到事件方法里面的时候，不要使用原始值直接进行传递，应该处理成对象字面量。这样可以方便其他用户修改或者查看传递数据

    ```javascript
    // bad
    $(this).trigger('listingUpdated', listing.id);

    // ...

    $(this).on('listingUpdated', (e, listingId) => {
      // do something with listingId
    });
    ```

    prefer:

    ```javascript
    // good
    $(this).trigger('listingUpdated', { listingId: listing.id });

    // ...

    $(this).on('listingUpdated', (e, data) => {
      // do something with data.listingId
    });
    ```   

**[⬆ back to table](#table-of-contents)**

## jQuery

 - 通过 `$` 来声明一个承载jquery的元素

    ```javascript
    // bad
    const sidebar = $('.sidebar');

    // good
    const $sidebar = $('.sidebar');

    // good
    const $sidebarBtn = $('.sidebar-btn');
    ```

 - 将jquery选择器缓存起来

    ```javascript
    // bad
    function setSidebar() {
      $('.sidebar').hide();

      // ...

      $('.sidebar').css({
        'background-color': 'pink',
      });
    }

    // good
    function setSidebar() {
      const $sidebar = $('.sidebar');
      $sidebar.hide();

      // ...

      $sidebar.css({
        'background-color': 'pink',
      });
    }
    ```

 - 对于 DOM 节点的查询使用级联 `$('.sidebar ul')` 或者 父级 > 子级 `$('.sidebar > ul')`

 - 块级jQuery对象查询（通过选择器对象进行查询），使用 `find`

    ```javascript
    // bad
    $('ul', '.sidebar').hide();

    // bad
    $('.sidebar').find('ul').hide();

    // good
    $('.sidebar ul').hide();

    // good
    $('.sidebar > ul').hide();

    // good
    $sidebar.find('ul').hide();
    ```            

**[⬆ back to table](#table-of-contents)**

## Standard Library

 - 使用 `Number.isNaN` 来代替全局的 `isNaN`，因为全局的 `isNaN` 会强制将非数字类型转换为数字类型,任何强制转换为非数字的都会返回true

    ```javascript
    // bad
    isNaN('1.2'); // false
    isNaN('1.2.3'); // true
    
    // good
    Number.isNaN('1.2.3'); // false
    Number.isNaN(Number('1.2.3')); // true
    ```

 - 使用 `Number.isFinite` 来代替全局的 `isFinite`，因为全局的 `isFinite` 会强制将非数字类型转换为数字类型，任何强制转换为有限数字的结果都会返回true

    ```javascript
    // bad
    isFinite('2e3'); // true

    // good
    Number.isFinite('2e3'); // false
    Number.isFinite(parseInt('2e3', 10)); // true
    ```   

**[⬆ back to table](#table-of-contents)**

## Testing

 - 无论您使用那种框架，都应该测试！

 - 尽量去写一些写的纯函数，并且尽量减少突变情况的发生

 - 谨慎使用 stubs(存根) 和 mocks(虚拟数据)，他们会让你的测试更加脆弱

 - Airbnb 主要使用 [`mocha`](https://www.npmjs.com/package/mocha) 来进行测试，偶尔也用 [`tape`](https://www.npmjs.com/package/tape) 来测试小的独立模块

 - 100%的测试覆盖率是最理想的

 - 每当你修复了一个bug，都需要写一个回归测试。未经回归测试修正的错误，未来一定会重现