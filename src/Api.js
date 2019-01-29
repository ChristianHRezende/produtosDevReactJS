import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001/"
})
const apis = {
    loadCategorias: () => api.get('categorias'),
    loadCategoria: id => api.get('categorias/' + id),
    createCategoria: categoria => api.post('categorias', { categoria: categoria }),
    updateCategoria: categoria => api.put('categorias/' + categoria.id,  categoria ),
    deleteCategoria: id => api.delete("categorias/" + id),
    loadProdutos: catId => api.get('produtos?categoria=' + catId),
}
export default apis