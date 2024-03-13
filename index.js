const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

// configuring conection

const conection = mysql.createConnection({
  host: 'localhost',
  user: 'aluno',
  password: 'ifpecjbg',
  database: 'ivel',
})

conection.connect((err) => {
  if (err) {
    console.log('Erro to connect to mysql: ' + err.message)
  } else {
    console.log('Connect sucessiful')
  }
})

// Middleware

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// API

// GET
// Categoria
app.get('/api/categorias', (req, res) => {
  const sql = 'SELECT * FROM categorias'

  conection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err.message)
      res.status(500).json({ error: 'erro ao buscar registros' })
    } else {
      res.status(200).json(results)
    }
  })
})

// Clientes
app.get('/api/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes'

  conection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err.message)
      res.status(500).json({ error: 'erro ao buscar registros' })
    } else {
      res.status(200).json(results)
    }
  })
})
// ItensPedidos
app.get('/api/itensPedido', (req, res) => {
  const sql = 'SELECT * FROM itensPedido'

  conection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err.message)
      res.status(500).json({ error: 'erro ao buscar registros' })
    } else {
      res.status(200).json(results)
    }
  })
})
// pedidos
app.get('/api/pedidos', (req, res) => {
  const sql = 'SELECT * FROM pedidos'

  conection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err.message)
      res.status(500).json({ error: 'erro ao buscar registros' })
    } else {
      res.status(200).json(results)
    }
  })
})
// produtos
app.get('/api/produtos', (req, res) => {
  const sql = 'SELECT * FROM produtos'

  conection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar registros: ' + err.message)
      res.status(500).json({ error: 'erro ao buscar registros' })
    } else {
      res.status(200).json(results)
    }
  })
})

// POST
// categoria
app.post('/api/categorias', (req, res) => {
  const { nome, descricao } = req.body

  const sql = 'INSERT INTO categorias (nome,descricao) VALUES (?,?)'
  conection.query(sql, [nome, descricao], (err, result) => {
    if (err) {
      console.error('Erro ao inserir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao inserir registro' })
    } else {
      console.log('Registro inserido com sucesso!')
      res.status(201).json({ message: 'Registro inserido com sucesso' })
    }
  })
})

// clientes
app.post('/api/clientes', (req, res) => {
  const { nome, email, endereco, telefone } = req.body

  const sql =
    'INSERT INTO clientes (nome, email, endereco, telefone) VALUES (?,?,?,?)'
  conection.query(sql, [nome, email, endereco, telefone], (err, result) => {
    if (err) {
      console.error('Erro ao inserir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao inserir registro' })
    } else {
      console.log('Registro inserido com sucesso!')
      res.status(201).json({ message: 'Registro inserido com sucesso' })
    }
  })
})

// itenspedidos
app.post('/api/itenspedidos', (req, res) => {
  const { id_pedido, id_produto, quantidade, preco_unitario } = req.body

  const sql =
    'INSERT INTO itenspedidos (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?,?,?,?)'
  conection.query(
    sql,
    [id_pedido, id_produto, quantidade, preco_unitario],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir registro: ' + err.message)
        res.status(500).json({ error: 'Erro ao inserir registro' })
      } else {
        console.log('Registro inserido com sucesso!')
        res.status(201).json({ message: 'Registro inserido com sucesso' })
      }
    }
  )
})

// pedidos
app.post('/api/pedidos', (req, res) => {
  const { id_cliente, data_pedido, status } = req.body

  const sql =
    'INSERT INTO pedidos (id_cliente, data_pedido, status) VALUES (?,?,?)'
  conection.query(sql, [id_cliente, data_pedido, status], (err, result) => {
    if (err) {
      console.error('Erro ao inserir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao inserir registro' })
    } else {
      console.log('Registro inserido com sucesso!')
      res.status(201).json({ message: 'Registro inserido com sucesso' })
    }
  })
})

// produtos
app.post('/api/produtos', (req, res) => {
  const { nome, descricao, preco, id_categoria, disponivel } = req.body

  const sql =
    'INSERT INTO produtos (nome, descricao, preco, id_categoria, disponivel) VALUES (?,?,?,?,?)'
  conection.query(
    sql,
    [nome, descricao, preco, id_categoria, disponivel],
    (err, result) => {
      if (err) {
        console.error('Erro ao inserir registro: ' + err.message)
        res.status(500).json({ error: 'Erro ao inserir registro' })
      } else {
        console.log('Registro inserido com sucesso!')
        res.status(201).json({ message: 'Registro inserido com sucesso' })
      }
    }
  )
})
// PUT
// categorias
app.put('/api/categorias/:id', (req, res) => {
  const { id } = req.params
  const { nome, descricao } = req.body

  const sql = 'UPDATE categorias SET nome = ?, descricao = ?  WHERE id = ?'
  conection.query(sql, [nome, descricao, id], (err, result) => {
    if (err) {
      console.error('Erro ao Atualizar registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao inserir registro' })
    } else {
      console.log('Registro Atualizado com sucesso!')
      res.status(201).json({ message: 'Registro Atualizado com sucesso' })
    }
  })
})

// clientes
app.put('/api/clientes/:id', (req, res) => {
  const { id } = req.params
  const { nome, email, endereco, telefone } = req.body

  const sql =
    'UPDATE clientes SET nome = ?, email = ?, endereco = ?, telefone = ?  WHERE id = ?'
  conection.query(sql, [nome, email, endereco, telefone, id], (err, result) => {
    if (err) {
      console.error('Erro ao Atualizar registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao inserir registro' })
    } else {
      console.log('Registro Atualizado com sucesso!')
      res.status(201).json({ message: 'Registro Atualizado com sucesso' })
    }
  })
})
// itenspedidos
app.put('/api/itenspedido/:id', (req, res) => {
  const { id } = req.params
  const { id_pedido, id_produto, quantidade, preco_unitario } = req.body

  const sql =
    'UPDATE itenspedido SET id_pedido = ?, id_produto = ?, quantidade = ?, preco_unitario = ?  WHERE id = ?'
  conection.query(
    sql,
    [id_pedido, id_produto, quantidade, preco_unitario, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao Atualizar registro: ' + err.message)
        res.status(500).json({ error: 'Erro ao inserir registro' })
      } else {
        console.log('Registro Atualizado com sucesso!')
        res.status(201).json({ message: 'Registro Atualizado com sucesso' })
      }
    }
  )
})
// pedidos
app.put('/api/pedidos/:id', (req, res) => {
  const { id } = req.params
  const { id_pedido, id_produto, quantidade, preco_unitario } = req.body

  const sql =
    'UPDATE pedidos SET id_pedido = ?, id_produto = ?, quantidade = ?, preco_unitario = ?  WHERE id = ?'
  conection.query(
    sql,
    [id_pedido, id_produto, quantidade, preco_unitario, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao Atualizar registro: ' + err.message)
        res.status(500).json({ error: 'Erro ao inserir registro' })
      } else {
        console.log('Registro Atualizado com sucesso!')
        res.status(201).json({ message: 'Registro Atualizado com sucesso' })
      }
    }
  )
})
// produtos
app.put('/api/produtos/:id', (req, res) => {
  const { id } = req.params
  const { nome, descricao, preco, id_categoria, disponivel } = req.body

  const sql =
    'UPDATE produtos SET nome = ?, preco = ?, id_categoria = ?, disponivel = ?  WHERE id = ?'
  conection.query(
    sql,
    [nome, descricao, preco, id_categoria, disponivel, id],
    (err, result) => {
      if (err) {
        console.error('Erro ao Atualizar registro: ' + err.message)
        res.status(500).json({ error: 'Erro ao inserir registro' })
      } else {
        console.log('Registro Atualizado com sucesso!')
        res.status(201).json({ message: 'Registro Atualizado com sucesso' })
      }
    }
  )
})
// DELETE
// categorias
app.delete('/api/categorias/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM categorias WHERE id = ?'
  conection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao Excluir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao Excluir registro' })
    } else {
      if (result.affectedRows > 0) {
        console.log('Registro excluido com sucesso!')
        res.status(200).json({ message: 'Registro excluido com sucesso' })
      } else {
        console.log('Registro não encontrado')
        res.status(404).json({ message: 'Registro não encontrado' })
      }
    }
  })
})

// clientes
app.delete('/api/clientes/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM clientes WHERE id = ?'
  conection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao Excluir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao Excluir registro' })
    } else {
      if (result.affectedRows > 0) {
        console.log('Registro excluido com sucesso!')
        res.status(200).json({ message: 'Registro excluido com sucesso' })
      } else {
        console.log('Registro não encontrado')
        res.status(404).json({ message: 'Registro não encontrado' })
      }
    }
  })
})
//itenspedidos
app.delete('/api/itenspedido/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM itenspedido WHERE id = ?'
  conection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao Excluir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao Excluir registro' })
    } else {
      if (result.affectedRows > 0) {
        console.log('Registro excluido com sucesso!')
        res.status(200).json({ message: 'Registro excluido com sucesso' })
      } else {
        console.log('Registro não encontrado')
        res.status(404).json({ message: 'Registro não encontrado' })
      }
    }
  })
})
//pedidos
app.delete('/api/pedidos/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM pedidos WHERE id = ?'
  conection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao Excluir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao Excluir registro' })
    } else {
      if (result.affectedRows > 0) {
        console.log('Registro excluido com sucesso!')
        res.status(200).json({ message: 'Registro excluido com sucesso' })
      } else {
        console.log('Registro não encontrado')
        res.status(404).json({ message: 'Registro não encontrado' })
      }
    }
  })
})
//produtos
app.delete('/api/produtos/:id', (req, res) => {
  const { id } = req.params

  const sql = 'DELETE FROM produtos WHERE id = ?'
  conection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao Excluir registro: ' + err.message)
      res.status(500).json({ error: 'Erro ao Excluir registro' })
    } else {
      if (result.affectedRows > 0) {
        console.log('Registro excluido com sucesso!')
        res.status(200).json({ message: 'Registro excluido com sucesso' })
      } else {
        console.log('Registro não encontrado')
        res.status(404).json({ message: 'Registro não encontrado' })
      }
    }
  })
})

// CONSULTA POR NOME
// GET
// Categoria
app.get('/api/categorias/:nome', (req, res) => {
  const { nome } = req.params
  const sql = 'SELECT * FROM categorias WHERE nome Like ? or ? or ?'

  conection.query(
    sql,
    ['%' + nome + '%', '%' + nome, nome + '%'],
    (err, results) => {
      if (err) {
        console.error('Erro ao buscar registros: ' + err.message)
        res.status(500).json({ error: 'erro ao buscar registros' })
      } else {
        res.status(200).json(results)
      }
    }
  )
})

// Clientes
app.get('/api/clientes/:nome', (req, res) => {
    const { nome } = req.params
    const sql = 'SELECT * FROM clientes WHERE nome Like ? or ? or ?'
  
    conection.query(
      sql,
      ['%' + nome + '%', '%' + nome, nome + '%'],
      (err, results) => {
        if (err) {
          console.error('Erro ao buscar registros: ' + err.message)
          res.status(500).json({ error: 'erro ao buscar registros' })
        } else {
          res.status(200).json(results)
        }
      }
    )
  })
// ItensPedidos
app.get('/api/itensPedido/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM itensPedido WHERE id_pedido = ?'
  
    conection.query(
      sql,
      [id],
      (err, results) => {
        if (err) {
          console.error('Erro ao buscar registros: ' + err.message)
          res.status(500).json({ error: 'erro ao buscar registros' })
        } else {
          res.status(200).json(results)
        }
      }
    )
  })
// pedidos
app.get('/api/pedidos/:id', (req, res) => {
    const { id } = req.params
    const sql = 'SELECT * FROM pedidos WHERE id_cliente = ?'
  
    conection.query(
      sql,
      [id],
      (err, results) => {
        if (err) {
          console.error('Erro ao buscar registros: ' + err.message)
          res.status(500).json({ error: 'erro ao buscar registros' })
        } else {
          res.status(200).json(results)
        }
      }
    )
  })
// produtos
app.get('/api/produtos/:nome', (req, res) => {
    const { nome } = req.params
    const sql = 'SELECT * FROM produtos WHERE nome Like ? or ? or ?'
  
    conection.query(
      sql,
      ['%' + nome + '%', '%' + nome, nome + '%'],
      (err, results) => {
        if (err) {
          console.error('Erro ao buscar registros: ' + err.message)
          res.status(500).json({ error: 'erro ao buscar registros' })
        } else {
          res.status(200).json(results)
        }
      }
    )
  })

// Iniciar servidor
app.listen(port, () => {
  console.log('Servidor iniciado')
})
