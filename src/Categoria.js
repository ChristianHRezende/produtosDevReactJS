import React, { Component } from 'react'
import Api from './Api'

class Categoria extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produtos: [],
            categoria: ""
        }
    }
    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadData(id)
    }

    componentWillReceiveProps(newProps) {
        const id = newProps.match.params.catId
        this.loadData(id)
    }

    loadData(id) {
        Api.loadProdutos(id)
            .then(res => { this.setState({ produtos: res.data }) })
        Api.loadCategoria(id)
            .then(res => {
                this.setState({ categoria: res.data })
            })
    }
    renderProduto(produto) {
        return (<p className="well" key={produto.id}> {produto.produto}</p>)
    }
    render() {
        return (
            <div>
                <h1>{this.state.categoria.categoria}</h1>
                {this.state.produtos.map(produto => this.renderProduto(produto))}
            </div>
        )
    }
}
export default Categoria