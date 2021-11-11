
import { getAllDestinations, getActivities, getReviews ,getImages , getPublishedDestinations ,getDestinations ,addReview} from './../destination';



describe("Destination functions", ()=> {
 
    test('should return an arry of objects with all destinations if there are any', () => {
        const mockStore = () => ({firestore:{ordered:{destinations:[{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:true
        }]}}}) 
        
        const result = getAllDestinations(mockStore());
        expect(result).toStrictEqual([{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:true
        }]);
    });
    
    test('should return an empty arry if there are no any destinations', () => {
        const mockStore = () => ({firestore:{ordered:{destinations:[]}}});
        const result = getAllDestinations(mockStore());
        expect(result).toStrictEqual([]);
    });

    test('should return an array of objects with all activitives of a particular destination if there are any', () => {
        const mockStore = () => ({firestore:{ordered:{activities:[{
            name:"natural spa",
            description:"You can get a great experience from here"
        }]}}}) 
        
        const result = getActivities(mockStore());
        expect(result).toStrictEqual([{
            name:"natural spa",
            description:"You can get a great experience from here"
        }]);
    });

    test('should return an empty array if there are no any activities for that destination', () => {
        const mockStore = () => ({firestore:{ordered:{activities:[]}}});
        const result = getActivities(mockStore());
        expect(result).toStrictEqual([]);
    });

    test('should return an array of objects with all reviews of a particular destination if there are any', () => {
        const mockStore = () => ({firestore:{ordered:{reviews:[{
            username:"Johnee",
            comment:"Great place",
            rating:4
        }]}}}) 
        
        const result = getReviews(mockStore());
        expect(result).toStrictEqual([{
            username:"Johnee",
            comment:"Great place",
            rating:4
        }]);
    });

    test('should return an empty array if there are no any activities for that destination', () => {
        const mockStore = () => ({firestore:{ordered:{reviews:[]}}});
        const result = getActivities(mockStore());
        expect(result).toStrictEqual([]);
    });

    test('should return an array of objects with all image urls of a particular destination if there are any', () => {
        const mockStore = () => ({firestore:{ordered:{gallery:[{
            url:"https://firebasestorage.googleapis.com/v0/b/smart-travel-sri-lanka.appspot.com/o/images%2Fdestinations%2FxU2rZae4q7uEYKvyEJfP%2Fsinharaja.jpg?alt=media&token=de3bd30a-be59-4c07-b58d-5ff7f321308a"
        }]}}}) 
        
        const result = getImages(mockStore());
        expect(result).toStrictEqual([{
            url:"https://firebasestorage.googleapis.com/v0/b/smart-travel-sri-lanka.appspot.com/o/images%2Fdestinations%2FxU2rZae4q7uEYKvyEJfP%2Fsinharaja.jpg?alt=media&token=de3bd30a-be59-4c07-b58d-5ff7f321308a"
        }]);
    });

    test('should return an empty array if there are no any images for that destination', () => {
        const mockStore = () => ({firestore:{ordered:{gallery:[]}}});
        const result = getImages(mockStore());
        expect(result).toStrictEqual([]);
    });

    test('should return an arry of objects with all published destinations if there are any', () => {
        const mockStore = () => ({firestore:{ordered:{destinations:[{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:true
        },
        {
            address:"Sigiriya, Sri Lanka",
            categories:["Historical"],
            coords:[6.3828,80.6020],
            published:false
        }
    ]}}}) 
        const result = getPublishedDestinations(mockStore());      
         expect(result).toStrictEqual([{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:true
        }]);
    });

    test('should return an empty arry if there are no any published destinations', () => {
        const mockStore = () => ({firestore:{ordered:{destinations:[{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:false
        },
        {
            address:"SSigiriya, Sri Lanka",
            categories:["Historical"],
            coords:[6.3828,80.6020],
            published:false
        }
    ]}}}) 
        const result = getPublishedDestinations(mockStore());
        expect(result).toStrictEqual([]);
    });

    test('should return an arry of objects with all destinations without checking if there are any', () => {
        const mockStore = () => ({firestore:{ordered:{destinations:[{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:true
        }]}}}) 
        
        const result = getDestinations(mockStore());
        expect(result).toStrictEqual([{
            address:"Sinharaja, deniyaya",
            categories:["Natural"],
            coords:[6.3828,80.6020],
            published:true
        }]);
    });

    test('should add reviews to the database without causing an error', () => {
        const result = addReview(5,"good","Mary",2);        
        expect(result).toBeDefined();
    });

});
