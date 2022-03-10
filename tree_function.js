/*
  FURTHER REFACTORING REQUIRED

  - Merge all actions into the re-occuring nested loop function
    - Push Child Node in correct order
    - Order Parent nodes on first loop
    - Ensure fix previousSibling in update_in_nested_array
    
*/

function update_in_nested_array (nestedArray, instruction) {  
  const index = nestedArray.findIndex(x => x.nodeId === instruction.parentId)
 
  if (index >= 0) {
    // if (instruction.previousSiblingId === null) {
    //   nestedArray[index].children.slice(0, 0, instruction) 
    // }
      nestedArray[index].children.push(instruction)
    
    return nestedArray
  }

  for (let i = 0; i < nestedArray.length; i++) {
    const result = update_in_nested_array(nestedArray[i].children, instruction)
    if (result) {
      return nestedArray
    }
  }

  return false
}

function create_tree_from_array (arrInput) {
  // Guard against invaild arrays and empty arrays (could throw new Error() instead of returning output)
  if(!arrInput || (typeof arrInput !== "object" && !Array.isArray(arrInput)) || arrInput.length === 0) return []
  // if (arrInput.length === 1) return arrInput


  // convert input into a flat list of instructions
  const tree = arrInput.flat(Infinity).map(i => ({...i, children: []}))
  // Define output varible
  var output = [...tree]

  for (var i = 0; i < tree.length; i++) {
    // Leave the first value alone
    if (tree[i].parentId === null && tree[i].previousSiblingId === null) { continue }

    // Remove current instruction from the ouput array
    const currentObjectIndex = output.findIndex(x => x.nodeId === tree[i].nodeId)
    output.splice(currentObjectIndex, 1)

    // Re-order Parent Ids
    if (tree[i].parentId === null && tree[i].previousSiblingId) { 
      const placementIndex = output.findIndex(y => y.nodeId === tree[i].previousSiblingId)
      output.splice(placementIndex + 1, 0, tree[i])
    }

    // Add Child Nodes to Parent
    if (tree[i].parentId) {
      output = update_in_nested_array(output, tree[i])
    }
  }
  
  return output
}

module.exports = {
  create_tree_from_array
}