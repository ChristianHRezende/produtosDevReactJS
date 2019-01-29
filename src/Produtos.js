import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'

import Api from './Api'
import ProdutosNovo from './ProdutosNovo';

class Produtos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categorias: [],
            editingCategoria: ''
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
     * Handle enter press to create new category
     */
    createProduto = (produto) => {
        Api.createProduto(produto)
            .then((res) => {
                this.loadData();
            })
    }
    /**
     * Handle enter press to create new category
     */
    handleNewCategoria = (key) => {
        if (key.keyCode === 13) {
            Api.createCategoria(this.refs.categoria.value)
                .then(res => {
                    this.refs.categoria.value = ""
                    this.loadData();
                })

        }
    }
    /**
     * Handle enter press to edit category
     */
    handleEditCategoria = (key) => {
        if (key.keyCode === 13) {

            Api.updateCategoria(
                {
                    id: this.state.editingCategoria.id,
                    categoria: this.refs['cat-' + this.state.editingCategoria.id].value
                }
            )
                .then(res => {
                    this.refs['cat-' + this.state.editingCategoria.id].value = ""
                    this.setState({ editingCategoria: '' })
                    this.loadData();
                })

        }
    }
    /**
     * Edit Category
     */
    editCategoria = (cat) => {
        this.setState({ editingCategoria: cat })
    }
    cancelEditing = () => {
        this.setState({ editingCategoria: '' })
    }

    /**
    * Delete Category
    */
    removeCategoria = (cat) => {
        Api.deleteCategoria(cat.id)
            .then(() => {
                this.loadData();
            })
    }


    /**
     * Render category
     */
    renderCategoria = cat => {
        return (
            <li key={cat.id}>
                {
                    this.state.editingCategoria === cat &&
                    <div className="input-group">
                        <div className="input-group-btn">
                            <input ref={'cat-' + cat.id} className="form-control" type="text" defaultValue={cat.categoria} onKeyUp={this.handleEditCategoria}></input>
                            <button className="btn" onClick={this.cancelEditing}>cancel</button>
                        </div>
                    </div>
                }
                {this.state.editingCategoria !== cat.id &&
                    <div>
                        <Link to={`/produtos/categoria/${cat.id}`} > {cat.categoria}</Link>
                        <button className="btn btn-sm btn-link" onClick={() => this.removeCategoria(cat)}>
                            <span className="glyphicon glyphicon-remove"></span>
                        </button>
                        <button className="btn btn-sm btn-link" onClick={() => this.editCategoria(cat)}>
                            <span className="glyphicon glyphicon-pencil"></span>
                        </button>
                    </div>
                }
            </li>
        )

    }

    render() {
        const { match } = this.props
        const { categorias } = this.state
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
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
                    <Link to="/produtos/novo">Novo produto</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + "/novo"} render={(props) => { return <ProdutosNovo {...props} categorias={this.state.categorias} createProduto={this.createProduto} /> }} />
                    <Route path={match.url + '/categoria/:catId'} component={Categoria} />
                </div>
            </div>
        )
    }
}
export default Produtos