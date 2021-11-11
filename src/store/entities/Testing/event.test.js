import { getEventById, getEvents } from './../event';

describe("Category functions", ()=>{

    test('should return an arry of objects with all events', () => {
        const mockStore = () => ({firestore:{ordered:{events:[{
            id:1,
            title:"Sinhala and Tamil New Year",
            description:"Held on April",
            published:true
        }]}}}) 
        
        const result = getEvents(mockStore());
        expect(result).toStrictEqual([{
            id:1,
            title:"Sinhala and Tamil New Year",
            description:"Held on April",
            published:true
        }]);
    });

    test('should return event details when passing the id of that event', () => {
        const mockStore = () => ({firestore:{ordered:{events:[{
            id:1,
            title:"Sinhala and Tamil New Year",
            description:"Held on April",
            published:true
        }]}}}) 
        
        const result = getEventById(mockStore());        
        expect(result).toBeDefined();
    });

});