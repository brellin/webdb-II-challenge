const knex = require('knex')
const router = require('express').Router()

const knexConfig = {
    client: 'sqlite3',
    connection: './data/lambda.sqlite3',
    useNullAsDefault: true
},
    db = knex(knexConfig)

router.get('/', async (req, res) => {
    try {
        const get = await db('bears')
        res.status(200).json(get)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/', async (req, res) => {
    const {body} = req
    try {
        const post = await db('bears').insert(body)
        const get = await db('bears')
        post ?
            res.status(200).json(get)
            :
            res.status(400).json({
                message: 'A bear with that name already exists. Please try again.'
            })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const getById = await db('bears').where({ id: id }).first()
        getById ?
            res.status(200).json(getById)
            :
            res.status(404).json({
                message: 'No bear exists with the provided id. Please try again.'
            })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    if (body.name) {
        try {
            const put = await db('bears').where({id: id}).update(body)
            const get = await db('bears')
            put ?
                res.status(200).json(get)
                :
                res.status(404).json({
                    message: 'No bear exists with the provided id. Please try again.'
                })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    } else {
        res.status(400).json({
            message: 'You must include a name in your request. Please try again.'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const del = await db('bears').where({id: id}).del()
        const get = await db('bears')
        del ?
        res.status(200).json(get)
        :
        res.status(404).json({
            message: 'No bear exists with the provided id. Please try again.'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
