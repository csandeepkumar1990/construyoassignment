const admin = require('firebase-admin');

var serviceAccount = require("../private_key/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const ORDERS_COLLECTION = 'orders';

exports.create = async (orders) => {
    try {
        const newData = admin.firestore().collection(ORDERS_COLLECTION).doc();
        await newData.set(orders)
        let newDocId = newData.id
        let snapshot = await newData.get()
        let data = snapshot.data()
        return {data, newDocId};
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Orders: ', code: err.code || 500 });
    }
}

exports.update = async (data, id) => {

    try {
        let ordersData = admin.firestore().collection(ORDERS_COLLECTION).doc(id);
        let updateData = {}
        for (const key in data) {
            if(data[key] !== undefined){
                updateData = {
                    ...updateData,
                    [key]: data[key]
                }
            }
        }
        await ordersData.update(updateData)
        return {success: true, data: updateData};
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Orders', code: err.code || 500 });
    }
}


exports.delete = async (id) => {
    try {
        let ordersData = admin.firestore().collection(ORDERS_COLLECTION).doc(id);
        let res = await ordersData.delete()
        return res;
    } catch (err) {
        throw ({ message: err.message || "Error occurred while deleting the Orders.", code: err.code || 500 });
    }
}


exports.getAll = async () => {
    try {
        let ordersData = admin.firestore().collection(ORDERS_COLLECTION);
        let snapshot = await ordersData.get()
        let allOrderData = []
        if (snapshot.empty) {
            console.log('No matching documents.');
            return allOrderData;
          }
          
          snapshot.forEach(doc => {
            let docData = doc.data()
            docData.docId = doc.id
            allOrderData.push(docData)
          });
        return allOrderData;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Orderss.', code: err.code || 500 });
    }
}


exports.get = async (id) => {
    try {
        let ordersData = admin.firestore().collection(ORDERS_COLLECTION).doc(id);
        let snapshot = await ordersData.get()
        let order = snapshot.data()
        if(order){
        order.docId = id
        }
        return order
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Orders.', code: err.code || 500 });
    }
}
