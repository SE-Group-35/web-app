
/**
 * Firestore collections
 * Defined here for reusability
 * Ex:{
 *  users: {name: 'users' },
 *  reviews: {
 *      name: 'reviews,
 *      //If there are subcollections. Nest it like this
 *      subCollection: {
 *          name: 'exampleSubcollection'
 *      }
 *  }
 * }
 *      
 *  
 * 
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    users: { name: 'users' },
}