
function update_in_nested_array (nestedArray, instruction) {  
  // Instruction for parent nodes
  if (instruction.parentId === null & instruction.previousSiblingId) {
    const previousSiblingIndex = nestedArray.findIndex(sib => sib.nodeId === instruction.previousSiblingId)
    nestedArray.splice(previousSiblingIndex + 1, 0, instruction)
    return nestedArray
  }

  if (instruction.parentId) {
    const parentIndex = nestedArray.findIndex(x => x.nodeId === instruction.parentId)

    if (parentIndex >= 0) {

      // If parentId but no sibling
      if (instruction.previousSiblingId === null) {
        nestedArray[parentIndex].children.unshift(instruction)
      } else {
        const previousSiblingIndex = nestedArray.findIndex(sib => sib.nodeId === instruction.previousSiblingId)
        nestedArray[parentIndex].children.splice(previousSiblingIndex + 1, 0, instruction)
      }

      return nestedArray
    }    
  }

  for (let i = 0; i < nestedArray.length; i++) {
    const result = update_in_nested_array(nestedArray[i].children, instruction)
    if (result) {
      return nestedArray
    }
  }

  return false
}


module.exports = function (arrInput) {
  // Guard against invaild arrays and empty arrays (could throw new Error() instead of returning output)
  if(!arrInput || (typeof arrInput !== "object" && !Array.isArray(arrInput)) || arrInput.length === 0) return []

  // convert input into a flat list of instructions
  const tree = arrInput.flat(Infinity).map(i => ({...i, children: []}))
  // Define output varible by creating a new copy of flatted tree object
  var output = [...tree]

  // Loop through each tree instruction
  for (var i = 0; i < tree.length; i++) {

    // If the instruction has no actions, move onto next iteration
    if (tree[i].parentId === null && tree[i].previousSiblingId === null) { continue }

    // Remove current and clone instruction from the ouput array
    const currentObjectIndex = output.findIndex(x => x.nodeId === tree[i].nodeId)
    const instruction = output[currentObjectIndex]
    output.splice(currentObjectIndex, 1)

    // Perform Instruction on Output
    const result = update_in_nested_array(output, instruction)

    if (result) {
      output = result
    }
  }
  
  return output
}