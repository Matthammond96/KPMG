# Matthew Hammonds KPMG Coding Test #

Thank you for sending me a fun test featuring re-occurring loops and tree structures. However, sadly due to my limited time whilst job hunting and working full time, I have not yet managed to fully complete the challenge to a level with which I am satisfied. With that said, I wanted to show you that I am committed and excited by this opportunity, so I wanted to show you my current progress. I intend to perform one final refactor as I am currently duplicating the previousSibling code within the re-occurring loop

<br>

#

## Code Implamentation ##

There are multiple ways in which you can run the tests. 

### Option 1) Import Module ###

```
const create_tree_from_array = require('./tree_function')
const array = [{
  "nodeId": "1",
  "name": "One",
  "parentId": null,
  "previousSiblingId": null
}]
const result = create_tree_from_array(array)
````

<br>

### Option 2) Command Line Interface ###

```
node index.js -i ./input/nodes.json -t ./output/expected-tree.json
```

`-i [PATH TO INPUT JSON ARRAY]`

`-t [PATH TO TESTING OUTPUT ARRAY]` 

<br>

### Option 3) Testing Library

You can also run the basic testing suite that checks against most cases. Please feel free to add directly to the tests scenarios.

```
node test/test.js
```

Please note that I have manually installed the minimist framework for node command line inputs to prevent you from running a module install.

<br>

#

### Current Known Bugs & Refactoring Todo's ###

* [RESOLVED] - Child nodes are not yet ordered according to `previousSiblingId`
* [RESOLVED] - Merge all parent and sibling instructions into single re-occuring loop: `update_in_nested_array()`
* [RESOLVED] Create node-js file system opener for KPMG to add input / inputs file through command line
* [RESOLVED] Write result to `./output/output.json`
* Refactor instructions code to simplify instructions