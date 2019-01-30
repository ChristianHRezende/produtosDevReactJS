import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class ProdutosEditar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: ''
        }
    }
    componentDidMount = () => {
        this.props.readProduto(this.props.match.params.prodId)
            .then(res => {
                this.refs.produto.value = res.data.produto
                this.refs.categoria.value = res.data.categoria
            })
    }

    handleEditProduto = () => {
        const produto = {
            id: this.props.match.params.prodId,
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        console.log(produto)
        this.props.editProduto(produto)
            .then(() => this.setState({ redirect: '/produtos/categoria/' + produto.categoria }))
    }

    render() {
        const { categorias } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>
        }
        return (
            <div>
                <h2>Editar Produto</h2>
                <select ref='categoria'>
                    {categorias.map(categoria => <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>)}</select>
                <input
                    className="form-control"
                    placeholder="Nome do novo produto"
                    ref="produto">
                </input>
                <button onClick={this.handleEditProduto}>Salvar</button>
            </div>

        )
    }
}

export default ProdutosEditar