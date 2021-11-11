import { getCategory } from './../category';

describe("Category functions", ()=>{

    test('should return an arry of objects with all categories', () => {
        const mockStore = () => ({firestore:{ordered:{categories:[{
            title:"Natural",
            url:"https://firebasestorage.googleapis.com/v0/b/smart-travel-sri-lanka.appspot.com/o/images%2Fdestinations%2FxU2rZae4q7uEYKvyEJfP%2Fsinharaja.jpg?alt=media&token=de3bd30a-be59-4c07-b58d-5ff7f321308a"
        }]}}}) 
        
        const result = getCategory(mockStore());
        expect(result).toStrictEqual([{
            title:"Natural",
            url:"https://firebasestorage.googleapis.com/v0/b/smart-travel-sri-lanka.appspot.com/o/images%2Fdestinations%2FxU2rZae4q7uEYKvyEJfP%2Fsinharaja.jpg?alt=media&token=de3bd30a-be59-4c07-b58d-5ff7f321308a"
        }]);
    });

});