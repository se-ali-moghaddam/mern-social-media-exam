import React, { useContext, useEffect } from 'react'
import { CategoryContext } from '../../context/CategoryContext';
import moment from 'jalali-moment';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const { getCategories, categories, removeCategory } = useContext(CategoryContext);

    useEffect(() => {
        getCategories();
    });

    return (
        <div className="columns is-justify-content-center mt-2">
            <div className="column is-two-thirds">
                <table className="table table-category is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category name</th>
                            <th>Creator</th>
                            <th>Created at</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((cat, index) => {
                            return (
                                <tr key={cat._id}>
                                    <td>{index + 1}</td>
                                    <td>{cat.title}</td>
                                    <td>{cat?.user?.firstName}</td>
                                    <td>{moment(cat.createdAt).locale('en').format('YYYY/MM/DD')}</td>
                                    <td>
                                        <Link state={cat} to={`/edit-category/`} className='button is-warning ml-4'>Edit</Link>
                                        <button onClick={() => removeCategory(cat._id)} className='button is-danger ml-4'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryList