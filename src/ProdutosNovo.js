import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class ProdutosNovo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: ''
        }
    }
    handleNewProduto = () => {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
            .then(res => this.setState({ redirect: 'categoria/' + produto.categoria }))
    }

    render() {
        const { categorias } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>
        }
        return (
            <div>
                <h2>Novo Produto</h2>
                <select ref='categoria'>
                    {categorias.map(categoria => <option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>)}</select>
                <input
                    className="form-control"
                    placeholder="Nome do novo produto"
                    ref="produto">
                </input>
                <button onClick={this.handleNewProduto}>Salvar</button>
            </div >);
    }
}
export default ProdutosNovo