

    const hiddenUsername = "Iqmah"
    const hiddenPassword = "Password"



const checkLogin = (req, res, next) => {

    const {username, password} = req.headers
    

    if (!username || !password) {
        res.status(422).send({
            status: "sucess",
            message: 'Bad request',
            data: []
            
        
        })
    }

    if (username == hiddenUsername && password == hiddenPassword) {
      next()

    } else {
        res.status(401).send({
            status: "sucess",
            message: 'Unauthorized Acesss',
            data: []
            
        
        })
    }

}


module.exports = {
    checkLogin
}
