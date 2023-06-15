import React, { useEffect } from 'react'
import CategoryRepository from '../api/services/CategoryRepository';


/**
 * Hook personnalisé pour la recupération de category. 
 * @returns retour les hooks categories , error
 */
export const useCategory = () => {
    const [categories, setCategories] = React.useState<any>([]);
    const [error, setError] = React.useState('');
    useEffect(() => {
        CategoryRepository.getData()
            .then((res) => {
                setCategories(res)
                
            })
            .catch((err) => {
                setError(err)
            })
    }, [])
    return {categories,error}
}

