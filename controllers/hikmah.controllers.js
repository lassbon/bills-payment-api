

const add = (x, y, z) => {
   
    return {
        status: true,
        data: x + y + z
    }


}

const subtract = (x, y, z) => {
   
  return x - y - z


}

module.exports = {
    add,
    subtract
     
}
