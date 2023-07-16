const ronin = require('ronin-server')
const database = require('ronin-database')
const mocks = require('ronin-mocks')

async function main() {
    try {
        await database.connect(process.env.CONNSTRING)
        const server = ronin.server({
            port: process.env.PORT
        })

        server.use('/foo', (req, res) => {
            return res.json({ "foo": "bar"})
        })

        server.use('/', mocks.server(server.router()))

        const result = await server.start()
        console.info(result)
    } catch (error) {
        console.error(error)
    }
}

main()