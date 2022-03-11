const { create_tree_from_array } = require('./tree_function')

// Implamented a simpme testing framework to check for varible results and prevent errors, typically would use a testing lib such as JEST to describe actions and outputs

const test_lib = () => {
  let error_count = 0

  const test_scenarios = [{
    input: null,
    output: [],
    error: "Failed to return empty array on null input"
  }, {
    input: [],
    output: [],
    error: "Failed to return empty array when inputed empty array"
  }, {
    input: [{
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": null
    }],
    output: [{
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": null,
      "children": []
    }],
    error: "Failed to single item array"
  }, {
    input: [{
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": null
    }, {
      "nodeId": "2",
      "name": "Two",
      "parentId": null,
      "previousSiblingId": "3"
    }, {
      "nodeId": "3",
      "name": "Three",
      "parentId": null,
      "previousSiblingId": "1"
    }],
    output: [{
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": null,
      "children": []
    }, {
      "nodeId": "3",
      "name": "Three",
      "parentId": null,
      "previousSiblingId": "1",
      "children": []
    }, {
        "nodeId": "2",
        "name": "Two",
        "parentId": null,
        "previousSiblingId": "3",
        "children": []
    }],
    error: "Failed to order single depth array"
  },
  {
    input: [{
        "nodeId": "4",
        "name": "Four",
        "parentId": "2",
        "previousSiblingId": "6"
      },
      {
        "nodeId": "8",
        "name": "Eight",
        "parentId": "7",
        "previousSiblingId": null
      },
      {
        "nodeId": "2",
        "name": "Two",
        "parentId": "1",
        "previousSiblingId": null
      },
      {
        "nodeId": "6",
        "name": "Six",
        "parentId": "2",
        "previousSiblingId": null
      },
      {
        "nodeId": "1",
        "name": "One",
        "parentId": null,
        "previousSiblingId": "3"
      },
      {
        "nodeId": "3",
        "name": "Three",
        "parentId": null,
        "previousSiblingId": null
      },
      {
        "nodeId": "5",
        "name": "Five",
        "parentId": "4",
        "previousSiblingId": null
      },
      {
        "nodeId": "7",
        "name": "Seven",
        "parentId": null,
        "previousSiblingId": "1"
      }
    ],
    output: [{
        "nodeId": "3",
        "name": "Three",
        "parentId": null,
        "previousSiblingId": null,
        "children": []
      },
      {
        "nodeId": "1",
        "name": "One",
        "parentId": null,
        "previousSiblingId": "3",
        "children": [{
          "nodeId": "2",
          "name": "Two",
          "parentId": "1",
          "previousSiblingId": null,
          "children": [{
            "nodeId": "6",
            "name": "Six",
            "parentId": "2",
            "previousSiblingId": null,
            "children": []
          }, {
            "nodeId": "4",
            "name": "Four",
            "parentId": "2",
            "previousSiblingId": "6",
            "children": [{
              "nodeId": "5",
              "name": "Five",
              "parentId": "4",
              "previousSiblingId": null,
              "children": []
            }]
          }, ]
        }]
      },
      {
        "nodeId": "7",
        "name": "Seven",
        "parentId": null,
        "previousSiblingId": "1",
        "children": [{
          "nodeId": "8",
          "name": "Eight",
          "parentId": "7",
          "previousSiblingId": null,
          "children": []
        }]
      }
    ],
    error: "Did not return child node in correct order (nodeId: 6 should be before nodeId: 4)"
  }, {
    input: [{
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": "3"
    }, {
      "nodeId": "3",
      "name": "Three",
      "parentId": null,
      "previousSiblingId": null
    }, {
      "nodeId": "2",
      "name": "Two",
      "parentId": "1",
      "previousSiblingId": null,
    }, {
      "nodeId": "6",
      "name": "Six",
      "parentId": "2",
      "previousSiblingId": null,
      "children": []
    }],
    output: [{
      "nodeId": "3",
      "name": "Three",
      "parentId": null,
      "previousSiblingId": null,
      "children": []
    }, {
      "nodeId": "1",
      "name": "One",
      "parentId": null,
      "previousSiblingId": "3",
      "children": [{
        "nodeId": "2",
        "name": "Two",
        "parentId": "1",
        "previousSiblingId": null,
        "children": [{
          "nodeId": "6",
          "name": "Six",
          "parentId": "2",
          "previousSiblingId": null,
          "children": []
        }]
      }]
    }],
    error: "Did not return expected ordered result"
  }]

  test_scenarios.map((test, index) => {
    const result = create_tree_from_array(test.input)

    if (JSON.stringify(result) !== JSON.stringify(test.output)) {
      console.log(`Scenario ${index + 1}: ${test.error}`)
      error_count++
    }
  })

  // const result = create_tree_from_array(test_scenarios[4].input)
  // console.log(JSON.stringify(result))

  console.log(`Test completed with ${error_count} errors`)
}

test_lib()