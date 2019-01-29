import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import axios from 'axios'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

import Api from './Api'

class Produtos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categorias: []
        }
    }
    componentDidMount() {
        this.loadData()
    }

    loadData = () => {
        Api.loadCategorias().then(res => {
            this.setState({ categorias: res.data })
        })
    }
    /**
     * Render category
     */
    renderCategoria = cat => {
        return (
            <li key={cat.id}>
                <Link to={`/produtos/categoria/${cat.id}`} > {cat.categoria}</Link>
                <button className="btn btn-sm btn-link" onClick={() => this.removeCategoria(cat)}>
                    <span className="glyphicon glyphicon-remove"></span>
                </button>
            </li>
        )


    }

    /**
     * Handle enter press to create new category
     */
    handleNewCategoria = (key) => {
        if (key.keyCode === 13) {
            axios.post("http://localhost:3001/categorias",
                {
                    categoria: this.refs.categoria.value
                }
            ).then(res => {
                this.refs.categoria.value = ""
                this.loadData();
            })

        }
    }

    removeCategoria = (cat) => {
        Api.deleteCategoria(cat.id)
            .then(() => {
                this.loadData();
            })
    }

    render() {
        const { match } = this.props
        const { categorias } = this.state
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>
                        {categorias.map(cat => this.renderCategoria(cat))}
                    </ul>
                    <div className="well well-sm">
                        <input
                            className="form-control"
                            onKeyUp={this.handleNewCategoria}
                            type="text"
                            ref="categoria"
                            placeholder="Nova categoria">
                        </input>
                    </div>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route path={match.url + '/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}
export default Produtos