const fs = require("fs").promises;
const create_tree_from_array = require('./tree_function')
var argv = require('./module/minimist')(process.argv.slice(2))


async function main(argv) {
  if (!argv.i || argv.i === true) {
    throw new Error("No input file address, please use -i './your_input_file.json'.")
  }

  if (getExtension(argv.i) !== 'json') {
    throw new Error("Invalid file type, please ensure the input file is a json file.")
  }

    const input = await fs.readFile(argv.i)
      .catch((err) => console.error('Failed to read file', err))

    const input_array = JSON.parse(input)
    const output = create_tree_from_array(input_array)
    fs.writeFile('./output/output.json', JSON.stringify(output, null, 4), err => {
      // Checking for errors
      if (err) throw err
      console.log("Succsfully written output to ./output/output.json.") 
    })

    console.log(argv.t)
    
    if (argv.t && getExtension(argv.t) === 'json') {
      const test_data = await fs.readFile(argv.t)
        .catch((err) => console.error('Failed to read file', err))
        const test_data_array = JSON.parse(test_data)

        if (JSON.stringify(output) !== JSON.stringify(test_data_array)) {
          console.log("Test failed, result miss match between output and expected data set")
        } else {
          console.log("Test Successful, result matched expected data")
        }
    }

}

main(argv)


function getExtension(path) {
  let baseName = path.split(/[\\/]/).pop(), // extracts file name from full path
    // (supports separators `\\` and `/`)
    pos = baseName.lastIndexOf("."); // gets the last position of `.`
  if (baseName === "" || pos < 1) // if the file name is empty or ...
    return ""; // the dot not found (-1) or comes first (0)
  return baseName.slice(pos + 1); // extracts extension ignoring "."
}
