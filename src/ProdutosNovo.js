import React, { Component } from 'react'

class ProdutosNovo extends Component {
    handleNewProduto = () => {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
    }
    render() {
        const { categorias } = this.props
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